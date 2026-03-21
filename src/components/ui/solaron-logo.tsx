import { cn } from "@/lib/utils";

interface SolaronLogoProps {
  variant?: "dark" | "white";
  className?: string;
}

export function SolaronLogo({ variant = "dark", className }: SolaronLogoProps) {
  const textColor = variant === "white" ? "#ffffff" : "#1a1a1a";
  const accentColor = "#3B7A2A";

  return (
    <svg
      viewBox="0 0 170 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-7 w-auto sm:h-8", className)}
      aria-label="Solaron"
    >
      {/* Sun icon on the left */}
      <g transform="translate(12, 17)">
        <circle cx="0" cy="0" r="5.5" fill={accentColor} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={Math.cos(rad) * 8}
              y1={Math.sin(rad) * 8}
              x2={Math.cos(rad) * 11}
              y2={Math.sin(rad) * 11}
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* "Solar" in text color, "on" in accent — one continuous word */}
      <text
        x="28"
        y="25"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        <tspan fill={textColor}>Solar</tspan>
        <tspan fill={accentColor}>on</tspan>
      </text>
    </svg>
  );
}
