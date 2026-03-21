"use client";

import { useEffect, useState, useMemo, useRef } from "react";

function useAnimatedValue(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

/* ═══════════════════════════════════════════════════════════════
   PANELS — Light sky scene with sun, roof panels, energy flow
   ═══════════════════════════════════════════════════════════════ */

export function PanelAnimation() {
  const watts = useAnimatedValue(450, 2000);

  return (
    <svg viewBox="0 0 480 360" className="w-full h-full" style={{ background: "#f0f7ff" }}>
      <defs>
        <linearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#f0f7ff" />
        </linearGradient>
        <linearGradient id="p-cell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#152a45" />
        </linearGradient>
        <radialGradient id="p-sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#FFA500" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
        </radialGradient>
        <filter id="p-glow"><feGaussianBlur stdDeviation="3" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="p-softGlow"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      <rect width="480" height="360" fill="url(#p-sky)" />

      {/* Sun */}
      <circle cx="390" cy="65" r="70" fill="url(#p-sunGlow)" />
      <circle cx="390" cy="65" r="32" fill="#FFD700" opacity="0.12" filter="url(#p-softGlow)">
        <animate attributeName="r" values="32;36;32" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="390" cy="65" r="18" fill="#FFD700" opacity="0.85">
        <animate attributeName="r" values="18;20;18" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Sun rays */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 - 160) * (Math.PI / 180);
        return (
          <line key={i} x1={390 + Math.cos(angle) * 25} y1={65 + Math.sin(angle) * 25}
            x2={390 + Math.cos(angle) * 45} y2={65 + Math.sin(angle) * 45}
            stroke="#FFD700" strokeWidth="1.5" opacity="0.35" strokeLinecap="round">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        );
      })}

      {/* Light beams to panels */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`beam${i}`} x1={375 - i * 6} y1={80 + i * 3} x2={80 + i * 42} y2={145 + i * 5}
          stroke="#FFD700" strokeWidth="0.6" opacity="0.08" strokeDasharray="5 8">
          <animate attributeName="stroke-dashoffset" from="13" to="0" dur={`${1.2 + i * 0.12}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Rooftop */}
      <polygon points="30,200 240,130 450,200" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      <polygon points="30,200 240,130 240,144 30,214" fill="#cbd5e1" />

      {/* Solar panel array — 3x2 */}
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => {
          const x = 62 + col * 118;
          const y = 144 + row * 30 - col * 7;
          return (
            <g key={`panel-${col}-${row}`} transform={`translate(${x}, ${y})`}>
              <rect x="0" y="0" width="108" height="26" rx="1.5" fill="url(#p-cell)" stroke="#334155" strokeWidth="0.8" />
              {[1, 2, 3, 4, 5].map((c) => (
                <line key={`cg${c}`} x1={c * 18} y1="1" x2={c * 18} y2="25" stroke="#1e293b" strokeWidth="0.3" />
              ))}
              <line x1="1" y1="13" x2="107" y2="13" stroke="#1e293b" strokeWidth="0.3" />
              <rect x="0" y="0" width="18" height="26" rx="1" fill="white" opacity="0.06">
                <animate attributeName="x" values="-18;126" dur={`${4 + col * 0.5}s`} repeatCount="indefinite" />
              </rect>
            </g>
          );
        })
      )}

      {/* Energy particles from panels down */}
      {Array.from({ length: 10 }, (_, i) => {
        const startX = 110 + (i % 3) * 100;
        return (
          <circle key={`p-${i}`} r={2 + (i % 2)} fill={i % 2 === 0 ? "#FFD700" : "#3B7A2A"} filter="url(#p-glow)" opacity="0">
            <animateMotion dur={`${1.6 + (i % 4) * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.25}s`}
              path={`M${startX},${152 + (i % 2) * 22} C${startX + 8},${195} ${175 + (i % 3) * 15},${240} ${195},${278}`} />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${1.6 + (i % 4) * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
            <animate attributeName="fill" values="#FFD700;#3B7A2A" dur={`${1.6 + (i % 4) * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
          </circle>
        );
      })}

      {/* Output meter card */}
      <g transform="translate(165, 280)">
        <rect x="0" y="0" width="150" height="44" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="18" cy="22" r="5" fill="#3B7A2A" opacity="0.15" />
        <circle cx="18" cy="22" r="2.5" fill="#3B7A2A">
          <animate attributeName="r" values="2.5;3.5;2.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="32" y="17" fill="#64748b" fontSize="8" fontFamily="system-ui">Производство</text>
        <text x="32" y="33" fill="#3B7A2A" fontSize="16" fontWeight="900" fontFamily="system-ui">{Math.round(watts)}W</text>
        {/* Mini bar */}
        <rect x="112" y="10" width="26" height="24" rx="4" fill="#f0fdf4" stroke="#d1fae5" strokeWidth="0.8" />
        {[0, 1, 2, 3, 4].map((b) => (
          <rect key={b} x="116" y={28 - b * 5} width="18" height="3" rx="1"
            fill={b < Math.floor(watts / 100) ? "#3B7A2A" : "#e2e8f0"}
            opacity={b < Math.floor(watts / 100) ? 0.8 : 0.4} />
        ))}
      </g>

      {/* Energy line down */}
      <line x1="240" y1="324" x2="240" y2="355" stroke="#3B7A2A" strokeWidth="1.5" opacity="0.25" strokeDasharray="3 4">
        <animate attributeName="stroke-dashoffset" from="7" to="0" dur="0.8s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INVERTERS — DC→AC waveform conversion, light theme
   ═══════════════════════════════════════════════════════════════ */

