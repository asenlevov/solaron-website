"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

const MESSAGES = [
  { name: "С.П.", city: "Варна", text: "заявиха оферта за 5 kWp система" },
  { name: "Е.К.", city: "Трън", text: "заявиха безплатна консултация" },
  { name: "М.Г.", city: "Пловдив", text: "заявиха оферта за 10 kWp система" },
  { name: "Д.С.", city: "Стара Загора", text: "заявиха оферта за 50 kWp система" },
  { name: "И.В.", city: "София", text: "заявиха консултация за батерия" },
  { name: "Н.Р.", city: "Бургас", text: "заявиха оферта за покривна система" },
  { name: "А.Д.", city: "Банско", text: "заявиха безплатна консультация" },
  { name: "К.М.", city: "Казанлък", text: "заявиха оферта за 15 kWp система" },
];

const TIMESTAMPS = ["Току-що", "Преди 1 мин.", "Преди 2 мин.", "Преди 3 мин."];

export function SocialProofToast() {
  const t = useTranslations("SocialProofToast");
  const tc = useTranslations("Common");
  const [current, setCurrent] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const showNext = useCallback(() => {
    setCurrent((prev) => {
      const next = prev === null ? 0 : (prev + 1) % MESSAGES.length;
      return next;
    });
    setDismissed(false);
    setTimeout(() => setCurrent(null), 4000);
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(showNext, 8000);
    const interval = setInterval(() => showNext(), 12000 + Math.random() * 4000);
    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showNext]);

  const msg = current !== null ? MESSAGES[current] : null;
  const timestamp = TIMESTAMPS[Math.floor(Math.random() * TIMESTAMPS.length)];
  const initial = msg?.name[0] ?? "";

  return (
    <AnimatePresence>
      {msg && !dismissed && (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 24, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50 flex max-w-xs items-start gap-3 rounded-xl border border-border bg-background p-4 shadow-elevated"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-emerald-400 text-sm font-bold text-white">
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm leading-snug text-foreground">
              <span className="font-semibold">{msg.name}</span>{" "}
              <span className="text-foreground-secondary">
                {t("inCity", { city: msg.city })}
              </span>{" "}
              {msg.text}
            </p>
            <p className="mt-1 text-xs text-foreground-tertiary">
              {timestamp}
            </p>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-foreground-tertiary transition-colors hover:text-foreground"
            aria-label={tc("close")}
          >
            <X className="size-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
