import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium font-body transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#3B7A2A] text-white shadow-soft hover:bg-[#326923] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        premium:
          "relative bg-gradient-to-r from-[#3B7A2A] to-[#2ecc71] text-white shadow-soft hover:shadow-[0_0_20px_rgba(59,122,42,0.3)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        secondary:
          "bg-secondary text-white shadow-soft hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        outline:
          "border border-border-medium bg-transparent text-foreground hover:bg-background-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ghost:
          "bg-transparent text-foreground hover:bg-background-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      },
      size: {
        sm: "h-8 px-3 text-sm gap-1.5 [&_svg]:size-3.5",
        md: "h-10 px-4 text-sm gap-2 [&_svg]:size-4",
        lg: "h-12 px-6 text-base gap-2 [&_svg]:size-5",
        xl: "h-14 px-8 text-lg gap-2.5 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      icon,
      iconPosition = "left",
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading);

    const spinner = (
      <Loader2
        className={cn(
          "animate-spin",
          size === "sm" && "size-3.5",
          size === "md" && "size-4",
          (size === "lg" || size === "xl" || !size) && "size-5",
        )}
        aria-hidden
      />
    );

    const showIconLeft = Boolean(icon && iconPosition === "left" && !loading);
    const showIconRight = Boolean(icon && iconPosition === "right" && !loading);

    if (asChild) {
      return (
        <Slot
          className={cn(
            buttonVariants({ variant, size, className }),
            loading && "pointer-events-none opacity-70",
          )}
          ref={ref}
          aria-busy={loading || undefined}
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? spinner : showIconLeft ? icon : null}
        {children}
        {showIconRight ? icon : null}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
