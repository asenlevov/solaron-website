"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function useAnimatedCounter(target: number, duration = 2000, delay = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      let raf: number;
      const animate = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(target * eased);
        if (t < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

const markerVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 1.8 + i * 0.35,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const flowVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 2.5 + i * 0.2, duration: 1.0 },
  }),
};

interface MarkerCardProps {
  x: number;
  y: number;
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  anchor?: "left" | "right" | "center";
  leaderDx?: number;
  leaderDy?: number;
}

function MarkerCard({
  x,
  y,
  title,
  value,
  color,
  icon,
  anchor = "center",
  leaderDx = 0,
  leaderDy = -50,
}: MarkerCardProps) {
  const cardW = 170;
  const cardH = 52;
  const cardX =
    anchor === "left"
      ? leaderDx - cardW - 8
      : anchor === "right"
        ? leaderDx + 8
        : leaderDx - cardW / 2;
  const cardY = leaderDy - cardH - 4;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Leader line */}
      <line
        x1="0"
        y1="0"
        x2={leaderDx}
        y2={leaderDy}
        stroke={color}
        strokeWidth="1.5"
        opacity="0.35"
        strokeDasharray="4 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="7"
          to="0"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </line>

      {/* Card background — frosted glass */}
      <rect
        x={cardX}
        y={cardY}
        width={cardW}
        height={cardH}
        rx="10"
        fill="rgba(0,0,0,0.5)"
        stroke={color}
        strokeWidth="0.6"
        strokeOpacity="0.35"
      />
      <rect
        x={cardX}
        y={cardY}
        width={cardW}
        height={cardH}
        rx="10"
        fill="rgba(255,255,255,0.04)"
      />

      {/* Accent bar on left edge */}
      <rect
        x={cardX}
        y={cardY + 8}
        width="3"
        height={cardH - 16}
        rx="1.5"
        fill={color}
        opacity="0.7"
      />

      {/* Icon */}
      <g transform={`translate(${cardX + 18}, ${cardY + cardH / 2})`}>
        {icon}
      </g>

      {/* Title */}
      <text
        x={cardX + 36}
        y={cardY + 20}
        fill="rgba(255,255,255,0.7)"
        fontSize="11"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.3"
      >
        {title}
      </text>

      {/* Value */}
      <text
        x={cardX + 36}
        y={cardY + 40}
        fill={color}
        fontSize="17"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        {value}
      </text>
    </g>
  );
}

