"""
Solaron Video Ad — Video Generation (Veo 3.1)
Generates 8-second video clips for each storyboard scene using the Gemini API.
Scene 4 (CEO) uses reference images of Petar Delev for character consistency.
"""

import base64
import sys
import time
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: google-genai not installed. Run: pip install google-genai")
    sys.exit(1)

from config import (
    ASPECT_RATIO,
    CLIPS_DIR,
    PERSON_GENERATION,
    PERSON_GENERATION_REF,
    PHOTOS_DIR,
    POLL_INTERVAL_SEC,
    RESOLUTION,
    VEO_MODEL,
    IMAGE_MODEL,
    require_gemini,
)
from storyboard import SCENES, Scene


# ---------------------------------------------------------------------------
# Reference image helpers
# ---------------------------------------------------------------------------

def load_reference_photos() -> list:
    """
    Load CEO reference photos from assets/photos/.
    Returns a list of genai Image objects (max 3).
    """
    photo_files = sorted(PHOTOS_DIR.glob("delev_*.*"))
    if not photo_files:
        photo_files = sorted(
            p for p in PHOTOS_DIR.iterdir()
            if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")
        )

    if not photo_files:
        print("  WARNING: No reference photos found in assets/photos/")
        print("  Download photos of Petar Delev and save as:")
        print(f"    {PHOTOS_DIR}/delev_1.jpg")
        print(f"    {PHOTOS_DIR}/delev_2.jpg")
        print(f"    {PHOTOS_DIR}/delev_3.jpg")
        return []

    photos = photo_files[:3]
    images = []
    for p in photos:
        mime = "image/jpeg" if p.suffix.lower() in (".jpg", ".jpeg") else f"image/{p.suffix.lstrip('.').lower()}"
        image_bytes = p.read_bytes()
        img = types.Image(image_bytes=image_bytes, mime_type=mime)
        images.append(img)
        print(f"  Loaded reference photo: {p.name} ({len(image_bytes) / 1024:.0f} KB)")

    return images


def build_reference_images(photos: list) -> list:
    """Wrap photo images as VideoGenerationReferenceImage objects."""
    refs = []
    for img in photos:
        ref = types.VideoGenerationReferenceImage(
            image=img,
            reference_type="asset",
        )
        refs.append(ref)
    return refs


# ---------------------------------------------------------------------------
# Optional: generate a first-frame keyframe with Gemini image generation
# ---------------------------------------------------------------------------

def generate_keyframe(client: genai.Client, prompt: str, scene_id: str) -> types.Image | None:
    """
    Optionally generate a first-frame image using Gemini's image model.
    This can improve visual consistency for specific scenes.
    """
    keyframe_path = CLIPS_DIR / f"{scene_id}_keyframe.png"
    if keyframe_path.exists():
        print(f"    Keyframe exists: {keyframe_path.name}")
        img_bytes = keyframe_path.read_bytes()
        return types.Image(image_bytes=img_bytes, mime_type="image/png")

    short_prompt = (
        f"A single high-quality still frame for a video ad. {prompt[:500]} "
        "Photorealistic, cinematic, 16:9 aspect ratio."
    )

    try:
        response = client.models.generate_content(
            model=IMAGE_MODEL,
            contents=short_prompt,
            config={"response_modalities": ["IMAGE"]},
        )
        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data:
                    img_bytes = part.inline_data.data
                    keyframe_path.write_bytes(img_bytes)
                    print(f"    Generated keyframe: {keyframe_path.name}")
                    return types.Image(
                        image_bytes=img_bytes,
                        mime_type=part.inline_data.mime_type or "image/png",
                    )
    except Exception as e:
        print(f"    Keyframe generation failed (non-fatal): {e}")

    return None


# ---------------------------------------------------------------------------
# Core: generate a single video clip
# ---------------------------------------------------------------------------

