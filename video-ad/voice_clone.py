"""
Solaron Video Ad — Voice Cloning & TTS
Handles the full voice pipeline:
  1. Download audio from public media appearances (yt-dlp)
  2. Clean/normalize audio (ffmpeg)
  3. Create ElevenLabs Instant Voice Clone
  4. Generate per-scene Bulgarian voiceover via TTS
"""

import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

import requests

from config import (
    AUDIO_CLEAN_DIR,
    AUDIO_RAW_DIR,
    BLOOMBERG_INTERVIEW_URL,
    ELEVENLABS_TTS_MODEL,
    VOICEOVER_DIR,
    require_elevenlabs,
)
from storyboard import SCENES

ELEVENLABS_BASE = "https://api.elevenlabs.io/v1"

# ---------------------------------------------------------------------------
# Phase 0: Audio asset gathering
# ---------------------------------------------------------------------------

def download_audio(url: str | None = None) -> Path:
    """
    Download audio from a public video URL using yt-dlp.
    Returns the path to the raw WAV file.
    """
    if not shutil.which("yt-dlp"):
        print("ERROR: yt-dlp not installed. Run: pip install yt-dlp")
        sys.exit(1)
    if not shutil.which("ffmpeg"):
        print("ERROR: ffmpeg not installed. Install via: brew install ffmpeg")
        sys.exit(1)

    url = url or BLOOMBERG_INTERVIEW_URL
    output_template = str(AUDIO_RAW_DIR / "delev_interview.%(ext)s")
    raw_wav = AUDIO_RAW_DIR / "delev_interview.wav"

    if raw_wav.exists():
        print(f"  Raw audio already exists: {raw_wav.name}")
        return raw_wav

    print(f"  Downloading audio from: {url}")
    cmd = [
        "yt-dlp",
        "--extract-audio",
        "--audio-format", "wav",
        "--audio-quality", "0",
        "--output", output_template,
        "--no-playlist",
        url,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  yt-dlp stderr: {result.stderr}")
        print(
            "\n  NOTE: If yt-dlp cannot extract from this URL, manually download"
            "\n  a video of Petar Delev speaking and place the audio as:"
            f"\n    {raw_wav}"
        )
        print("  Continuing without auto-download...")
        return raw_wav

    print(f"  Downloaded: {raw_wav.name}")
    return raw_wav


def clean_audio(raw_path: Path | None = None) -> Path:
    """
    Clean audio for voice cloning: highpass filter, noise gate, normalize,
    trim to ~90 seconds of speech.
    """
    raw_path = raw_path or (AUDIO_RAW_DIR / "delev_interview.wav")
    clean_path = AUDIO_CLEAN_DIR / "delev_clean.wav"

    if clean_path.exists():
        print(f"  Clean audio already exists: {clean_path.name}")
        return clean_path

    if not raw_path.exists():
        print(f"  WARNING: Raw audio not found at {raw_path}")
        print("  Place a WAV file of Petar Delev speaking at that path and re-run.")
        return clean_path

    print(f"  Cleaning audio: {raw_path.name} -> {clean_path.name}")
    cmd = [
        "ffmpeg", "-y",
        "-i", str(raw_path),
        "-af", ",".join([
            "highpass=f=80",
            "lowpass=f=12000",
            "afftdn=nf=-25",           # adaptive noise reduction
            "acompressor=threshold=-20dB:ratio=4:attack=5:release=50",
            "loudnorm=I=-16:TP=-1.5",  # EBU R128 normalization
        ]),
        "-ar", "44100",
        "-ac", "1",                     # mono
        "-t", "90",                     # first 90 seconds
        str(clean_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ffmpeg error: {result.stderr[:500]}")
        return clean_path

    size_kb = clean_path.stat().st_size / 1024
    print(f"  Clean audio saved: {clean_path.name} ({size_kb:.0f} KB)")
    return clean_path


# ---------------------------------------------------------------------------
# Phase 1: ElevenLabs Instant Voice Clone
# ---------------------------------------------------------------------------

def create_voice_clone(audio_path: Path | None = None, name: str = "Petar Delev - Solaron") -> str | None:
    """
    Create an Instant Voice Clone on ElevenLabs.
    Returns the voice_id on success.
    """
    api_key = require_elevenlabs()
    audio_path = audio_path or (AUDIO_CLEAN_DIR / "delev_clean.wav")

    if not audio_path.exists():
        print(f"  ERROR: Audio file not found: {audio_path}")
        print("  Run the audio download/clean steps first.")
        return None

    voice_id_cache = AUDIO_CLEAN_DIR / "voice_id.txt"
    if voice_id_cache.exists():
        cached = voice_id_cache.read_text().strip()
        if cached:
            print(f"  Using cached voice clone ID: {cached}")
            return cached

    print(f"  Creating ElevenLabs Instant Voice Clone: '{name}'")
    url = f"{ELEVENLABS_BASE}/voices/add"

    with open(audio_path, "rb") as f:
        resp = requests.post(
            url,
            headers={"xi-api-key": api_key},
            data={
                "name": name,
                "remove_background_noise": "true",
                "description": "Petar Delev, CEO of Solaron / Mega Solar Power. Bulgarian male voice.",
            },
            files={"files": (audio_path.name, f, "audio/wav")},
            timeout=120,
        )

    if resp.status_code != 200:
        print(f"  ERROR creating voice clone: {resp.status_code}")
        print(f"  Response: {resp.text[:500]}")
        return None

    voice_id = resp.json().get("voice_id")
    print(f"  Voice clone created: {voice_id}")

    voice_id_cache.write_text(voice_id)
    return voice_id


def list_voices() -> list[dict]:
    """List all available ElevenLabs voices (useful for debugging)."""
    api_key = require_elevenlabs()
    resp = requests.get(
        f"{ELEVENLABS_BASE}/voices",
        headers={"xi-api-key": api_key},
        timeout=30,
    )
    resp.raise_for_status()
    voices = resp.json().get("voices", [])
    return [{"voice_id": v["voice_id"], "name": v["name"]} for v in voices]


# ---------------------------------------------------------------------------
# Phase 3: Per-scene voiceover generation
# ---------------------------------------------------------------------------

def generate_voiceover(
    voice_id: str,
    text: str,
    output_path: Path,
    stability: float = 0.65,
    similarity_boost: float = 0.80,
    style: float = 0.35,
) -> Path | None:
    """Generate a single voiceover audio file via ElevenLabs TTS."""
    api_key = require_elevenlabs()

    if output_path.exists() and output_path.stat().st_size > 0:
        print(f"    Voiceover exists: {output_path.name}")
        return output_path

    url = f"{ELEVENLABS_BASE}/text-to-speech/{voice_id}"
    payload = {
        "text": text,
        "model_id": ELEVENLABS_TTS_MODEL,
        "voice_settings": {
            "stability": stability,
            "similarity_boost": similarity_boost,
            "style": style,
            "use_speaker_boost": True,
        },
    }

    resp = requests.post(
        url,
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
        json=payload,
        timeout=60,
    )

    if resp.status_code != 200:
        print(f"    ERROR generating voiceover: {resp.status_code} — {resp.text[:300]}")
        return None

    output_path.write_bytes(resp.content)
    size_kb = output_path.stat().st_size / 1024
    print(f"    Saved: {output_path.name} ({size_kb:.0f} KB)")
    return output_path


def generate_all_voiceovers(voice_id: str) -> dict[str, Path]:
    """Generate voiceover audio for every scene in the storyboard."""
    print(f"\n  Generating voiceovers with voice: {voice_id}")
    results = {}

    for scene in SCENES:
        out = VOICEOVER_DIR / f"{scene.id}_vo.mp3"
        print(f"  [{scene.id}] {scene.label}")
        path = generate_voiceover(voice_id, scene.voiceover_bg, out)
        if path and path.exists():
            results[scene.id] = path
        else:
            print(f"    WARNING: Failed for scene {scene.id}")

    print(f"\n  Voiceovers generated: {len(results)}/{len(SCENES)}")
    return results


# ---------------------------------------------------------------------------
# Test helper
# ---------------------------------------------------------------------------

def test_voice(voice_id: str):
    """Generate a short test clip to verify the voice clone sounds right."""
    test_text = "Здравейте, аз съм Петър Делев от Solaron. Добре дошли в бъдещето на чистата енергия."
    out = VOICEOVER_DIR / "test_voice.mp3"
    print("\n  Testing voice clone with sample text...")
    result = generate_voiceover(voice_id, test_text, out)
    if result:
        print(f"  Test audio saved: {result}")
        print("  Listen to it and verify the voice quality before proceeding.")
    return result


# ---------------------------------------------------------------------------
# CLI entry
# ---------------------------------------------------------------------------

def run_voice_pipeline():
    """Run the full voice pipeline: download -> clean -> clone -> generate."""
    print("\n" + "=" * 60)
    print("  PHASE 0+1: Voice Pipeline")
    print("=" * 60)

    print("\n  Step 1: Download audio from public source...")
    raw = download_audio()

    print("\n  Step 2: Clean and normalize audio...")
    clean = clean_audio(raw)

    print("\n  Step 3: Create ElevenLabs voice clone...")
    voice_id = create_voice_clone(clean)
    if not voice_id:
        print("  ABORT: Could not create voice clone.")
        return None

    print("\n  Step 4: Test the voice clone...")
    test_voice(voice_id)

    print("\n  Step 5: Generate all scene voiceovers...")
    results = generate_all_voiceovers(voice_id)

    print("\n" + "=" * 60)
    print(f"  Voice pipeline complete. {len(results)} voiceovers ready.")
    print("=" * 60)
    return voice_id


if __name__ == "__main__":
    run_voice_pipeline()
