#!/usr/bin/env python3
"""
Solaron AI Video Ad Generator
==============================
Generates a 60-second Tesla-style video ad for the Bulgarian market.

Pipeline phases:
  voice    — Download audio, clean, create ElevenLabs voice clone, generate voiceovers
  video    — Generate 8 video clips via Veo 3.1 (with CEO reference images)
  assemble — Stitch clips, overlay voiceover, add logo/end card, export final MP4
  all      — Run the full pipeline end-to-end

Usage:
  python generate_video_ad.py --phase all
  python generate_video_ad.py --phase voice
  python generate_video_ad.py --phase video [--keyframes]
  python generate_video_ad.py --phase assemble [--music path/to/music.mp3]
  python generate_video_ad.py --storyboard   # Print storyboard overview

Prerequisites:
  1. pip install -r requirements.txt
  2. Install ffmpeg: brew install ffmpeg
  3. Install yt-dlp: pip install yt-dlp
  4. Set GEMINI_API_KEY (in frontend/.env or env var)
  5. Set ELEVENLABS_API_KEY (in frontend/.env or env var)
  6. Place 1-3 photos of Petar Delev in assets/photos/ (delev_1.jpg, etc.)
"""

import argparse
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from config import (
    CLIPS_DIR,
    FINAL_DIR,
    GEMINI_API_KEY,
    ELEVENLABS_API_KEY,
    PHOTOS_DIR,
    VOICEOVER_DIR,
)
from storyboard import SCENES, print_storyboard


def check_prerequisites(phase: str):
    """Verify that required tools and keys are available."""
    issues = []

    if phase in ("voice", "all"):
        if not ELEVENLABS_API_KEY:
            issues.append("ELEVENLABS_API_KEY not found (set env var or add to frontend/.env)")
        import shutil
        if not shutil.which("ffmpeg"):
            issues.append("ffmpeg not installed (brew install ffmpeg)")

    if phase in ("video", "all"):
        if not GEMINI_API_KEY:
            issues.append("GEMINI_API_KEY not found (set env var or add to frontend/.env)")

    if phase in ("video", "all"):
        photos = list(PHOTOS_DIR.glob("*.*"))
        photo_exts = {".jpg", ".jpeg", ".png", ".webp"}
        actual_photos = [p for p in photos if p.suffix.lower() in photo_exts]
        if not actual_photos:
            issues.append(
                f"No CEO reference photos in {PHOTOS_DIR}/\n"
                "    Download photos of Petar Delev and save as delev_1.jpg, delev_2.jpg, delev_3.jpg"
            )

    if phase == "assemble":
        clips = list(CLIPS_DIR.glob("*.mp4"))
        vos = list(VOICEOVER_DIR.glob("*.mp3"))
        if not clips:
            issues.append(f"No video clips found in {CLIPS_DIR}/ — run --phase video first")
        if not vos:
            issues.append(f"No voiceover files found in {VOICEOVER_DIR}/ — run --phase voice first")

    if issues:
        print("\n  PREREQUISITE CHECK FAILED:")
        for i, issue in enumerate(issues, 1):
            print(f"    {i}. {issue}")
        print()
        return False

    print("  Prerequisites OK")
    return True


def run_phase_voice():
    from voice_clone import run_voice_pipeline
    return run_voice_pipeline()


def run_phase_video(use_keyframes: bool = False):
    from video_gen import run_video_pipeline
    return run_video_pipeline(use_keyframes=use_keyframes)


def run_phase_assemble(music_path: str | None = None):
    from assembler import run_assembly_pipeline
    return run_assembly_pipeline(music_path=music_path)


def run_all(use_keyframes: bool = False, music_path: str | None = None):
    """Run the complete pipeline."""
    start = time.time()

    print("\n" + "=" * 70)
    print("  SOLARON AI VIDEO AD GENERATOR — FULL PIPELINE")
    print("=" * 70)
    print_storyboard()

    # Phase 1: Voice
    print("\n  >>> PHASE 1/3: Voice Pipeline")
    voice_id = run_phase_voice()
    if not voice_id:
        print("  WARNING: Voice pipeline failed. Continuing with video generation...")

    # Phase 2: Video
    print("\n  >>> PHASE 2/3: Video Generation")
    clips = run_phase_video(use_keyframes=use_keyframes)
    if not clips:
        print("  WARNING: No video clips generated.")

    # Phase 3: Assembly
    print("\n  >>> PHASE 3/3: Final Assembly")
    output = run_phase_assemble(music_path=music_path)

    elapsed = time.time() - start
    minutes = int(elapsed // 60)
    seconds = int(elapsed % 60)

    print("\n" + "=" * 70)
    print("  PIPELINE COMPLETE")
    print(f"  Total time: {minutes}m {seconds}s")
    if output and output.exists():
        size_mb = output.stat().st_size / (1024 * 1024)
        print(f"  Output: {output} ({size_mb:.1f} MB)")
    print("=" * 70)

    return output


def main():
    parser = argparse.ArgumentParser(
        description="Solaron AI Video Ad Generator",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python generate_video_ad.py --phase all
  python generate_video_ad.py --phase voice
  python generate_video_ad.py --phase video --keyframes
  python generate_video_ad.py --phase assemble --music bg_music.mp3
  python generate_video_ad.py --storyboard
        """,
    )
    parser.add_argument(
        "--phase",
        choices=["voice", "video", "assemble", "all"],
        default="all",
        help="Which pipeline phase to run (default: all)",
    )
    parser.add_argument(
        "--keyframes",
        action="store_true",
        help="Generate first-frame keyframes with Gemini before Veo (slower but more consistent)",
    )
    parser.add_argument(
        "--music",
        type=str,
        default=None,
        help="Path to background music file (MP3/WAV) to mix into final video",
    )
    parser.add_argument(
        "--storyboard",
        action="store_true",
        help="Print the storyboard and exit",
    )
    parser.add_argument(
        "--skip-checks",
        action="store_true",
        help="Skip prerequisite checks",
    )

    args = parser.parse_args()

    if args.storyboard:
        print_storyboard()
        return

    print("\n  Solaron AI Video Ad Generator")
    print(f"  Phase: {args.phase}")
    print(f"  Keyframes: {'Yes' if args.keyframes else 'No'}")
    if args.music:
        print(f"  Music: {args.music}")
    print()

    if not args.skip_checks:
        if not check_prerequisites(args.phase):
            print("  Use --skip-checks to bypass prerequisite validation.")
            sys.exit(1)

    if args.phase == "voice":
        run_phase_voice()
    elif args.phase == "video":
        run_phase_video(use_keyframes=args.keyframes)
    elif args.phase == "assemble":
        run_phase_assemble(music_path=args.music)
    elif args.phase == "all":
        run_all(use_keyframes=args.keyframes, music_path=args.music)


if __name__ == "__main__":
    main()
