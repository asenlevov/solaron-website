"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const hiddenPages = ["/konfigurator", "/kontakti"];
  const isHidden = hiddenPages.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (isHidden) return;
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Link
            href="/kontakti"
            className={cn(
              "flex items-center gap-2 rounded-full bg-accent px-4 py-3 font-display text-sm font-semibold text-white shadow-lg transition-all duration-300",
              "hover:shadow-[0_0_30px_rgba(59,122,42,0.4)] hover:pr-6",
            )}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <Phone className="size-4" />
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Консултация
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
