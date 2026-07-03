"""
Solaron Video Ad — Final Assembly
Stitches Veo-generated clips, overlays ElevenLabs voiceover,
adds Solaron logo watermark and end-card, exports final MP4.
"""

import shutil
import subprocess
import sys
from pathlib import Path

try:
    from moviepy import (
        AudioFileClip,
        ColorClip,
        CompositeAudioClip,
        CompositeVideoClip,
        ImageClip,
        TextClip,
        VideoFileClip,
        concatenate_videoclips,
    )
except ImportError:
    print("ERROR: moviepy not installed. Run: pip install moviepy")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install Pillow")
    sys.exit(1)

from config import BRAND, CLIPS_DIR, FINAL_DIR, LOGO_PNG, VOICEOVER_DIR
from storyboard import SCENES, Scene

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _find_system_font() -> str:
    """Find a suitable font for text overlays (macOS / Linux)."""
    candidates = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSText.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for f in candidates:
        if Path(f).exists():
            return f
    return "Helvetica"


FONT = _find_system_font()


def _svg_to_png(svg_path: Path, png_path: Path, width: int = 200) -> Path | None:
    """Convert SVG to PNG using rsvg-convert or cairosvg if available."""
    if png_path.exists():
        return png_path

    if shutil.which("rsvg-convert"):
        result = subprocess.run(
            ["rsvg-convert", "-w", str(width), str(svg_path), "-o", str(png_path)],
            capture_output=True,
        )
        if result.returncode == 0:
            return png_path

    try:
        import cairosvg
        cairosvg.svg2png(url=str(svg_path), write_to=str(png_path), output_width=width)
        return png_path
    except ImportError:
        pass

    return None


# ---------------------------------------------------------------------------
# Load clips and voiceovers
# ---------------------------------------------------------------------------

def load_scene_clips() -> list[tuple[Scene, VideoFileClip | None, AudioFileClip | None]]:
    """
    Load video clips and voiceover audio for each scene.
    Returns a list of (scene, video_clip, vo_audio) tuples.
    """
    loaded = []
    for scene in SCENES:
        clip_path = CLIPS_DIR / f"{scene.id}.mp4"
        vo_path = VOICEOVER_DIR / f"{scene.id}_vo.mp3"

        video = None
        if clip_path.exists() and clip_path.stat().st_size > 0:
            video = VideoFileClip(str(clip_path))
            print(f"  Loaded clip: {clip_path.name} ({video.duration:.1f}s)")
        else:
            print(f"  WARNING: Missing clip {clip_path.name} — using placeholder")

        vo = None
        if vo_path.exists() and vo_path.stat().st_size > 0:
            vo = AudioFileClip(str(vo_path))
            print(f"  Loaded VO:   {vo_path.name} ({vo.duration:.1f}s)")
        else:
            print(f"  WARNING: Missing voiceover {vo_path.name}")

        loaded.append((scene, video, vo))

    return loaded


# ---------------------------------------------------------------------------
# Create placeholder clips for missing scenes
# ---------------------------------------------------------------------------

def make_placeholder(scene: Scene, fps: int = 24) -> VideoFileClip:
    """Create a dark placeholder clip with scene label text."""
    w, h = 1920, 1080
    bg = ColorClip(size=(w, h), color=(10, 10, 15)).with_duration(scene.duration_sec).with_fps(fps)
    try:
        label = TextClip(
            text=scene.label,
            font_size=48,
            color="white",
            font=FONT,
        ).with_duration(scene.duration_sec).with_position("center")
        return CompositeVideoClip([bg, label])
    except Exception:
        return bg


# ---------------------------------------------------------------------------
# Logo watermark
# ---------------------------------------------------------------------------

def create_logo_overlay(duration: float, video_size: tuple[int, int]) -> ImageClip | None:
    """Create a semi-transparent Solaron logo in the bottom-right corner."""
    logo_path = LOGO_PNG
    if not logo_path.exists():
        from config import LOGO_SVG
        if LOGO_SVG.exists():
            converted = FINAL_DIR / "logo_temp.png"
            logo_path = _svg_to_png(LOGO_SVG, converted, width=80)

    if not logo_path or not logo_path.exists():
        print("  WARNING: Logo not found, skipping watermark")
        return None

    try:
        logo = ImageClip(str(logo_path)).with_duration(duration)
        img = Image.open(str(logo_path))
        lw, lh = img.size
        scale = 60 / max(lw, lh)
        if scale < 1:
            logo = logo.resized(scale)

        vw, vh = video_size
        margin = 30
        logo = logo.with_position((vw - 60 - margin, vh - 60 - margin))
        logo = logo.with_opacity(0.7)
        return logo
    except Exception as e:
        print(f"  WARNING: Could not create logo overlay: {e}")
        return None


# ---------------------------------------------------------------------------
# End card overlay (last scene enhancement)
# ---------------------------------------------------------------------------