export function InverterAnimation() {
  const efficiency = useAnimatedValue(99.5, 2500);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let raf: number;
    const animate = () => { setPhase((p) => p + 0.04); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const dcPath = useMemo(() => {
    let d = "M0,55";
    for (let x = 0; x <= 140; x += 1) {
      const noise = Math.sin(x * 0.8 + phase * 3) * 12 + Math.sin(x * 2.1 + phase * 5) * 6 + Math.sin(x * 5 + phase * 8) * 3;
      d += ` L${x},${55 + noise}`;
    }
    return d;
  }, [phase]);

  const acPath = useMemo(() => {
    let d = "M0,55";
    for (let x = 0; x <= 140; x += 1) {
      d += ` L${x},${55 + Math.sin((x * 0.08) + phase * 2) * 35}`;
    }
    return d;
  }, [phase]);

  return (
    <svg viewBox="0 0 480 360" className="w-full h-full" style={{ background: "#f8f9fb" }}>
      <defs>
        <filter id="i-rGlow"><feGaussianBlur stdDeviation="2.5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="i-gGlow"><feGaussianBlur stdDeviation="2.5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      <text x="240" y="22" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">КОНВЕРСИЯ НА ЕНЕРГИЯ</text>

      {/* DC Scope */}
      <g transform="translate(15, 38)">
        <rect x="0" y="0" width="155" height="120" rx="8" fill="white" stroke="#fecaca" strokeWidth="1.2" />
        <text x="10" y="17" fill="#dc2626" fontSize="9" fontWeight="bold" fontFamily="system-ui" opacity="0.8">DC ВХОД</text>
        <text x="145" y="17" textAnchor="end" fill="#dc2626" fontSize="8" fontFamily="system-ui" opacity="0.45">~340V</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="5" y1={30 + i * 22} x2="150" y2={30 + i * 22} stroke="#fecaca" strokeWidth="0.5" opacity="0.4" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`v${i}`} x1={5 + i * 24} y1="25" x2={5 + i * 24} y2="115" stroke="#fecaca" strokeWidth="0.5" opacity="0.3" />
        ))}
        <line x1="5" y1="74" x2="150" y2="74" stroke="#dc2626" strokeWidth="0.5" opacity="0.1" strokeDasharray="3 3" />
        <g transform="translate(5, 18)">
          <path d={dcPath} fill="none" stroke="#dc2626" strokeWidth="1.8" opacity="0.75" filter="url(#i-rGlow)" />
        </g>
      </g>

      {/* Inverter box */}
      <g transform="translate(185, 33)">
        <rect x="0" y="0" width="110" height="130" rx="12" fill="white" stroke="#3B7A2A" strokeWidth="2" />
        <text x="55" y="26" textAnchor="middle" fill="#3B7A2A" fontSize="8" fontWeight="bold" fontFamily="system-ui" letterSpacing="1">SOLAREDGE</text>
        <text x="55" y="46" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontWeight="900" fontFamily="system-ui">HD-Wave</text>
        <circle cx="55" cy="60" r="4" fill="#3B7A2A" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(18, ${76 + i * 14})`}>
            <rect x="0" y="0" width="74" height="6" rx="3" fill="#f0fdf4" />
            <rect x="0" y="0" width="74" height="6" rx="3" fill="#3B7A2A" opacity="0.6">
              <animate attributeName="width" values="0;74;0" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </rect>
          </g>
        ))}
        <text x="55" y="122" textAnchor="middle" fill="#3B7A2A" fontSize="7" fontFamily="system-ui" opacity="0.5">38°C • Normal</text>
      </g>

      {/* AC Scope */}
      <g transform="translate(310, 38)">
        <rect x="0" y="0" width="155" height="120" rx="8" fill="white" stroke="#bbf7d0" strokeWidth="1.2" />
        <text x="10" y="17" fill="#3B7A2A" fontSize="9" fontWeight="bold" fontFamily="system-ui" opacity="0.8">AC ИЗХОД</text>
        <text x="145" y="17" textAnchor="end" fill="#3B7A2A" fontSize="8" fontFamily="system-ui" opacity="0.45">230V 50Hz</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="5" y1={30 + i * 22} x2="150" y2={30 + i * 22} stroke="#bbf7d0" strokeWidth="0.5" opacity="0.5" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`v${i}`} x1={5 + i * 24} y1="25" x2={5 + i * 24} y2="115" stroke="#bbf7d0" strokeWidth="0.5" opacity="0.3" />
        ))}
        <line x1="5" y1="74" x2="150" y2="74" stroke="#3B7A2A" strokeWidth="0.5" opacity="0.1" strokeDasharray="3 3" />
        <g transform="translate(5, 18)">
          <path d={acPath} fill="none" stroke="#3B7A2A" strokeWidth="2" opacity="0.85" filter="url(#i-gGlow)" strokeLinecap="round" />
        </g>
      </g>

      {/* Flow particles */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={`dc${i}`} r="2.5" fill="#dc2626" opacity="0" filter="url(#i-rGlow)">
          <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${i * 0.3}s`} path="M170,98 L185,98" />
          <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
        </circle>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <circle key={`ac${i}`} r="2.5" fill="#3B7A2A" opacity="0" filter="url(#i-gGlow)">
          <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${i * 0.3}s`} path="M295,98 L310,98" />
          <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
        </circle>
      ))}

      {/* Bottom metrics */}
      <g transform="translate(15, 193)">
        <rect x="0" y="0" width="145" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="12" y="19" fill="#64748b" fontSize="8" fontFamily="system-ui">Ефективност</text>
        <text x="12" y="47" fill="#3B7A2A" fontSize="26" fontWeight="900" fontFamily="system-ui">{efficiency.toFixed(1)}%</text>

        <rect x="155" y="0" width="145" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="167" y="19" fill="#64748b" fontSize="8" fontFamily="system-ui">Мощностен фактор</text>
        <text x="167" y="47" fill="#1a1a1a" fontSize="26" fontWeight="900" fontFamily="system-ui">0.99</text>

        <rect x="310" y="0" width="155" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="322" y="19" fill="#64748b" fontSize="8" fontFamily="system-ui">MPPT Тракери</text>
        <g transform="translate(322, 28)">
          {[0, 1, 2].map((t) => (
            <g key={t} transform={`translate(${t * 42}, 0)`}>
              <rect x="0" y="0" width="35" height="22" rx="4" fill="#f0fdf4" stroke="#d1fae5" strokeWidth="0.8" />
              <text x="17.5" y="15" textAnchor="middle" fill="#3B7A2A" fontSize="10" fontWeight="bold" fontFamily="system-ui">
                {(3.2 + t * 0.3).toFixed(1)}
              </text>
            </g>
          ))}
        </g>
        <text x="322" y="58" fill="#94a3b8" fontSize="7" fontFamily="system-ui">kW per tracker</text>
      </g>

      {/* Bottom strip */}
      <g transform="translate(15, 268)">
        <rect x="0" y="0" width="450" height="28" rx="6" fill="#f0fdf4" stroke="#d1fae5" strokeWidth="0.8" />
        {["DC Input: 340V", "→", "HD-Wave Conversion", "→", "AC Output: 230V 50Hz", "→", "Grid Ready"].map((label, i) => (
          <text key={i} x={15 + i * 65} y="18" fill={label === "→" ? "#3B7A2A" : "#64748b"} fontSize={label === "→" ? "12" : "8"} fontFamily="system-ui" opacity={label === "→" ? 0.5 : 0.6}>
            {label}
          </text>
        ))}
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BATTERIES — Day/night charge/discharge cycle
   ═══════════════════════════════════════════════════════════════ */

export function BatteryAnimation() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setIsDay((p) => !p), 5000);
    return () => clearInterval(interval);
  }, []);

  const level = isDay ? 95 : 30;
  const bg = isDay ? "#f5f9ff" : "#1a2030";
  const cardBg = isDay ? "white" : "#1e293b";
  const cardBorder = isDay ? "#e2e8f0" : "#334155";
  const textPrimary = isDay ? "#1a1a1a" : "white";
  const textSecondary = isDay ? "#64748b" : "#94a3b8";
  const textTertiary = isDay ? "#94a3b8" : "#64748b";

  return (
    <svg viewBox="0 0 480 360" className="w-full h-full" style={{ background: bg, transition: "background 1.5s" }}>
      <defs>
        <filter id="b-glow"><feGaussianBlur stdDeviation="3.5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id="b-charge" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3B7A2A" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="480" height="3" fill={isDay ? "#FFD700" : "#6366f1"} opacity="0.3" style={{ transition: "fill 1.5s" }} />
      <text x="240" y="24" textAnchor="middle" fill={textSecondary} fontSize="10" fontWeight="bold" fontFamily="system-ui" letterSpacing="2" style={{ transition: "fill 1.5s" }}>
        {isDay ? "ДНЕВЕН РЕЖИМ — ЗАРЕЖДАНЕ" : "НОЩЕН РЕЖИМ — ЗАХРАНВАНЕ"}
      </text>

      {/* Solar Panels */}
      <g transform="translate(30, 48)" opacity={isDay ? 1 : 0.3} style={{ transition: "opacity 1.5s" }}>
        <rect x="0" y="0" width="100" height="68" rx="8" fill={cardBg} stroke={isDay ? "#3B7A2A" : cardBorder} strokeWidth="1.2" style={{ transition: "all 1.5s" }} />
        <text x="50" y="18" textAnchor="middle" fill={isDay ? "#3B7A2A" : textTertiary} fontSize="8" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>ПАНЕЛИ</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={12 + (i % 2) * 40} y={26 + Math.floor(i / 2) * 17} width="36" height="13" rx="2"
            fill={isDay ? "#f0fdf4" : "#1a2535"} stroke={isDay ? "#3B7A2A" : "#333"} strokeWidth="0.5" style={{ transition: "all 1.5s" }} />
        ))}
        <text x="50" y="64" textAnchor="middle" fill={isDay ? "#3B7A2A" : textTertiary} fontSize="10" fontWeight="900" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>
          {isDay ? "4.5 kW" : "0 kW"}
        </text>
      </g>

      {/* Battery */}
      <g transform="translate(175, 43)">
        <rect x="0" y="0" width="130" height="78" rx="8" fill={cardBg} stroke="#3B7A2A" strokeWidth="2" style={{ transition: "fill 1.5s" }} />
        <rect x="48" y="-5" width="34" height="7" rx="3" fill={isDay ? "#d1fae5" : "#2a4a2a"} style={{ transition: "fill 1.5s" }} />
        <rect x="8" y="14" width="114" height="48" rx="4" fill={isDay ? "#f1f5f9" : "#0f172a"} style={{ transition: "fill 1.5s" }} />
        <rect x="8" y={14 + 48 - (level / 100) * 48} width="114" height={(level / 100) * 48} rx="4" fill="url(#b-charge)" opacity="0.75" style={{ transition: "all 2s ease-in-out" }}>
          <animate attributeName="opacity" values="0.65;0.85;0.65" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x="65" y="46" textAnchor="middle" fill={textPrimary} fontSize="20" fontWeight="900" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>{level}%</text>
        <text x="65" y="74" textAnchor="middle" fill="#3B7A2A" fontSize="7" fontWeight="bold" fontFamily="system-ui">13.5 kWh LFP</text>
      </g>

      {/* House */}
      <g transform="translate(350, 48)">
        <rect x="0" y="0" width="100" height="68" rx="8" fill={cardBg} stroke={!isDay ? "#3B7A2A" : cardBorder} strokeWidth="1.2" style={{ transition: "all 1.5s" }} />
        <text x="50" y="18" textAnchor="middle" fill={!isDay ? "#3B7A2A" : textSecondary} fontSize="8" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>ДОМА</text>
        <polygon points="50,26 28,42 72,42" fill={!isDay ? "#3B7A2A" : "#e2e8f0"} style={{ transition: "fill 1.5s" }} />
        <rect x="32" y="42" width="36" height="16" fill={!isDay ? "#1a3a2a" : "#f1f5f9"} style={{ transition: "fill 1.5s" }} />
        <rect x="43" y="44" width="14" height="14" fill={!isDay ? "#ffe0a0" : "#e2e8f0"} opacity={!isDay ? 0.8 : 0.4} style={{ transition: "all 1.5s" }} />
        <text x="50" y="72" textAnchor="middle" fill={textPrimary} fontSize="9" fontWeight="bold" fontFamily="system-ui" opacity="0.7" style={{ transition: "fill 1.5s" }}>2.1 kW</text>
      </g>

      {/* Grid */}
      <g transform="translate(350, 150)">
        <rect x="0" y="0" width="100" height="50" rx="8" fill={cardBg} stroke={cardBorder} strokeWidth="1" style={{ transition: "all 1.5s" }} />
        <text x="50" y="17" textAnchor="middle" fill={textTertiary} fontSize="8" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>МРЕЖА</text>
        <line x1="40" y1="26" x2="40" y2="43" stroke={textTertiary} strokeWidth="1.5" style={{ transition: "stroke 1.5s" }} />
        <line x1="60" y1="26" x2="60" y2="43" stroke={textTertiary} strokeWidth="1.5" style={{ transition: "stroke 1.5s" }} />
        <line x1="35" y1="30" x2="65" y2="30" stroke={textTertiary} strokeWidth="1.2" style={{ transition: "stroke 1.5s" }} />
        <line x1="37" y1="37" x2="63" y2="37" stroke={textTertiary} strokeWidth="0.8" style={{ transition: "stroke 1.5s" }} />
      </g>

      {/* Flow particles */}
      {isDay && [0, 1, 2, 3, 4].map((i) => (
        <circle key={`pb${i}`} r="3" fill="#FFD700" opacity="0" filter="url(#b-glow)">
          <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} path="M130,82 L175,82" />
          <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
        </circle>
      ))}
      {!isDay && [0, 1, 2, 3, 4].map((i) => (
        <circle key={`bh${i}`} r="3" fill="#4ade80" opacity="0" filter="url(#b-glow)">
          <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} path="M305,82 L350,82" />
          <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
        </circle>
      ))}

      <line x1="130" y1="82" x2="175" y2="82" stroke={isDay ? "#FFD700" : cardBorder} strokeWidth="1" opacity={isDay ? 0.25 : 0.1} strokeDasharray="4 4" style={{ transition: "all 1.5s" }} />
      <line x1="305" y1="82" x2="350" y2="82" stroke={!isDay ? "#4ade80" : cardBorder} strokeWidth="1" opacity={!isDay ? 0.25 : 0.1} strokeDasharray="4 4" style={{ transition: "all 1.5s" }} />

      {/* 24h timeline */}
      <g transform="translate(30, 240)">
        <text x="0" y="0" fill={textSecondary} fontSize="8" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>24-часов цикъл на енергия</text>
        <rect x="0" y="10" width="420" height="28" rx="6" fill={cardBg} stroke={cardBorder} strokeWidth="0.8" style={{ transition: "all 1.5s" }} />
        <rect x="2" y="12" width="208" height="24" rx="5" fill={isDay ? "#fefce8" : (isDay ? "#f0fdf4" : "#1a3a1a")} opacity={isDay ? 0.7 : 0.2} style={{ transition: "all 1.5s" }} />
        <rect x="210" y="12" width="208" height="24" rx="5" fill={!isDay ? "#1e1b4b" : "#f1f5f9"} opacity={!isDay ? 0.5 : 0.15} style={{ transition: "all 1.5s" }} />
        {["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "00:00", "03:00"].map((t, i) => (
          <text key={t} x={i * 54 + 10} y="28" fill={textTertiary} fontSize="7" fontFamily="system-ui" textAnchor="middle" style={{ transition: "fill 1.5s" }}>{t}</text>
        ))}
        <rect x={isDay ? 100 : 310} y="10" width="3" height="28" rx="1.5" fill={isDay ? "#FFD700" : "#6366f1"} opacity="0.7" style={{ transition: "all 1.5s" }}>
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Bottom stats */}
      <g transform="translate(30, 296)">
        {[
          { label: "Произведени днес", value: isDay ? "18.4 kWh" : "22.6 kWh", color: "#3B7A2A" },
          { label: "Самоконсумация", value: "87%", color: "#3B7A2A" },
          { label: "Спестени днес", value: "5.65 лв", color: "#b45309" },
          { label: "CO₂ спестени", value: "9.2 кг", color: "#0891b2" },
        ].map((stat, i) => (
          <g key={stat.label} transform={`translate(${i * 112}, 0)`}>
            <rect x="0" y="0" width="105" height="40" rx="6" fill={cardBg} stroke={cardBorder} strokeWidth="0.8" style={{ transition: "all 1.5s" }} />
            <text x="8" y="15" fill={textTertiary} fontSize="7" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>{stat.label}</text>
            <text x="8" y="32" fill={stat.color} fontSize="14" fontWeight="900" fontFamily="system-ui">{stat.value}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MONITORING — Professional dashboard, light theme
   ═══════════════════════════════════════════════════════════════ */

export function MonitoringAnimation() {
  const currentPower = useAnimatedValue(3.8, 2000);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => [5, 8, 15, 28, 45, 62, 78, 88, 95, 92, 85, 90, 88, 75, 58, 35, 15, 5], []);

  const chartPath = useMemo(() => {
    return chartData.map((v, i) => {
      const x = 8 + (i / (chartData.length - 1)) * 255;
      const y = 95 - (v / 100) * 75;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    }).join(" ");
  }, [chartData]);

  const areaPath = useMemo(() => {
    let d = "M8,95 ";
    chartData.forEach((v, i) => {
      const x = 8 + (i / (chartData.length - 1)) * 255;
      const y = 95 - (v / 100) * 75;
      d += `L${x},${y} `;
    });
    d += "L263,95 Z";
    return d;
  }, [chartData]);

  return (
    <svg viewBox="0 0 480 360" className="w-full h-full" style={{ background: "#f8f9fb" }}>
      <defs>
        <linearGradient id="m-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B7A2A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3B7A2A" stopOpacity="0.02" />
        </linearGradient>
        <filter id="m-glow"><feGaussianBlur stdDeviation="2.5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* Top bar */}
      <rect x="8" y="8" width="464" height="28" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="22" cy="22" r="5" fill="#3B7A2A" opacity="0.15" />
      <circle cx="22" cy="22" r="3" fill="#3B7A2A">
        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="34" y="26" fill="#1a1a1a" fontSize="11" fontWeight="bold" fontFamily="system-ui">Solaron Dashboard</text>
      <text x="438" y="19" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="system-ui">21 Март 2026</text>
      <g transform="translate(418, 21)">
        <circle cx="0" cy="0" r="3.5" fill="#3B7A2A" opacity="0.7">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="8" y="3" fill="#3B7A2A" fontSize="8" fontWeight="bold" fontFamily="system-ui">LIVE</text>
      </g>

      {/* Chart panel */}
      <g transform="translate(8, 46)">
        <rect x="0" y="0" width="280" height="115" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="12" y="17" fill="#1a1a1a" fontSize="9" fontWeight="bold" fontFamily="system-ui">Производство днес</text>
        {["5 kW", "3.75", "2.5", "1.25", "0"].map((label, i) => (
          <text key={label} x="6" y={28 + i * 18} fill="#94a3b8" fontSize="6" fontFamily="system-ui" textAnchor="start">{label}</text>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="30" y1={26 + i * 17} x2="270" y2={26 + i * 17} stroke="#f1f5f9" strokeWidth="1" />
        ))}
        <g transform="translate(25, -2)">
          <path d={areaPath} fill="url(#m-fill)" />
          <path d={chartPath} fill="none" stroke="#3B7A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#m-glow)">
            <animate attributeName="stroke-dasharray" values="0 2000;2000 0" dur="2.5s" fill="freeze" />
          </path>
          <circle cx={8 + (11 / 17) * 255} cy={95 - (90 / 100) * 75} r="4" fill="#3B7A2A" filter="url(#m-glow)">
            <animate attributeName="r" values="4;5.5;4" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        {["06", "08", "10", "12", "14", "16", "18"].map((h, i) => (
          <text key={h} x={38 + i * 35} y="108" fill="#94a3b8" fontSize="7" fontFamily="system-ui" textAnchor="middle">{h}:00</text>
        ))}
      </g>

      {/* Right stats */}
      <g transform="translate(300, 46)">
        <rect x="0" y="0" width="172" height="52" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="12" y="17" fill="#64748b" fontSize="8" fontFamily="system-ui">Текуща мощност</text>
        <text x="12" y="42" fill="#3B7A2A" fontSize="24" fontWeight="900" fontFamily="system-ui">{currentPower.toFixed(1)} kW</text>
        <rect x="130" y="10" width="30" height="30" rx="6" fill="#f0fdf4" stroke="#d1fae5" strokeWidth="0.8" />
        <text x="145" y="30" textAnchor="middle" fill="#3B7A2A" fontSize="14" fontFamily="system-ui">↑</text>

        <rect x="0" y="60" width="83" height="52" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="8" y="77" fill="#64748b" fontSize="7" fontFamily="system-ui">Днес</text>
        <text x="8" y="100" fill="#1a1a1a" fontSize="18" fontWeight="900" fontFamily="system-ui">24.6</text>
        <text x="58" y="100" fill="#94a3b8" fontSize="8" fontFamily="system-ui">kWh</text>

        <rect x="89" y="60" width="83" height="52" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="97" y="77" fill="#64748b" fontSize="7" fontFamily="system-ui">Спестени</text>
        <text x="97" y="100" fill="#3B7A2A" fontSize="18" fontWeight="900" fontFamily="system-ui">6.15</text>
        <text x="143" y="100" fill="#3B7A2A" fontSize="8" fontFamily="system-ui" opacity="0.6">лв</text>
      </g>

      {/* Panel grid */}
      <g transform="translate(8, 174)">
        <rect x="0" y="0" width="280" height="95" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="12" y="17" fill="#1a1a1a" fontSize="9" fontWeight="bold" fontFamily="system-ui">Панели — Индивидуална ефективност</text>
        {Array.from({ length: 20 }, (_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const perf = 85 + Math.sin(i * 1.7 + tick * 0.05) * 10;
          const color = perf > 90 ? "#3B7A2A" : perf > 80 ? "#b45309" : "#dc2626";
          return (
            <g key={i} transform={`translate(${12 + col * 52}, ${26 + row * 17})`}>
              <rect x="0" y="0" width="48" height="13" rx="3" fill={perf > 90 ? "#f0fdf4" : perf > 80 ? "#fffbeb" : "#fef2f2"} stroke={color} strokeWidth="0.5" opacity="0.7" />
              <rect x="0.5" y="0.5" width={47 * (perf / 100)} height="12" rx="2.5" fill={color} opacity="0.12" />
              <text x="24" y="10" textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="system-ui">{Math.round(perf)}%</text>
            </g>
          );
        })}
      </g>

      {/* System health */}
      <g transform="translate(300, 174)">
        <rect x="0" y="0" width="172" height="95" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="12" y="17" fill="#1a1a1a" fontSize="9" fontWeight="bold" fontFamily="system-ui">Здраве на системата</text>
        <g transform="translate(86, 58)">
          <circle cx="0" cy="0" r="26" fill="none" stroke="#f1f5f9" strokeWidth="5" />
          <circle cx="0" cy="0" r="26" fill="none" stroke="#3B7A2A" strokeWidth="5" strokeDasharray="152 163" strokeLinecap="round" transform="rotate(-90)">
            <animate attributeName="stroke-dasharray" values="0 163;152 163" dur="2s" fill="freeze" />
          </circle>
          <text x="0" y="4" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontWeight="900" fontFamily="system-ui">98%</text>
          <text x="0" y="14" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="system-ui">Score</text>
        </g>
      </g>

      {/* Bottom bar */}
      <g transform="translate(8, 282)">
        <rect x="0" y="0" width="464" height="26" rx="6" fill="#f0fdf4" stroke="#d1fae5" strokeWidth="0.8" />
        <circle cx="16" cy="13" r="3.5" fill="#3B7A2A">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="26" y="17" fill="#3B7A2A" fontSize="9" fontFamily="system-ui">✓ Всички 20 панела оптимални  •  Няма аларми  •  Следващо обслужване: 15 юни 2026</text>
      </g>

      {/* Mobile app badge */}
      <g transform="translate(395, 318)">
        <rect x="0" y="0" width="75" height="28" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="37" y="12" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="system-ui">Mobile App</text>
        <text x="37" y="22" textAnchor="middle" fill="#3B7A2A" fontSize="8" fontWeight="bold" fontFamily="system-ui">Достъпно</text>
      </g>
    </svg>
  );
}
