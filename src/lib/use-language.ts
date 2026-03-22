"use client";

import { useState, useEffect } from "react";

type Language = "bg" | "en";

const STORAGE_KEY = "solaron-language";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("bg");
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && (stored === "bg" || stored === "en")) {
      setLanguageState(stored);
      setDetected(true);
      return;
    }

    // Auto-detect via IP geolocation
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })
      .then((res) => res.json())
      .then((data) => {
        const country = data?.country_code?.toUpperCase();
        const lang: Language = country === "BG" ? "bg" : "en";
        setLanguageState(lang);
        localStorage.setItem(STORAGE_KEY, lang);
        setDetected(true);
      })
      .catch(() => {
        // Default to Bulgarian on error
        setLanguageState("bg");
        setDetected(true);
      });
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  return { language, setLanguage, detected };
}
