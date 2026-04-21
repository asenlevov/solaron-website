"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { OfferState } from "./offer-types";
import type { ComputedValues } from "./offer-wizard";
import { generateOfferHtml, fixImagePaths } from "@/lib/generate-offer-html";
import { ChevronLeft, ChevronRight, Maximize2, Printer } from "lucide-react";

interface OfferPreviewProps {
  state: OfferState;
  computed: ComputedValues;
}

const TEMPLATE_CACHE: { html: string | null } = { html: null };

async function getTemplate(): Promise<string> {
  if (TEMPLATE_CACHE.html) return TEMPLATE_CACHE.html;
  const res = await fetch("/solaron-oferta-dom-template.html");
  const html = await res.text();
  TEMPLATE_CACHE.html = html;
  return html;
}

export function OfferPreview({ state, computed }: OfferPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(16);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateIframe = useCallback(
    async (slideIndex?: number) => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        const template = await getTemplate();
        let html = generateOfferHtml(template, state, computed);
        html = fixImagePaths(html);

        const slideToShow = slideIndex ?? currentSlide;
        const initScript = `
<script>
window.__PREVIEW_MODE__ = true;
window.addEventListener('DOMContentLoaded', function() {
  var nav = document.querySelector('.nav-ui');
  if (nav) nav.style.display = 'none';
  var hint = document.querySelector('.hint');
  if (hint) hint.style.display = 'none';

  var slides = document.querySelectorAll('.slide');
  window.__totalSlides = slides.length;

  window.__goToSlide = function(i) {
    if (i < 0 || i >= slides.length) return;
    slides.forEach(function(s, idx) {
      s.classList.remove('active', 'prev');
      if (idx === i) s.classList.add('active');
      else if (idx < i) s.classList.add('prev');
    });
    window.parent.postMessage({ type: 'SLIDE_CHANGED', slide: i, total: slides.length }, '*');
  };

  window.__goToSlide(${slideToShow});
  window.parent.postMessage({ type: 'PREVIEW_READY', total: slides.length }, '*');
});

document.addEventListener('keydown', function(e) {
  e.stopPropagation();
  e.preventDefault();
}, true);
</script>`;

        html = html.replace("</body>", initScript + "\n</body>");

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        iframe.onload = () => {
          setLoading(false);
          URL.revokeObjectURL(url);
        };
        iframe.src = url;
      } catch {
        setLoading(false);
      }
    },
    [state, computed, currentSlide],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setLoading(true);
      updateIframe();
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [updateIframe]);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "PREVIEW_READY") {
        setTotalSlides(e.data.total);
        setLoading(false);
      }
      if (e.data?.type === "SLIDE_CHANGED") {
        setCurrentSlide(e.data.slide);
        setTotalSlides(e.data.total);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (iframe.contentWindow as any).__goToSlide?.(i);
      } catch {
        // cross-origin fallback: re-render
        setCurrentSlide(i);
        updateIframe(i);
      }
    },
    [updateIframe],
  );

  const prev = () => goTo(Math.max(0, currentSlide - 1));
  const next = () => goTo(Math.min(totalSlides - 1, currentSlide + 1));

  const openFullPreview = useCallback(async () => {
    const template = await getTemplate();
    let html = generateOfferHtml(template, state, computed);
    html = fixImagePaths(html);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  }, [state, computed]);

  const handlePrint = useCallback(async () => {
    const template = await getTemplate();
    let html = generateOfferHtml(template, state, computed);
    html = fixImagePaths(html);

    const printScript = `<script>
window.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('print-mode');
  var deck = document.getElementById('deck');
  if (deck) deck.style.transform = '';
  var nav = document.querySelector('.nav-ui');
  if (nav) nav.style.display = 'none';
  var hint = document.querySelector('.hint');
  if (hint) hint.style.display = 'none';
  setTimeout(function() { window.print(); }, 500);
});
<\/script>`;

    html = html.replace("</body>", printScript + "\n</body>");
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  }, [state, computed]);

  const enabledSlides = state.slides
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white transition-colors hover:bg-muted disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {enabledSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide
                    ? "w-6 bg-accent"
                    : "w-2 bg-border hover:bg-foreground-secondary"
                }`}
                title={s.label}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={currentSlide >= totalSlides - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white transition-colors hover:bg-muted disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <span className="font-body text-sm text-foreground-secondary">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-foreground-secondary">
            {enabledSlides[currentSlide]?.label ?? ""}
          </span>
          <button
            onClick={openFullPreview}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-white px-3 font-body text-xs text-foreground-secondary transition-colors hover:bg-muted"
            title="Отвори в нов таб"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Пълен изглед
          </button>
          <button
            onClick={handlePrint}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 font-display text-xs font-semibold text-white transition-opacity hover:opacity-90"
            title="Печат / PDF"
          >
            <Printer className="h-3.5 w-3.5" />
            Печат / PDF
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-black shadow-lg">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-accent" />
              <span className="font-body text-xs text-white/60">
                Зареждане...
              </span>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="Преглед на офертата"
        />
      </div>
    </div>
  );
}
