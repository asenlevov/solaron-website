import { cn } from "@/lib/utils";

interface SectionDividerProps {
  type?: "diagonal" | "wave" | "gradient";
  from?: string;
  to?: string;
  className?: string;
  flip?: boolean;
}

export function SectionDivider({
  type = "diagonal",
  from = "#ffffff",
  to = "#0a0f0a",
  className,
  flip = false,
}: SectionDividerProps) {
  if (type === "gradient") {
    return (
      <div
        className={cn("h-24 md:h-32", className)}
        style={{
          background: `linear-gradient(to bottom, ${from}, ${to})`,
        }}
      />
    );
  }

  if (type === "wave") {
    return (
      <div className={cn("relative -mt-1", flip && "rotate-180", className)}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill={to} />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("relative -mt-1", className)}>
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none">
        <polygon points={flip ? "0,0 1440,80 1440,0" : "0,80 1440,0 1440,80"} fill={to} />
      </svg>
    </div>
  );
}
