"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "cookie-consent";

type ConsentValue = "all" | "essential";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept(value: ConsentValue) {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          role="dialog"
          aria-label="Съгласие за бисквитки"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-xl border border-border bg-background p-5 shadow-elevated sm:bottom-6 sm:left-6 sm:right-6"
        >
          <p className="text-sm leading-relaxed text-foreground-secondary">
            Използваме бисквитки, за да подобрим вашето изживяване и да
            анализираме трафика на сайта.{" "}
            <Link
              href="/pravna-informatsiya/biskvitki"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Политика за бисквитки
            </Link>
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => accept("essential")}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-background-secondary"
            >
              Само необходими
            </button>
            <button
              type="button"
              onClick={() => accept("all")}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Приеми всички
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
