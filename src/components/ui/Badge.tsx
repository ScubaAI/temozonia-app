"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "gold" | "brand" | "outline";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-foreground/20 text-foreground",
  gold: "bg-gold-DEFAULT text-brand-900",
  brand: "bg-brand-500 text-white",
  outline: "border border-gold-500 text-gold-300"
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          badgeVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
