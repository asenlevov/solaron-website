import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group overflow-hidden rounded-xl border shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background-card hover:shadow-[0_4px_24px_rgba(59,122,42,0.10),0_1.5px_6px_rgba(0,0,0,0.04)]",
        glass:
          "border-white/30 bg-white/70 backdrop-blur-xl hover:shadow-card-hover",
        dark:
          "border-white/10 bg-[#0a0f0a] text-white hover:shadow-card-hover",
        image:
          "relative border-border bg-background-card hover:shadow-card-hover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  imageSrc?: string;
  imageAlt?: string;
  imagePriority?: boolean;
}

function isExternalImageSrc(src: string): boolean {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("//")
  );
}

export function Card({
  className,
  children,
  variant,
  imageSrc,
  imageAlt = "",
  imagePriority = false,
  ...props
}: CardProps) {
  const showImage = Boolean(imageSrc && imageSrc.length > 0);
  const external = showImage && isExternalImageSrc(imageSrc!);

  return (
    <div
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {showImage ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-secondary">
          {external ? (
            // eslint-disable-next-line @next/next/no-img-element -- external URLs may not be configured in next.config
            <img
              src={imageSrc}
              alt={imageAlt || " "}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              loading={imagePriority ? "eager" : "lazy"}
              decoding="async"
            />
          ) : (
            <Image
              src={imageSrc!}
              alt={imageAlt || " "}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              priority={imagePriority}
            />
          )}
        </div>
      ) : null}
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