function PulsingDot({
  cx,
  cy,
  color,
  size = 7,
}: {
  cx: number;
  cy: number;
  color: string;
  size?: number;
}) {
  return (
    <g>
      {/* Outer pulse ring */}
      <circle cx={cx} cy={cy} r={size} fill="none" stroke={color} strokeWidth="1.5" opacity="0">
        <animate attributeName="r" values={`${size};${size * 3};${size * 3.5}`} dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.15;0" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Second ring offset */}
      <circle cx={cx} cy={cy} r={size} fill="none" stroke={color} strokeWidth="1" opacity="0">
        <animate attributeName="r" values={`${size};${size * 2}`} dur="2s" repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </circle>
      {/* Glow */}
      <circle cx={cx} cy={cy} r={size * 1.6} fill={color} opacity="0.12">
        <animate attributeName="r" values={`${size * 1.4};${size * 2};${size * 1.4}`} dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.18;0.08" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Core dot */}
      <circle cx={cx} cy={cy} r={size * 0.65} fill={color} opacity="0.95">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function SunSvgIcon() {
  return (
    <g>
      <circle r="4" fill="#FFD700" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={Math.cos(r) * 5.5}
            y1={Math.sin(r) * 5.5}
            x2={Math.cos(r) * 7.5}
            y2={Math.sin(r) * 7.5}
            stroke="#FFD700"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function BatterySvgIcon() {
  return (
    <g>
      <rect x="-6" y="-4.5" width="12" height="9" rx="1.5" fill="none" stroke="#4ade80" strokeWidth="1.4" />
      <rect x="6" y="-2" width="2" height="4" rx="0.8" fill="#4ade80" />
      <rect x="-3.5" y="-2.5" width="3.5" height="5" rx="0.5" fill="#4ade80" opacity="0.6" />
    </g>
  );
}

function HomeSvgIcon() {
  return (
    <g>
      <path
        d="M0,-7 L-8,1 L-5.5,1 L-5.5,7 L5.5,7 L5.5,1 L8,1 Z"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <rect x="-1.5" y="2" width="3" height="5" rx="0.5" fill="#38bdf8" opacity="0.5" />
    </g>
  );
}

export function HeroEnergyOverlay() {
  const panelOutput = useAnimatedCounter(4.5, 2200, 2500);
  const batteryCharge = useAnimatedCounter(87, 2200, 2800);
  const homeConsumption = useAnimatedCounter(2.1, 2200, 3100);

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {/* ── Energy flow particles (visible on all screens) ── */}
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="hf-glow-y" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hf-glow-g" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hf-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>

          {/* Flow paths */}
          <path
            id="fp-panels-to-battery"
            d="M1080,260 C1090,340 1140,430 1170,520"
            fill="none"
          />
          <path
            id="fp-battery-to-house"
            d="M1120,650 C960,690 700,710 480,710 C380,705 320,680 280,640"
            fill="none"
          />
        </defs>

        {/* Dashed flow path traces */}
        <motion.g custom={0} variants={flowVariants} initial="hidden" animate="visible">
          <path
            d="M1080,260 C1090,340 1140,430 1170,520"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.08"
            strokeDasharray="8 12"
          >
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.5s" repeatCount="indefinite" />
          </path>
        </motion.g>

        <motion.g custom={1} variants={flowVariants} initial="hidden" animate="visible">
          <path
            d="M1120,650 C960,690 700,710 480,710 C380,705 320,680 280,640"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2"
            opacity="0.06"
            strokeDasharray="8 12"
          >
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.5s" repeatCount="indefinite" />
          </path>
        </motion.g>

        {/* Panels → Battery particles (golden) */}
        <motion.g custom={0} variants={flowVariants} initial="hidden" animate="visible">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={`pb-${i}`}
              r={3.5 - (i % 2) * 0.8}
              fill="#FFD700"
              filter="url(#hf-glow-y)"
              opacity="0"
            >
              <animateMotion
                dur={`${2.0 + i * 0.15}s`}
                repeatCount="indefinite"
                begin={`${i * 0.28}s`}
              >
                <mpath href="#fp-panels-to-battery" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                dur={`${2.0 + i * 0.15}s`}
                repeatCount="indefinite"
                begin={`${i * 0.28}s`}
              />
            </circle>
          ))}
        </motion.g>

        {/* Battery → House particles (green) */}
        <motion.g custom={1} variants={flowVariants} initial="hidden" animate="visible">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <circle
              key={`bh-${i}`}
              r={4 - (i % 3) * 0.6}
              fill="#4ade80"
              filter="url(#hf-glow-g)"
              opacity="0"
            >
              <animateMotion
                dur={`${3.0 + i * 0.15}s`}
                repeatCount="indefinite"
                begin={`${i * 0.33}s`}
              >
                <mpath href="#fp-battery-to-house" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.85;0.85;0"
                dur={`${3.0 + i * 0.15}s`}
                repeatCount="indefinite"
                begin={`${i * 0.33}s`}
              />
            </circle>
          ))}
        </motion.g>

        {/* Ambient ground glow (matching the green glow in the image) */}
        <motion.g custom={2} variants={flowVariants} initial="hidden" animate="visible">
          <ellipse cx="700" cy="710" rx="380" ry="18" fill="#4ade80" opacity="0.04" filter="url(#hf-soft)" />
        </motion.g>
      </svg>

      {/* ── Marker labels layer (hidden on mobile) ── */}
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 w-full h-full hidden md:block"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── Solar Panels ── */}
        <motion.g custom={0} variants={markerVariants} initial="hidden" animate="visible">
          <PulsingDot cx={1080} cy={200} color="#FFD700" size={8} />
          <MarkerCard
            x={1080}
            y={200}
            title="Соларни Панели"
            value={`${panelOutput.toFixed(1)} kW`}
            color="#FFD700"
            icon={<SunSvgIcon />}
            anchor="left"
            leaderDx={-10}
            leaderDy={-46}
          />
        </motion.g>

        {/* ── Battery / Inverter ── */}
        <motion.g custom={1} variants={markerVariants} initial="hidden" animate="visible">
          <PulsingDot cx={1200} cy={540} color="#4ade80" size={8} />
          <MarkerCard
            x={1200}
            y={540}
            title="Батерия"
            value={`${Math.round(batteryCharge)}% · 13.5 kWh`}
            color="#4ade80"
            icon={<BatterySvgIcon />}
            anchor="right"
            leaderDx={30}
            leaderDy={-50}
          />
        </motion.g>

        {/* ── Smart Home ── */}
        <motion.g custom={2} variants={markerVariants} initial="hidden" animate="visible">
          <PulsingDot cx={350} cy={330} color="#38bdf8" size={8} />
          <MarkerCard
            x={350}
            y={330}
            title="Умен Дом"
            value={`${homeConsumption.toFixed(1)} kW`}
            color="#38bdf8"
            icon={<HomeSvgIcon />}
            anchor="left"
            leaderDx={-15}
            leaderDy={-50}
          />
        </motion.g>
      </svg>

      {/* ── Status badge (bottom-right, desktop only) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="absolute bottom-28 right-6 hidden lg:flex items-center gap-2.5 rounded-full bg-black/35 backdrop-blur-lg border border-white/10 px-4 py-2.5 shadow-lg"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-white/70 tracking-wide">
          Система активна
        </span>
      </motion.div>
    </div>
  );
}
