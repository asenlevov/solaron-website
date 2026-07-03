"""
Solaron Video Ad — Storyboard
8-scene Tesla-style brand film for the Bulgarian market (60 seconds).

Each scene has:
  - id / label
  - duration_sec (target duration for the assembled cut)
  - veo_prompt (cinematic Veo 3.1 text-to-video prompt)
  - voiceover_bg (Bulgarian narration text for ElevenLabs TTS)
  - use_reference_images (whether to attach CEO reference photos)
"""

from dataclasses import dataclass, field


STYLE_PREFIX = (
    "Premium cinematic commercial, Tesla-style advertising aesthetic, "
    "ultra high quality, professional color grading, "
)

GREEN_AMBIANCE = (
    "Green accent tones (#22c55e), warm optimistic lighting, "
    "shallow depth of field, anamorphic lens flare. "
)


@dataclass
class Scene:
    id: str
    label: str
    duration_sec: int
    veo_prompt: str
    voiceover_bg: str
    use_reference_images: bool = False
    veo_duration_sec: int = 8


SCENES: list[Scene] = [
    # ── Scene 1: Hook — Aerial Bulgaria + solar panels ──────────────
    Scene(
        id="01_hook",
        label="Hook — Sunrise over Bulgaria",
        duration_sec=8,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Cinematic aerial drone shot slowly descending over the Bulgarian "
            "countryside at golden hour. Pristine solar panels on a modern "
            "residential rooftop catch the warm sunlight, creating brilliant "
            "reflections. Lush green hills and valleys stretch to the horizon. "
            "Slow camera push forward. "
            f"{GREEN_AMBIANCE}"
            "Inspiring orchestral ambient music swells gently."
        ),
        voiceover_bg=(
            "Слънцето изгрява над България. "
            "Всеки ден — безплатна енергия."
        ),
    ),

    # ── Scene 2: Problem — Rising bills ─────────────────────────────
    Scene(
        id="02_problem",
        label="Problem — Rising electricity bills",
        duration_sec=8,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Close-up of an electricity meter with digital numbers spinning "
            "rapidly upward. Camera slowly dollies back to reveal a kitchen "
            "table covered with stacked utility bills and envelopes. "
            "Warm orange incandescent light fades gradually to cold, "
            "desaturated gray tones. Dramatic, tense mood. "
            "Subtle sound of a ticking clock."
        ),
        voiceover_bg=(
            "Сметките растат. Цените се покачват. "
            "Но има по-добър начин."
        ),
    ),

    # ── Scene 3: Vision — Futuristic smart home ─────────────────────
    Scene(
        id="03_vision",
        label="Vision — Futuristic solar home",
        duration_sec=8,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Wide establishing shot of a stunning modern smart home exterior "
            "at morning golden hour. Sleek all-black solar panels are "
            "seamlessly integrated into the roofline. Lush green garden "
            "surrounds the property. Clean contemporary architecture with "
            "floor-to-ceiling glass walls. A family's silhouette is visible "
            "inside the bright interior. Camera slowly tracks right. "
            f"{GREEN_AMBIANCE}"
            "Futuristic yet warm and inviting atmosphere. "
            "Gentle ambient electronic music."
        ),
        voiceover_bg=(
            "Представете си дом, който сам произвежда "
            "своята енергия."
        ),
    ),

    # ── Scene 4: CEO — Petar Delev speaks ───────────────────────────
    Scene(
        id="04_ceo",
        label="CEO — Petar Delev",
        duration_sec=8,
        use_reference_images=True,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Medium shot of a confident, well-dressed Bulgarian businessman "
            "in his late 30s, sitting in a modern minimalist office with a "
            "panoramic city view behind him. He looks directly into the "
            "camera with a warm, trustworthy expression and speaks with "
            "conviction. Professional three-point lighting with subtle "
            "green accent light on the background wall. Shallow depth of "
            "field focuses on his face. Premium interview-style framing. "
            "The man wears a dark navy blazer over a crisp white shirt, "
            "no tie. "
            f"{GREEN_AMBIANCE}"
        ),
        voiceover_bg=(
            "Аз съм Петър Делев. Solaron е моята мисия — "
            "чиста енергия за всеки български дом."
        ),
    ),

    # ── Scene 5: Product — Installation showcase ────────────────────
    Scene(
        id="05_product",
        label="Product — Solar panel installation",
        duration_sec=6,
        veo_duration_sec=6,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Cinematic close-up montage of a premium solar panel "
            "installation in progress. Professional technicians in branded "
            "uniforms carefully secure sleek black panels onto a modern "
            "rooftop mounting system. Time-lapse effect: the sun arcs "
            "across the sky from sunrise to sunset as panels are installed. "
            "Crisp detail shots of connectors clicking into place, panels "
            "reflecting clouds. "
            f"{GREEN_AMBIANCE}"
            "Satisfying mechanical sounds, upbeat tempo."
        ),
        voiceover_bg=(
            "Двадесет плюс години европейски опит. "
            "Над четиристотин доволни клиента."
        ),
    ),

    # ── Scene 6: Tech — Monitoring dashboard ────────────────────────
    Scene(
        id="06_tech",
        label="Tech — Smart monitoring",
        duration_sec=6,
        veo_duration_sec=6,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Close-up tracking shot of a person's hands holding a modern "
            "tablet displaying a futuristic energy monitoring dashboard. "
            "Animated green data streams and energy flow visualizations "
            "glow on screen — real-time wattage, battery charge level, "
            "savings counter ticking upward. The dashboard has a dark UI "
            "with vivid green (#22c55e) accent charts and graphs. "
            "Background is softly blurred modern living room. "
            "Sci-fi inspired but grounded and believable. "
            "Subtle digital interface sound effects."
        ),
        voiceover_bg=(
            "Мониторинг в реално време. "
            "Пълен контрол над вашата енергия."
        ),
    ),

    # ── Scene 7: Savings — Family + energy freedom ──────────────────
    Scene(
        id="07_savings",
        label="Savings — Energy independence",
        duration_sec=8,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Warm cinematic shot of a happy Bulgarian family relaxing in "
            "their modern, sunlit living room. Two children play on the "
            "floor while parents smile from a comfortable sofa. Camera "
            "slowly zooms out through the window to reveal solar panels "
            "on the rooftop glistening in the afternoon sun. A subtle "
            "green aurora-like energy visualization overlays the roofline, "
            "symbolizing energy independence. Optimistic, aspirational, "
            "emotionally uplifting. "
            f"{GREEN_AMBIANCE}"
            "Inspiring cinematic music crescendo."
        ),
        voiceover_bg=(
            "Спестете до осемдесет процента от сметката за ток. "
            "Инвестиция, която се изплаща."
        ),
    ),

    # ── Scene 8: CTA — Logo reveal + contact ───────────────────────
    Scene(
        id="08_cta",
        label="CTA — Solaron logo reveal",
        duration_sec=8,
        veo_prompt=(
            f"{STYLE_PREFIX}"
            "Dramatic logo reveal on a premium dark background (#0A0A0F). "
            "Green (#22c55e) luminous particles swirl and converge at the "
            "center of the frame, forming the Solaron power-sun logo icon — "
            "a circle with a vertical line through a gap at the top, "
            "resembling a power button fused with a sun. The logo pulses "
            "with green energy. Below the logo, the text 'Solaron' fades "
            "in with elegant typography. Contact information appears: "
            "'solaron.io | +359 88 432 1560'. "
            "The tagline 'Европейско качество. Българска надеждност.' "
            "fades in last. Cinematic dark atmosphere with green accent "
            "lighting. Powerful, premium brand moment."
        ),
        voiceover_bg=(
            "Solaron. Европейско качество. Българска надеждност. "
            "Заявете безплатна консултация днес."
        ),
    ),
]


def get_total_duration() -> int:
    return sum(s.duration_sec for s in SCENES)


def print_storyboard():
    """Print a formatted storyboard overview to stdout."""
    total = get_total_duration()
    print(f"\n{'=' * 70}")
    print(f"  SOLARON VIDEO AD — STORYBOARD ({total}s total, {len(SCENES)} scenes)")
    print(f"{'=' * 70}\n")

    t = 0
    for s in SCENES:
        ref = " [REF IMAGES]" if s.use_reference_images else ""
        print(f"  [{t:02d}s-{t + s.duration_sec:02d}s]  {s.label}{ref}")
        print(f"            VO: {s.voiceover_bg}")
        print()
        t += s.duration_sec

    print(f"{'=' * 70}")
    print(f"  Total: {total}s | Scenes: {len(SCENES)}")
    print(f"  CEO reference-image scene: {sum(1 for s in SCENES if s.use_reference_images)}")
    print(f"{'=' * 70}\n")


if __name__ == "__main__":
    print_storyboard()