def create_end_card_texts(duration: float, video_size: tuple[int, int]) -> list:
    """Create text overlays for the CTA / end card scene."""
    vw, vh = video_size
    layers = []

    texts = [
        {"text": BRAND["website"], "font_size": 36, "y": vh // 2 + 80},
        {"text": BRAND["phone"], "font_size": 28, "y": vh // 2 + 130},
        {"text": BRAND["tagline_bg"], "font_size": 24, "y": vh // 2 + 175},
    ]

    for t in texts:
        try:
            tc = TextClip(
                text=t["text"],
                font_size=t["font_size"],
                color=BRAND["colors"]["green_accent"],
                font=FONT,
            ).with_duration(duration).with_position(("center", t["y"]))
            layers.append(tc)
        except Exception:
            pass

    return layers


# ---------------------------------------------------------------------------
# Main assembly
# ---------------------------------------------------------------------------

def assemble_video(
    background_music_path: Path | None = None,
    music_volume: float = 0.12,
    output_filename: str = "solaron_ad_60s_bg.mp4",
) -> Path | None:
    """
    Assemble the final video from individual clips and voiceovers.
    """
    print("\n" + "=" * 60)
    print("  PHASE 5: Final Assembly")
    print("=" * 60)

    print("\n  Loading scene clips and voiceovers...")
    scene_data = load_scene_clips()

    # Build the sequence of video clips with overlaid voiceover
    assembled_clips = []
    fps = 24

    for scene, video, vo in scene_data:
        if video is None:
            video = make_placeholder(scene, fps=fps)

        target_dur = scene.duration_sec

        # Trim or pad the video to the target duration
        if video.duration > target_dur:
            video = video.subclipped(0, target_dur)
        elif video.duration < target_dur:
            # Freeze last frame to extend
            freeze = video.to_ImageClip(t=video.duration - 0.04).with_duration(
                target_dur - video.duration
            )
            video = concatenate_videoclips([video, freeze])

        video = video.with_fps(fps)

        # Replace Veo's native audio with voiceover
        if vo is not None:
            if vo.duration > target_dur:
                vo = vo.subclipped(0, target_dur)
            # Pad voiceover with silence if shorter than clip
            video = video.with_audio(vo)
        else:
            video = video.without_audio()

        assembled_clips.append(video)

    print(f"\n  Concatenating {len(assembled_clips)} clips...")
    final = concatenate_videoclips(assembled_clips, method="compose")
    total_dur = final.duration
    video_size = (final.w, final.h)
    print(f"  Total duration: {total_dur:.1f}s | Size: {video_size[0]}x{video_size[1]}")

    # Add logo watermark
    layers = [final]
    logo = create_logo_overlay(total_dur, video_size)
    if logo:
        layers.append(logo)
        print("  Added logo watermark")

    # Add end-card text overlays on the last scene
    last_scene_start = sum(s.duration_sec for s in SCENES[:-1])
    end_texts = create_end_card_texts(SCENES[-1].duration_sec, video_size)
    for et in end_texts:
        et = et.with_start(last_scene_start)
        layers.append(et)

    if len(layers) > 1:
        final = CompositeVideoClip(layers)

    # Add background music if provided
    audio_tracks = []
    if final.audio:
        audio_tracks.append(final.audio)

    if background_music_path and background_music_path.exists():
        print(f"  Adding background music: {background_music_path.name}")
        music = AudioFileClip(str(background_music_path))
        if music.duration < total_dur:
            loops_needed = int(total_dur / music.duration) + 1
            from moviepy import concatenate_audioclips
            music = concatenate_audioclips([music] * loops_needed)
        music = music.subclipped(0, total_dur).with_volume_scaled(music_volume)
        audio_tracks.append(music)

    if len(audio_tracks) > 1:
        final = final.with_audio(CompositeAudioClip(audio_tracks))

    # Export
    output_path = FINAL_DIR / output_filename
    print(f"\n  Exporting to: {output_path}")
    print("  This may take a few minutes...")

    final.write_videofile(
        str(output_path),
        fps=fps,
        codec="libx264",
        audio_codec="aac",
        bitrate="8000k",
        preset="medium",
        threads=4,
        logger="bar",
    )

    size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"\n  Final video saved: {output_path}")
    print(f"  File size: {size_mb:.1f} MB")
    print(f"  Duration: {total_dur:.1f}s")

    # Cleanup
    for clip_tuple in scene_data:
        for obj in clip_tuple[1:]:
            if obj and hasattr(obj, "close"):
                obj.close()

    return output_path


# ---------------------------------------------------------------------------
# CLI entry
# ---------------------------------------------------------------------------

def run_assembly_pipeline(music_path: str | None = None):
    """Run the assembly pipeline."""
    bg_music = Path(music_path) if music_path else None
    return assemble_video(background_music_path=bg_music)


if __name__ == "__main__":
    music = None
    for i, arg in enumerate(sys.argv):
        if arg == "--music" and i + 1 < len(sys.argv):
            music = sys.argv[i + 1]
    run_assembly_pipeline(music_path=music)
