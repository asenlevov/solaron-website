"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const MESSAGES = [
  { name: "Сем. Петрови", city: "Варна", text: "инсталираха 5 kWp система" },
  { name: "Хотел Ерма", city: "Трън", text: "спестява 45,000 лв./година" },
  { name: "Сем. Георгиеви", city: "Пловдив", text: "монтираха 10 kWp система" },
  { name: "Ферма Зелено", city: "Стара Загора", text: "инсталира 50 kWp система" },
  { name: "Сем. Иванови", city: "София", text: "добавиха батерия 10 kWh" },
  { name: "Офис сграда", city: "Бургас", text: "намали сметките с 78%" },
  { name: "Сем. Димитрови", city: "Банско", text: "стартираха соларна система" },
  { name: "Винарна Долината", city: "Мелник", text: "преминаха на соларна енергия" },
];

const TIMESTAMPS = ["Току-що", "Преди 1 мин.", "Преди 2 мин.", "Преди 3 мин."];

export function SocialProofToast() {
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
                от {msg.city}
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
            aria-label="Затвори"
          >
            <X className="size-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
