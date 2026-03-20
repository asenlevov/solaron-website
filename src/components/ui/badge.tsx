import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex max-w-full items-center rounded-full border px-2.5 py-0.5 font-body text-xs font-medium leading-none tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background-secondary text-foreground-secondary",
        accent: "border-accent/30 bg-accent-light text-accent",
        success: "border-success/25 bg-success-light text-success",
        blue: "border-secondary/25 bg-secondary/10 text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
