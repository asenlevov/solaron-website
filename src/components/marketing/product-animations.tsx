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
  const watts = useAnimatedValue(487, 2000);
  const efficiency = useAnimatedValue(22.8, 2500);
  const temperature = useAnimatedValue(42, 3000);

  return (
    <svg viewBox="0 0 480 360" className="w-full h-full">
      <defs>
        <linearGradient id="pa-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fafbfd" />
          <stop offset="100%" stopColor="#f1f3f6" />
        </linearGradient>
        <linearGradient id="pa-cell" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#14253d" />
          <stop offset="100%" stopColor="#0c1a2e" />
        </linearGradient>
        <linearGradient id="pa-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4e4e7" />
          <stop offset="100%" stopColor="#c8c8cc" />
        </linearGradient>
        <radialGradient id="pa-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pa-glass" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
        </linearGradient>
        <filter id="pa-glow"><feGaussianBlur stdDeviation="2.5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="pa-sunGlow"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="pa-shadow"><feDropShadow dx="0" dy="1" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.08" /></filter>
        <clipPath id="pa-clip"><polygon points="160,72 400,54 420,185 180,203" /></clipPath>
      </defs>

      <rect width="480" height="360" fill="url(#pa-bg)" />

      {/* Sun */}
      <circle cx="430" cy="38" r="90" fill="url(#pa-sun)" />
      <circle cx="430" cy="38" r="22" fill="#FFD700" opacity="0.07" filter="url(#pa-sunGlow)">
        <animate attributeName="r" values="22;28;22" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="430" cy="38" r="14" fill="#FFD700" opacity="0.9">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
      </circle>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36) * Math.PI / 180;
        return (
          <line key={`r${i}`}
            x1={430 + Math.cos(a) * 18} y1={38 + Math.sin(a) * 18}
            x2={430 + Math.cos(a) * (32 + (i % 2) * 10)} y2={38 + Math.sin(a) * (32 + (i % 2) * 10)}
            stroke="#FFD700" strokeWidth={i % 2 ? "0.6" : "1.2"} strokeLinecap="round" opacity="0.25">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
          </line>
        );
      })}

      {/* Light beams from sun to panel */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`lb${i}`}
          x1={420 - i * 10} y1={52 + i * 5}
          x2={200 + i * 50} y2={90 + i * 25}
          stroke="#FFD700" strokeWidth="0.4" opacity="0.06" strokeDasharray="4 8">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Panel shadow on ground */}
      <polygon points="165,208 425,193 435,200 175,215" fill="#000" opacity="0.03" />

      {/* Aluminum frame */}
      <polygon points="153,68 407,50 432,189 178,207" fill="url(#pa-frame)" stroke="#b4b4b8" strokeWidth="0.8" />

      {/* PV cell surface */}
      <polygon points="160,72 400,54 420,185 180,203" fill="url(#pa-cell)" />

      {/* Cell grid — horizontal */}
      {Array.from({ length: 6 }, (_, i) => {
        const t = (i + 1) / 7;
        return (
          <line key={`gh${i}`}
            x1={160 + (180 - 160) * t} y1={72 + (203 - 72) * t}
            x2={400 + (420 - 400) * t} y2={54 + (185 - 54) * t}
            stroke="#1c3050" strokeWidth="0.3" opacity="0.6" />
        );
      })}

      {/* Cell grid — vertical */}
      {Array.from({ length: 10 }, (_, i) => {
        const t = (i + 1) / 11;
        return (
          <line key={`gv${i}`}
            x1={160 + (400 - 160) * t} y1={72 + (54 - 72) * t}
            x2={180 + (420 - 180) * t} y2={203 + (185 - 203) * t}
            stroke="#1c3050" strokeWidth="0.3" opacity="0.6" />
        );
      })}

      {/* Busbars (silver conductor lines) */}
      {[0.33, 0.66].map((t, i) => (
        <line key={`bus${i}`}
          x1={160 + (400 - 160) * t} y1={72 + (54 - 72) * t}
          x2={180 + (420 - 180) * t} y2={203 + (185 - 203) * t}
          stroke="#b0b8c4" strokeWidth="0.7" opacity="0.25" />
      ))}

      {/* Glass refraction overlay */}
      <polygon points="160,72 400,54 420,185 180,203" fill="url(#pa-glass)" />

      {/* Animated shimmer sweep across panel */}
      <g clipPath="url(#pa-clip)">
        <rect y="30" width="30" height="220" fill="white" opacity="0.07">
          <animate attributeName="x" values="100;470;100" dur="5s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Photon particles — sun to panel (golden) */}
      {Array.from({ length: 10 }, (_, i) => {
        const tx = 200 + (i % 5) * 45;
        const ty = 70 + (i % 4) * 30;
        return (
          <circle key={`ph${i}`} r={1.2 + (i % 3) * 0.4} fill="#FFD700" opacity="0" filter="url(#pa-glow)">
            <animateMotion dur={`${1 + (i % 4) * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.18}s`}
              path={`M${420 - i * 3},${45 + i * 2} L${tx},${ty}`} />
            <animate attributeName="opacity" values="0;0.85;0.85;0" dur={`${1 + (i % 4) * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.18}s`} />
          </circle>
        );
      })}

      {/* Energy particles — panel to output (green) */}
      {Array.from({ length: 8 }, (_, i) => {
        const sx = 220 + (i % 4) * 50;
        return (
          <circle key={`en${i}`} r={1.5 + (i % 2) * 0.8} fill="#3B7A2A" opacity="0" filter="url(#pa-glow)">
            <animateMotion dur={`${1.3 + (i % 3) * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.22}s`}
              path={`M${sx},${195 + (i % 2) * 8} Q${sx - 20},240 ${240},268`} />
            <animate attributeName="opacity" values="0;0.75;0.75;0" dur={`${1.3 + (i % 3) * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.22}s`} />
          </circle>
        );
      })}

      {/* MWT cross-section — exploded layer view */}
      <g transform="translate(12, 58)">
        <text x="0" y="-4" fill="#a1a1aa" fontSize="6.5" fontWeight="700" fontFamily="system-ui" letterSpacing="1.5">MWT ТЕХНОЛОГИЯ</text>

        {[
          { y: 6, h: 16, label: "Закалено стъкло", fill: "#dbeafe", stroke: "#93c5fd", text: "#3b82f6" },
          { y: 28, h: 12, label: "EVA плёнка", fill: "#fef3c7", stroke: "#fbbf24", text: "#b45309" },
          { y: 46, h: 22, label: "Si фотоклетка", fill: "#162844", stroke: "#3b82f6", text: "#93c5fd" },
          { y: 74, h: 14, label: "MWT проводник", fill: "#e5e7eb", stroke: "#9ca3af", text: "#6b7280" },
          { y: 94, h: 12, label: "Backsheet", fill: "#f9fafb", stroke: "#d1d5db", text: "#9ca3af" },
        ].map((l, i) => (
          <g key={`l${i}`} opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin={`${0.4 + i * 0.25}s`} fill="freeze" />
            <rect x="0" y={l.y} width="120" height={l.h} rx="3" fill={l.fill} stroke={l.stroke} strokeWidth="0.7" />
            <text x="60" y={l.y + l.h / 2 + 3} textAnchor="middle" fill={l.text} fontSize="6.5" fontWeight="600" fontFamily="system-ui">{l.label}</text>
            {i === 3 && [0, 1, 2, 3, 4].map((v) => (
              <circle key={`via${v}`} cx={12 + v * 24} cy={l.y + l.h / 2} r="3" fill="#d4d4d8" stroke="#9ca3af" strokeWidth="0.5" />
            ))}
          </g>
        ))}

        {[22, 40, 68, 88].map((y, i) => (
          <line key={`gap${i}`} x1="60" y1={y} x2="60" y2={y + 6} stroke="#d1d5db" strokeWidth="0.4" strokeDasharray="1.5 1.5" opacity="0">
            <animate attributeName="opacity" from="0" to="0.5" dur="0.3s" begin={`${0.65 + i * 0.25}s`} fill="freeze" />
          </line>
        ))}

        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2s" fill="freeze" />
          <text x="60" y="-14" textAnchor="middle" fill="#FFD700" fontSize="7" fontWeight="700" fontFamily="system-ui">hν ↓ фотон</text>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.3s" fill="freeze" />
          <line x1="60" y1="108" x2="60" y2="122" stroke="#3B7A2A" strokeWidth="1.2" strokeDasharray="3 2">
            <animate attributeName="stroke-dashoffset" from="5" to="0" dur="0.5s" repeatCount="indefinite" />
          </line>
          <text x="60" y="132" textAnchor="middle" fill="#3B7A2A" fontSize="7" fontWeight="700" fontFamily="system-ui">e⁻ → ток</text>
        </g>
      </g>

      {/* Dashboard — three stat cards */}
      <g transform="translate(20, 278)">
        <g filter="url(#pa-shadow)">
          <rect x="0" y="0" width="140" height="58" rx="10" fill="white" />
          <circle cx="18" cy="17" r="5.5" fill="#3B7A2A" opacity="0.1" />
          <circle cx="18" cy="17" r="2.5" fill="#3B7A2A">
            <animate attributeName="r" values="2.5;3.5;2.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <text x="30" y="20" fill="#a1a1aa" fontSize="7.5" fontWeight="600" fontFamily="system-ui">Мощност</text>
          <text x="12" y="47" fill="#1a1a1a" fontSize="22" fontWeight="900" fontFamily="system-ui">{Math.round(watts)}</text>
          <text x={Math.round(watts) >= 100 ? 88 : 68} y="47" fill="#a1a1aa" fontSize="11" fontWeight="500" fontFamily="system-ui">W</text>
          <polyline points="104,42 109,34 114,38 119,26 124,30 129,20" fill="none" stroke="#3B7A2A" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g transform="translate(152, 0)" filter="url(#pa-shadow)">
          <rect x="0" y="0" width="140" height="58" rx="10" fill="white" />
          <text x="12" y="18" fill="#a1a1aa" fontSize="7.5" fontWeight="600" fontFamily="system-ui">Ефективност</text>
          <text x="12" y="47" fill="#3B7A2A" fontSize="22" fontWeight="900" fontFamily="system-ui">{efficiency.toFixed(1)}</text>
          <text x="90" y="47" fill="#3B7A2A" fontSize="11" fontWeight="500" fontFamily="system-ui">%</text>
          <g transform="translate(120, 30)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="#f0fdf4" strokeWidth="3" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#3B7A2A" strokeWidth="3" strokeDasharray="80 88" strokeLinecap="round" transform="rotate(-90)" opacity="0.55">
              <animate attributeName="stroke-dasharray" values="0 88;80 88" dur="2s" fill="freeze" />
            </circle>
          </g>
        </g>

        <g transform="translate(304, 0)" filter="url(#pa-shadow)">
          <rect x="0" y="0" width="140" height="58" rx="10" fill="white" />
          <text x="12" y="18" fill="#a1a1aa" fontSize="7.5" fontWeight="600" fontFamily="system-ui">Температура</text>
          <text x="12" y="47" fill="#64748b" fontSize="22" fontWeight="900" fontFamily="system-ui">{Math.round(temperature)}</text>
          <text x="62" y="47" fill="#a1a1aa" fontSize="11" fontWeight="500" fontFamily="system-ui">°C</text>
          {[0, 1, 2, 3, 4, 5].map((b) => (
            <rect key={`t${b}`} x={96 + b * 7} y={44 - b * 5} width="4" height={8 + b * 5} rx="2"
              fill={b < 4 ? "#3B7A2A" : "#f59e0b"} opacity={b < Math.floor(temperature / 10) ? 0.45 : 0.08} />
          ))}
        </g>
      </g>
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
  const soh = useAnimatedValue(98, 2000);

  useEffect(() => {
    const interval = setInterval(() => setIsDay((p) => !p), 5000);
    return () => clearInterval(interval);
  }, []);

  const level = isDay ? 95 : 30;
  const bg = isDay ? "#f0f5ff" : "#080e1a";
  const cardBg = isDay ? "white" : "#111827";
  const cardBorder = isDay ? "#e2e8f0" : "#1e293b";
  const textPrimary = isDay ? "#0f172a" : "#e2e8f0";
  const textSecondary = isDay ? "#64748b" : "#94a3b8";
  const accent = isDay ? "#FFD700" : "#6366f1";
  const cellCount = 8;
  const filledCells = Math.round((level / 100) * cellCount);
  const R = 88;
  const C = 2 * Math.PI * R;
  const arcLen = C * 0.75;
  const filledLen = (level / 100) * arcLen;

  return (
    <svg viewBox="0 0 480 360" className="w-full h-full" style={{ background: bg, transition: "background 1.5s ease" }}>
      <defs>
        <filter id="b-glow"><feGaussianBlur stdDeviation="3.5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="b-softGlow"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="b-cellGlow"><feGaussianBlur stdDeviation="2" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id="b-gaugeGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="65%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#3B7A2A" />
        </linearGradient>
        <linearGradient id="b-cellFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3B7A2A" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>

      {/* Ambient glow — day */}
      <circle cx="240" cy="142" r="130" fill="#FFD700" opacity={isDay ? 0.06 : 0} style={{ transition: "opacity 1.5s" }}>
        <animate attributeName="r" values="120;140;120" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Ambient glow — night */}
      <circle cx="240" cy="142" r="130" fill="#6366f1" opacity={!isDay ? 0.08 : 0} style={{ transition: "opacity 1.5s" }}>
        <animate attributeName="r" values="120;140;120" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Top mode bar */}
      <rect x="0" y="0" width="480" height="3" fill={accent} opacity="0.5" style={{ transition: "fill 1.5s" }} />
      <text x="240" y="20" textAnchor="middle" fill={textSecondary} fontSize="9" fontWeight="bold" fontFamily="system-ui" letterSpacing="3" style={{ transition: "fill 1.5s" }}>
        {isDay ? "☀ ДНЕВЕН РЕЖИМ — ЗАРЕЖДАНЕ" : "☾ НОЩЕН РЕЖИМ — ЗАХРАНВАНЕ"}
      </text>

      {/* ═══ CIRCULAR POWER GAUGE ═══ */}
      <circle cx="240" cy="142" r={R} fill="none"
        stroke={isDay ? "#e2e8f0" : "#1e293b"} strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${arcLen} ${C}`} transform="rotate(135, 240, 142)"
        style={{ transition: "stroke 1.5s" }} />
      {Array.from({ length: 28 }, (_, i) => {
        const angle = (135 + i * (270 / 27)) * Math.PI / 180;
        const r1 = R + 5;
        const r2 = i % 3 === 0 ? R + 11 : R + 8;
        return (
          <line key={`gt${i}`}
            x1={240 + r1 * Math.cos(angle)} y1={142 + r1 * Math.sin(angle)}
            x2={240 + r2 * Math.cos(angle)} y2={142 + r2 * Math.sin(angle)}
            stroke={textSecondary} strokeWidth={i % 3 === 0 ? "1.2" : "0.5"} opacity="0.3"
            style={{ transition: "stroke 1.5s" }} />
        );
      })}
      <circle cx="240" cy="142" r={R} fill="none"
        stroke="url(#b-gaugeGrad)" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${filledLen} ${C}`} transform="rotate(135, 240, 142)"
        filter="url(#b-cellGlow)"
        style={{ transition: "stroke-dasharray 2s ease-in-out" }} />
      <text x="240" y="250" textAnchor="middle" fill={isDay ? "#3B7A2A" : "#4ade80"} fontSize="11" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>
        {isDay ? "+4.5 kW" : "−2.1 kW"}
      </text>
      <text x="240" y="262" textAnchor="middle" fill={textSecondary} fontSize="7" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>
        {isDay ? "Скорост на зареждане" : "Разход на енергия"}
      </text>

      {/* ═══ BATTERY BODY ═══ */}
      <rect x="222" y="54" width="36" height="9" rx="4" fill={isDay ? "#d1fae5" : "#1a3a2a"} stroke="#3B7A2A" strokeWidth="1.2" style={{ transition: "fill 1.5s" }} />
      <rect x="204" y="62" width="72" height="138" rx="10" fill={isDay ? "#f0f4f8" : "#141e30"} stroke="#3B7A2A" strokeWidth="2.5" style={{ transition: "fill 1.5s" }} />
      {[[207, 65], [273, 65], [207, 197], [273, 197]].map(([cx, cy], i) => (
        <circle key={`cn${i}`} cx={cx} cy={cy} r="1.5" fill="#3B7A2A" opacity="0.35" />
      ))}
      <rect x="210" y="68" width="60" height="126" rx="6" fill={isDay ? "#f1f5f9" : "#070d18"} style={{ transition: "fill 1.5s" }} />

      {/* Scan line */}
      <clipPath id="b-cellClip"><rect x="210" y="68" width="60" height="126" rx="6" /></clipPath>
      <rect x="210" y="68" width="60" height="2" fill="#4ade80" opacity="0.1" clipPath="url(#b-cellClip)">
        <animate attributeName="y" values="68;192;68" dur="3s" repeatCount="indefinite" />
      </rect>

      {/* LFP Cells */}
      {Array.from({ length: cellCount }, (_, i) => {
        const cellH = 12;
        const gap = 2.5;
        const cellY = 186 - i * (cellH + gap);
        const filled = i < filledCells;
        return (
          <g key={`cell${i}`}>
            <rect x="214" y={cellY} width="52" height={cellH} rx="3"
              fill={filled ? "url(#b-cellFill)" : (isDay ? "#e2e8f0" : "#151f30")}
              stroke={filled ? "#3B7A2A" : (isDay ? "#cbd5e1" : "#1e293b")}
              strokeWidth="0.7" opacity={filled ? 1 : 0.35}
              style={{ transition: "all 1.8s ease-in-out" }} />
            {filled && (
              <>
                <rect x="216" y={cellY + 2} width="48" height={cellH - 4} rx="2"
                  fill="#4ade80" opacity="0.12" filter="url(#b-cellGlow)">
                  <animate attributeName="opacity" values="0.08;0.22;0.08" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />
                </rect>
                <line x1="232" y1={cellY + 2} x2="232" y2={cellY + cellH - 2} stroke="#3B7A2A" strokeWidth="0.3" opacity="0.2" />
                <line x1="248" y1={cellY + 2} x2="248" y2={cellY + cellH - 2} stroke="#3B7A2A" strokeWidth="0.3" opacity="0.2" />
              </>
            )}
          </g>
        );
      })}

      {/* Battery percentage */}
      <text x="240" y="146" textAnchor="middle" fill={textPrimary} fontSize="26" fontWeight="900" fontFamily="system-ui"
        stroke={isDay ? "#f0f4f8" : "#141e30"} strokeWidth="4" paintOrder="stroke"
        style={{ transition: "fill 1.5s, stroke 1.5s" }}>
        {level}%
      </text>
      <text x="240" y="160" textAnchor="middle" fill="#3B7A2A" fontSize="7.5" fontWeight="bold" fontFamily="system-ui" letterSpacing="0.8"
        stroke={isDay ? "#f0f4f8" : "#141e30"} strokeWidth="3" paintOrder="stroke"
        style={{ transition: "stroke 1.5s" }}>
        LFP 13.5 kWh
      </text>

      {/* ═══ READOUT CARDS ═══ */}
      <g transform="translate(90, 38)">
        <rect x="0" y="0" width="76" height="34" rx="6" fill={cardBg} stroke={cardBorder} strokeWidth="0.8" style={{ transition: "all 1.5s" }} />
        <text x="8" y="13" fill={textSecondary} fontSize="6.5" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>Температура</text>
        <text x="8" y="28" fill={textPrimary} fontSize="13" fontWeight="900" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>
          {isDay ? "28" : "22"}°C
        </text>
        <circle cx="67" cy="17" r="3.5" fill={isDay ? "#fef3c7" : "#1e1b4b"} style={{ transition: "fill 1.5s" }}>
          <animate attributeName="r" values="3;4;3" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="translate(314, 38)">
        <rect x="0" y="0" width="76" height="34" rx="6" fill={cardBg} stroke={cardBorder} strokeWidth="0.8" style={{ transition: "all 1.5s" }} />
        <text x="8" y="13" fill={textSecondary} fontSize="6.5" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>Цикли</text>
        <text x="8" y="28" fill={textPrimary} fontSize="13" fontWeight="900" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>342</text>
      </g>
      <g transform="translate(314, 78)">
        <rect x="0" y="0" width="76" height="34" rx="6" fill={cardBg} stroke={cardBorder} strokeWidth="0.8" style={{ transition: "all 1.5s" }} />
        <text x="8" y="13" fill={textSecondary} fontSize="6.5" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>SOH</text>
        <text x="8" y="28" fill="#3B7A2A" fontSize="13" fontWeight="900" fontFamily="system-ui">{Math.round(soh)}%</text>
        <rect x="56" y="8" width="14" height="18" rx="3" fill={isDay ? "#f0fdf4" : "#0f2a1a"} style={{ transition: "fill 1.5s" }} />
        <rect x="58" y={8 + 18 - Math.round((soh / 100) * 14)} width="10" height={Math.round((soh / 100) * 14)} rx="2" fill="#3B7A2A" opacity="0.5" style={{ transition: "all 2s" }} />
      </g>

      {/* ═══ PANEL ICON (Left) ═══ */}
      <g transform="translate(16, 118)" opacity={isDay ? 1 : 0.2} style={{ transition: "opacity 1.5s" }}>
        <rect x="0" y="0" width="60" height="48" rx="6" fill={cardBg} stroke={isDay ? "#3B7A2A" : cardBorder} strokeWidth="1" style={{ transition: "all 1.5s" }} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={6 + (i % 2) * 25} y={6 + Math.floor(i / 2) * 14} width="21" height="10" rx="1.5"
            fill={isDay ? "#1e3a5f" : "#1a2535"} stroke={isDay ? "#334155" : "#222"} strokeWidth="0.5" style={{ transition: "all 1.5s" }} />
        ))}
        <text x="30" y="44" textAnchor="middle" fill={isDay ? "#3B7A2A" : textSecondary} fontSize="7" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>
          {isDay ? "4.5kW" : "0kW"}
        </text>
      </g>

      {/* ═══ HOUSE ICON (Right) ═══ */}
      <g transform="translate(404, 118)" opacity={!isDay ? 1 : 0.5} style={{ transition: "opacity 1.5s" }}>
        <rect x="0" y="0" width="60" height="48" rx="6" fill={cardBg} stroke={!isDay ? "#3B7A2A" : cardBorder} strokeWidth="1" style={{ transition: "all 1.5s" }} />
        <polygon points="30,6 12,20 48,20" fill={!isDay ? "#4ade80" : "#e2e8f0"} opacity="0.5" style={{ transition: "fill 1.5s" }} />
        <rect x="16" y="20" width="28" height="16" fill={!isDay ? "#1a3a2a" : "#f1f5f9"} style={{ transition: "fill 1.5s" }} />
        <rect x="26" y="22" width="10" height="10" fill={!isDay ? "#ffe0a0" : "#e2e8f0"} opacity={!isDay ? 0.9 : 0.3} style={{ transition: "all 1.5s" }} />
        <text x="30" y="44" textAnchor="middle" fill={textPrimary} fontSize="7" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>2.1kW</text>
      </g>

      {/* ═══ ENERGY FLOW PARTICLES ═══ */}
      {isDay && Array.from({ length: 8 }, (_, i) => (
        <g key={`pb${i}`}>
          <circle r={2.5 + (i % 2)} fill="#FFD700" opacity="0" filter="url(#b-glow)">
            <animateMotion dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12}s`}
              path="M76,142 C115,142 168,132 204,132" />
            <animate attributeName="opacity" values="0;0.85;0.85;0" dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12}s`} />
          </circle>
          <circle r="1.2" fill="#FFD700" opacity="0" filter="url(#b-softGlow)">
            <animateMotion dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12 + 0.06}s`}
              path="M76,142 C115,142 168,132 204,132" />
            <animate attributeName="opacity" values="0;0.35;0.35;0" dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12 + 0.06}s`} />
          </circle>
        </g>
      ))}
      {!isDay && Array.from({ length: 8 }, (_, i) => (
        <g key={`bh${i}`}>
          <circle r={2.5 + (i % 2)} fill="#4ade80" opacity="0" filter="url(#b-glow)">
            <animateMotion dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12}s`}
              path="M276,132 C312,132 368,142 404,142" />
            <animate attributeName="opacity" values="0;0.85;0.85;0" dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12}s`} />
          </circle>
          <circle r="1.2" fill="#6366f1" opacity="0" filter="url(#b-softGlow)">
            <animateMotion dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12 + 0.06}s`}
              path="M276,132 C312,132 368,142 404,142" />
            <animate attributeName="opacity" values="0;0.35;0.35;0" dur={`${1 + (i % 3) * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.12 + 0.06}s`} />
          </circle>
        </g>
      ))}

      {/* Flow connection paths */}
      <path d="M76,142 C115,142 168,132 204,132" fill="none" stroke={isDay ? "#FFD700" : cardBorder} strokeWidth="1" opacity={isDay ? 0.2 : 0.05} strokeDasharray="4 4" style={{ transition: "all 1.5s" }}>
        {isDay && <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.5s" repeatCount="indefinite" />}
      </path>
      <path d="M276,132 C312,132 368,142 404,142" fill="none" stroke={!isDay ? "#4ade80" : cardBorder} strokeWidth="1" opacity={!isDay ? 0.2 : 0.05} strokeDasharray="4 4" style={{ transition: "all 1.5s" }}>
        {!isDay && <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.5s" repeatCount="indefinite" />}
      </path>

      {/* ═══ POWER FLOW DIAGRAM (Bottom) ═══ */}
      <g transform="translate(30, 274)">
        <rect x="0" y="0" width="420" height="76" rx="10" fill={cardBg} stroke={cardBorder} strokeWidth="1" style={{ transition: "all 1.5s" }} />
        <text x="210" y="15" textAnchor="middle" fill={textSecondary} fontSize="7.5" fontWeight="bold" fontFamily="system-ui" letterSpacing="1.5" style={{ transition: "fill 1.5s" }}>
          ПОТОК НА ЕНЕРГИЯТА
        </text>

        {/* Panel node */}
        <circle cx="48" cy="46" r="18" fill={isDay ? "#fffbeb" : "#0f172a"} stroke={isDay ? "#FFD700" : cardBorder} strokeWidth="1.5" style={{ transition: "all 1.5s" }} />
        <text x="48" y="42" textAnchor="middle" fill={isDay ? "#d97706" : textSecondary} fontSize="13" style={{ transition: "fill 1.5s" }}>☀</text>
        <text x="48" y="53" textAnchor="middle" fill={textPrimary} fontSize="6" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>
          {isDay ? "4.5kW" : "0kW"}
        </text>

        {/* Arrow Panel → Battery */}
        <line x1="72" y1="46" x2="148" y2="46" stroke={isDay ? "#FFD700" : cardBorder} strokeWidth="2" strokeDasharray="5 3" opacity={isDay ? 0.6 : 0.12} style={{ transition: "all 1.5s" }}>
          {isDay && <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.4s" repeatCount="indefinite" />}
        </line>
        <polygon points="150,42 158,46 150,50" fill={isDay ? "#FFD700" : cardBorder} opacity={isDay ? 0.6 : 0.12} style={{ transition: "all 1.5s" }} />

        {/* Battery node */}
        <rect x="168" y="28" width="32" height="36" rx="5" fill={isDay ? "#f0fdf4" : "#0f2a1a"} stroke="#3B7A2A" strokeWidth="1.5" style={{ transition: "fill 1.5s" }} />
        <rect x="178" y="25" width="12" height="5" rx="2" fill="#3B7A2A" />
        <rect x="172" y="38" width="24" height="20" rx="2" fill="#3B7A2A" opacity="0.15" />
        <rect x="172" y={38 + 20 - (level / 100) * 20} width="24" height={(level / 100) * 20} rx="2" fill="#3B7A2A" opacity="0.5" style={{ transition: "all 2s" }}>
          <animate attributeName="opacity" values="0.4;0.65;0.4" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x="184" y="52" textAnchor="middle" fill={textPrimary} fontSize="7" fontWeight="900" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>{level}%</text>

        {/* Arrow Battery → Home */}
        <line x1="208" y1="46" x2="284" y2="46" stroke={!isDay ? "#4ade80" : cardBorder} strokeWidth="2" strokeDasharray="5 3" opacity={!isDay ? 0.6 : 0.12} style={{ transition: "all 1.5s" }}>
          {!isDay && <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.4s" repeatCount="indefinite" />}
        </line>
        <polygon points="286,42 294,46 286,50" fill={!isDay ? "#4ade80" : cardBorder} opacity={!isDay ? 0.6 : 0.12} style={{ transition: "all 1.5s" }} />

        {/* Home node */}
        <circle cx="316" cy="46" r="18" fill={!isDay ? "#111827" : "#f8fafc"} stroke={!isDay ? "#4ade80" : cardBorder} strokeWidth="1.5" style={{ transition: "all 1.5s" }} />
        <text x="316" y="42" textAnchor="middle" fill={!isDay ? "#ffe0a0" : textSecondary} fontSize="13" style={{ transition: "fill 1.5s" }}>⌂</text>
        <text x="316" y="53" textAnchor="middle" fill={textPrimary} fontSize="6" fontWeight="bold" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>2.1kW</text>

        {/* Grid badge */}
        <rect x="358" y="32" width="50" height="28" rx="6" fill={isDay ? "#f0fdf4" : "#0f172a"} stroke={cardBorder} strokeWidth="0.8" style={{ transition: "all 1.5s" }} />
        <text x="383" y="44" textAnchor="middle" fill={textSecondary} fontSize="6" fontFamily="system-ui" style={{ transition: "fill 1.5s" }}>МРЕЖА</text>
        <text x="383" y="55" textAnchor="middle" fill="#3B7A2A" fontSize="7" fontWeight="bold" fontFamily="system-ui">
          {isDay ? "Продава" : "Standby"}
        </text>
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
