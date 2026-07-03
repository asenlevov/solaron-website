"""
Solaron Video Ad — Configuration
Loads API keys and defines paths / brand constants.
"""

import os
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PROJECT_DIR = Path(__file__).parent
REPO_ROOT = PROJECT_DIR.parent.parent

ASSETS_DIR = PROJECT_DIR / "assets"
PHOTOS_DIR = ASSETS_DIR / "photos"
AUDIO_RAW_DIR = ASSETS_DIR / "audio_raw"
AUDIO_CLEAN_DIR = ASSETS_DIR / "audio_clean"

OUTPUT_DIR = PROJECT_DIR / "output"
CLIPS_DIR = OUTPUT_DIR / "clips"
VOICEOVER_DIR = OUTPUT_DIR / "voiceover"
FINAL_DIR = OUTPUT_DIR / "final"

BRANDING_DIR = REPO_ROOT / "branding" / "solaron_generated"
LOGO_SVG = BRANDING_DIR / "solaron-icon-green.svg"
LOGO_PNG = BRANDING_DIR / "solaron-mark-green-on-dark.png"

for d in (PHOTOS_DIR, AUDIO_RAW_DIR, AUDIO_CLEAN_DIR, CLIPS_DIR, VOICEOVER_DIR, FINAL_DIR):
    d.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# API Keys
# ---------------------------------------------------------------------------

def _load_env_key(name: str, alt_names: list[str] | None = None) -> str | None:
    """Try env var first, then search multiple .env files across projects."""
    all_names = [name] + (alt_names or [])
    for n in all_names:
        val = os.environ.get(n)
        if val:
            return val

    env_files = [
        REPO_ROOT / "frontend" / ".env",
        Path.home() / "Desktop" / "10xstudio" / "web" / ".env.local",
        Path.home() / "Desktop" / "PolygrAI" / "Core" / "core-2.0" / ".env",
        Path.home() / "Desktop" / "PolygrAI" / "API" / ".env",
    ]
    for env_path in env_files:
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                for n in all_names:
                    if line.startswith(f"{n}="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None


GEMINI_API_KEY = _load_env_key("GEMINI_API_KEY", alt_names=["GOOGLE_AI_API_KEY"])
ELEVENLABS_API_KEY = _load_env_key("ELEVENLABS_API_KEY", alt_names=["ELEVEN_API_KEY"])

# ---------------------------------------------------------------------------
# Model identifiers
# ---------------------------------------------------------------------------

VEO_MODEL = "veo-3.1-generate-preview"
VEO_FAST_MODEL = "veo-3.1-fast-generate-preview"
IMAGE_MODEL = "gemini-2.5-flash-image"
ELEVENLABS_TTS_MODEL = "eleven_multilingual_v2"

# ---------------------------------------------------------------------------
# Video defaults
# ---------------------------------------------------------------------------

ASPECT_RATIO = "16:9"
RESOLUTION = "1080p"
PERSON_GENERATION = "allow_all"
PERSON_GENERATION_REF = "allow_adult"  # for reference-image / image-to-video mode
POLL_INTERVAL_SEC = 10

# ---------------------------------------------------------------------------
# Brand constants
# ---------------------------------------------------------------------------

BRAND = {
    "name": "Solaron",
    "tagline_bg": "Европейско качество. Българска надеждност.",
    "tagline_en": "European quality. Bulgarian reliability.",
    "phone": "+359 88 432 1560",
    "email": "hello@solaron.io",
    "website": "solaron.io",
    "colors": {
        "green_primary": "#3B7A2A",
        "green_accent": "#22c55e",
        "green_light": "#4ade80",
        "green_deep": "#059669",
        "dark_bg": "#0A0A0F",
        "white": "#FAFAFA",
    },
}

# ---------------------------------------------------------------------------
# Audio source for voice cloning
# ---------------------------------------------------------------------------

BLOOMBERG_INTERVIEW_URL = (
    "https://www.bloombergtv.bg/a/16-biznes-start/117409-"
    "p-delev-ne-e-vazhno-kolko-obekta-otvaryash-a-da-tezhish-na-myastoto-si"
)

# ---------------------------------------------------------------------------
# Validation helpers
# ---------------------------------------------------------------------------

def require_gemini():
    if not GEMINI_API_KEY:
        print("ERROR: GEMINI_API_KEY not found. Set env var or add to frontend/.env")
        sys.exit(1)
    return GEMINI_API_KEY


def require_elevenlabs():
    if not ELEVENLABS_API_KEY:
        print("ERROR: ELEVENLABS_API_KEY not found. Set env var or add to frontend/.env")
        sys.exit(1)
    return ELEVENLABS_API_KEY
