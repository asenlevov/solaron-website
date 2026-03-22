"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  TrendingDown,
  Monitor,
  Battery,
  ArrowLeftRight,
  CreditCard,
  Shield,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoItem {
  title: string;
  description: string;
  icon: typeof TrendingDown;
  span?: 1 | 2;
  color: string;
  visual: string;
}

const ITEMS: BentoItem[] = [
  {
    title: "Спестявания до 80%",
    description: "Намалете сметката за ток драстично с фотоволтаична система.",
    icon: TrendingDown,
    span: 2,
    color: "#3B7A2A",
    visual: "savings",
  },
  {
    title: "Мониторинг 24/7",
    description: "Следете производителността в реално време, панел по панел.",
    icon: Monitor,
    color: "#0ea5e9",
    visual: "monitoring",
  },
  {
    title: "Батерийно Съхранение",
    description: "Съхранявайте излишната енергия за нощта.",
    icon: Battery,
    color: "#8B5CF6",
    visual: "battery",
  },
  {
    title: "Нетно Отчитане",
    description: "Продавайте излишната енергия обратно на мрежата.",
    icon: ArrowLeftRight,
    color: "#f59e0b",
    visual: "net-metering",
  },
  {
    title: "Гъвкаво Финансиране",
    description: "Кредит, лизинг или собствени средства.",
    icon: CreditCard,
    color: "#059669",
    visual: "financing",
  },
  {
    title: "30-Годишна Гаранция",
    description: "Пълно покритие и сервиз за целия живот на системата.",
    icon: Shield,
    span: 2,
    color: "#14b8a6",
    visual: "warranty",
  },
  {
    title: "Международни Сертификати",
    description: "EUPD 2024, SolarEdge Certified, TUV Rheinland.",
    icon: Award,
    color: "#d97706",
    visual: "certificates",
  },
];

function MiniBarChart({ inView }: { inView: boolean }) {
  const bars = [280, 240, 200, 160, 80, 56];
  const labels = ["Яну", "Фев", "Мар", "Апр", "Май", "Юни"];
  const max = 300;
  const barH = 96;
  return (
    <svg viewBox={`0 0 ${bars.length * 36} ${barH + 16}`} className="w-full h-28 mt-2" fill="none">
      {bars.map((val, i) => {
        const h = (val / max) * barH;
        const x = i * 36 + 6;
        return (
          <g key={labels[i]}>
            <motion.rect
              x={x}
              y={barH - h}
              width={24}
              rx={3}
              fill={i < 3 ? "#ef4444" : "#3B7A2A"}
              initial={{ height: 0, y: barH }}
              animate={inView ? { height: h, y: barH - h } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
            <text
              x={x + 12}
              y={barH + 12}
              textAnchor="middle"
              className="fill-foreground-tertiary"
              fontSize={9}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniLineChart({ inView }: { inView: boolean }) {
  const points = [20, 35, 28, 45, 52, 48, 60, 55, 65, 70];
  const w = 200;
  const h = 60;
  const path = points
    .map((p, i) => {
      const cmd = i === 0 ? "M" : "L";
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / 80) * h;
      return `${cmd} ${x} ${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16 mt-2" fill="none">
      <motion.path
        d={path}
        stroke="#0ea5e9"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

function MiniBatteryVisual({ inView }: { inView: boolean }) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <div className="relative w-16 h-8 rounded-md border-2 border-[#8B5CF6]/40 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8B5CF6] to-[#a78bfa]"
          initial={{ width: 0 }}
          animate={inView ? { width: "80%" } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-foreground-secondary">
        <span className="font-semibold text-[#8B5CF6]">80%</span> заредена
      </div>
    </div>
  );
}

function MiniNetMeteringVisual() {
  return (
    <div className="flex items-center justify-center gap-4 mt-3">
      <div className="text-center">
        <div className="text-xs font-semibold text-accent">Произведена</div>
        <div className="text-sm font-bold text-foreground">42 kWh</div>
      </div>
      <ArrowLeftRight className="size-4 text-foreground-tertiary" />
      <div className="text-center">
        <div className="text-xs font-semibold text-[#f59e0b]">Продадена</div>
        <div className="text-sm font-bold text-foreground">18 kWh</div>
      </div>
    </div>
  );
}

function MiniFinancingVisual() {
  return (
    <div className="mt-3 space-y-1.5">
      {[
        { label: "0% разсрочка", value: "24 мес." },
        { label: "Банков кредит", value: "от 3.9%" },
        { label: "Лизинг", value: "от 89 лв./мес." },
      ].map((item) => (
        <div key={item.label} className="flex justify-between text-xs">
          <span className="text-foreground-secondary">{item.label}</span>
          <span className="font-medium text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function MiniWarrantyVisual({ inView }: { inView: boolean }) {
  const milestones = [
    { year: "0", label: "Инсталация" },
    { year: "10", label: "Инвертор" },
    { year: "25", label: "Производство" },
    { year: "30", label: "Панели" },
  ];
  return (
    <div className="flex items-center gap-1 mt-3">
      {milestones.map((m, i) => (
        <motion.div
          key={m.year}
          className="flex flex-col items-center flex-1"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.15, duration: 0.4 }}
        >
          <div className="size-5 rounded-full bg-accent/20 flex items-center justify-center">
            <div className="size-2 rounded-full bg-accent" />
          </div>
          <div className="text-[9px] font-semibold text-accent mt-1">{m.year} год.</div>
          <div className="text-[8px] text-foreground-tertiary">{m.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function MiniCertificatesVisual({ inView }: { inView: boolean }) {
  const certs = ["EUPD 2024", "SolarEdge", "TUV"];
  return (
    <div className="flex gap-2 mt-3">
      {certs.map((cert, i) => (
        <motion.div
          key={cert}
          className="flex-1 rounded-lg border border-[#d97706]/20 bg-[#d97706]/5 p-2 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <Award className="size-4 text-[#d97706] mx-auto" />
          <div className="text-[9px] font-medium text-foreground-secondary mt-1">{cert}</div>
        </motion.div>
      ))}
    </div>
  );
}

function renderVisual(visual: string, inView: boolean) {
  switch (visual) {
    case "savings": return <MiniBarChart inView={inView} />;
    case "monitoring": return <MiniLineChart inView={inView} />;
    case "battery": return <MiniBatteryVisual inView={inView} />;
    case "net-metering": return <MiniNetMeteringVisual />;
    case "financing": return <MiniFinancingVisual />;
    case "warranty": return <MiniWarrantyVisual inView={inView} />;
    case "certificates": return <MiniCertificatesVisual inView={inView} />;
    default: return null;
  }
}

export function BentoGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {ITEMS.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={cn(
              "group rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-card hover:border-border-medium",
              item.span === 2 && "sm:col-span-2",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${item.color}15`, color: item.color }}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
            {renderVisual(item.visual, inView)}
          </motion.div>
        );
      })}
    </div>
  );
}