def generate_clip(
    client: genai.Client,
    scene: Scene,
    reference_photos: list | None = None,
    use_keyframe: bool = False,
) -> Path | None:
    """
    Generate one 8-second video clip via Veo 3.1.
    Returns the path to the saved .mp4 file.
    """
    clip_path = CLIPS_DIR / f"{scene.id}.mp4"
    if clip_path.exists() and clip_path.stat().st_size > 0:
        print(f"  Clip exists: {clip_path.name}")
        return clip_path

    config_kwargs = {
        "aspect_ratio": ASPECT_RATIO,
        "person_generation": PERSON_GENERATION,
    }

    if scene.veo_duration_sec in (4, 6, 8):
        config_kwargs["duration_seconds"] = scene.veo_duration_sec

    # Only 720p supports non-8s durations; 1080p requires 8s
    if scene.veo_duration_sec == 8:
        config_kwargs["resolution"] = RESOLUTION
    else:
        config_kwargs["resolution"] = "720p"

    gen_kwargs = {
        "model": VEO_MODEL,
        "prompt": scene.veo_prompt,
    }

    # Attach reference images for the CEO scene
    if scene.use_reference_images and reference_photos:
        refs = build_reference_images(reference_photos)
        config_kwargs["reference_images"] = refs
        config_kwargs["resolution"] = "1080p"
        config_kwargs["duration_seconds"] = 8
        config_kwargs["person_generation"] = PERSON_GENERATION_REF
        print(f"    Using {len(refs)} reference image(s)")

    # Optionally generate and use a first-frame keyframe
    if use_keyframe and not scene.use_reference_images:
        keyframe = generate_keyframe(client, scene.veo_prompt, scene.id)
        if keyframe:
            gen_kwargs["image"] = keyframe
            print("    Using generated keyframe as first frame")

    gen_kwargs["config"] = types.GenerateVideosConfig(**config_kwargs)

    print(f"    Submitting to Veo 3.1 ({scene.veo_duration_sec}s, "
          f"{config_kwargs.get('resolution', '720p')})...")

    try:
        operation = client.models.generate_videos(**gen_kwargs)
    except Exception as e:
        print(f"    ERROR submitting generation: {e}")
        return None

    # Poll until done
    elapsed = 0
    while not operation.done:
        time.sleep(POLL_INTERVAL_SEC)
        elapsed += POLL_INTERVAL_SEC
        try:
            operation = client.operations.get(operation)
        except Exception as e:
            print(f"    Poll error (retrying): {e}")
            time.sleep(5)
            continue
        if elapsed % 30 == 0:
            print(f"    Still generating... ({elapsed}s elapsed)")

    # Download the video
    try:
        resp = operation.response
        if not resp or not resp.generated_videos:
            print(f"    ERROR: Empty response (possibly safety-filtered).")
            if scene.use_reference_images:
                print("    TIP: Reference images may have triggered safety filters.")
                print("    Retrying WITHOUT reference images...")
                return _retry_without_refs(client, scene)
            return None
        generated_video = resp.generated_videos[0]
        client.files.download(file=generated_video.video)
        generated_video.video.save(str(clip_path))
        size_mb = clip_path.stat().st_size / (1024 * 1024)
        print(f"    Saved: {clip_path.name} ({size_mb:.1f} MB, {elapsed}s)")
        return clip_path
    except Exception as e:
        print(f"    ERROR downloading video: {e}")
        return None


def _retry_without_refs(client: genai.Client, scene: Scene) -> Path | None:
    """Fallback: generate CEO scene without reference images."""
    clip_path = CLIPS_DIR / f"{scene.id}.mp4"
    config_kwargs = {
        "aspect_ratio": ASPECT_RATIO,
        "person_generation": PERSON_GENERATION,
        "resolution": RESOLUTION,
        "duration_seconds": 8,
    }
    gen_kwargs = {
        "model": VEO_MODEL,
        "prompt": scene.veo_prompt,
        "config": types.GenerateVideosConfig(**config_kwargs),
    }
    try:
        operation = client.models.generate_videos(**gen_kwargs)
    except Exception as e:
        print(f"    Retry ERROR: {e}")
        return None
    elapsed = 0
    while not operation.done:
        time.sleep(POLL_INTERVAL_SEC)
        elapsed += POLL_INTERVAL_SEC
        operation = client.operations.get(operation)
        if elapsed % 30 == 0:
            print(f"    Still generating (retry)... ({elapsed}s elapsed)")
    try:
        resp = operation.response
        if not resp or not resp.generated_videos:
            print("    Retry also returned empty response.")
            return None
        generated_video = resp.generated_videos[0]
        client.files.download(file=generated_video.video)
        generated_video.video.save(str(clip_path))
        size_mb = clip_path.stat().st_size / (1024 * 1024)
        print(f"    Saved (retry): {clip_path.name} ({size_mb:.1f} MB, {elapsed}s)")
        return clip_path
    except Exception as e:
        print(f"    Retry download ERROR: {e}")
        return None


# ---------------------------------------------------------------------------
# Generate all clips
# ---------------------------------------------------------------------------

def generate_all_clips(use_keyframes: bool = False) -> dict[str, Path]:
    """
    Generate video clips for all storyboard scenes.
    Returns a dict mapping scene_id -> clip path.
    """
    api_key = require_gemini()
    client = genai.Client(api_key=api_key)

    # Load CEO reference photos once
    print("\n  Loading reference photos...")
    reference_photos = load_reference_photos()

    results = {}
    total = len(SCENES)

    for i, scene in enumerate(SCENES, 1):
        print(f"\n  [{i}/{total}] Scene: {scene.label}")
        print(f"    Prompt: {scene.veo_prompt[:100]}...")

        refs = reference_photos if scene.use_reference_images else None
        clip_path = generate_clip(
            client, scene,
            reference_photos=refs,
            use_keyframe=use_keyframes,
        )

        if clip_path and clip_path.exists():
            results[scene.id] = clip_path
        else:
            print(f"    FAILED: Scene {scene.id}")

    return results


# ---------------------------------------------------------------------------
# CLI entry
# ---------------------------------------------------------------------------

def run_video_pipeline(use_keyframes: bool = False):
    """Run the full video generation pipeline."""
    print("\n" + "=" * 60)
    print("  PHASE 4: Video Generation (Veo 3.1)")
    print("=" * 60)

    results = generate_all_clips(use_keyframes=use_keyframes)

    print("\n" + "=" * 60)
    print(f"  Video generation complete: {len(results)}/{len(SCENES)} clips")
    for sid, path in results.items():
        size_mb = path.stat().st_size / (1024 * 1024)
        print(f"    {sid}: {path.name} ({size_mb:.1f} MB)")
    print("=" * 60)

    return results


if __name__ == "__main__":
    use_kf = "--keyframes" in sys.argv
    run_video_pipeline(use_keyframes=use_kf)
