"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tc = useTranslations("Common");

  const hidden = ["/konfigurator", "/kontakti"].some((p) =>
    pathname.startsWith(p),
  );

  useEffect(() => {
    if (hidden) return;
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Popup bubble */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                transition={{ duration: 0.2 }}
                className="mb-3 w-72 rounded-xl border border-accent/20 bg-white p-5 shadow-2xl dark:border-accent/30 dark:bg-[#111116]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-accent">
                      <Phone className="size-4 text-white" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Solaron
                      </h3>
                      <p className="text-[11px] text-accent">
                        {PHONE_DISPLAY}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-foreground-tertiary transition-colors hover:text-foreground"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-foreground-secondary">
                  {tc("callBubbleGreeting")}
                </p>

                <a
                  href={PHONE_HREF}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  <Phone className="size-4" aria-hidden />
                  {tc("callBubbleCta")}
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsating circle button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="group relative flex size-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110"
            aria-label={tc("callUs")}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-20" />
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="relative size-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="call"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Phone className="relative size-6" aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
