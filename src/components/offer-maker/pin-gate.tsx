"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

const CORRECT_PIN = "8888";
const SESSION_KEY = "solaron-offer-pin";

export function PinGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "ok") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!authenticated && !checking) {
      inputRef.current?.focus();
    }
  }, [authenticated, checking]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      sessionStorage.setItem(SESSION_KEY, "ok");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
      inputRef.current?.focus();
    }
  }

  if (checking) {
    return null;
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-border bg-white p-10 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="font-display text-xl font-bold text-foreground">
            Вътрешен инструмент
          </h2>
          <p className="mt-1 font-body text-sm text-foreground-secondary">
            Въведете PIN за достъп
          </p>
        </div>
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, ""));
            setError(false);
          }}
          className={`w-full rounded-xl border-2 px-4 py-3 text-center font-display text-2xl tracking-[0.5em] transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
            error
              ? "border-red-400 bg-red-50"
              : "border-border bg-muted/30 focus:border-accent"
          }`}
          placeholder="····"
          autoComplete="off"
        />
        {error && (
          <p className="font-body text-sm text-red-500">Грешен PIN код</p>
        )}
        <button
          type="submit"
          disabled={pin.length < 4}
          className="w-full rounded-xl bg-accent px-4 py-3 font-display text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Вход
        </button>
      </form>
    </div>
  );
}
