"use client";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "gold" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-white shadow-lg hover:shadow-gold focus:ring-brand-500",
  secondary:
    "border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 focus:ring-gold-500",
  gold:
    "bg-gold text-brand-900 shadow-md hover:bg-gold-400 hover:shadow-gold focus:ring-gold-500",
  ghost:
    "hover:bg-foreground/10 text-foreground focus:ring-foreground"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg font-script"
};

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};
Button.displayName = "Button";
