"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm text-gold-300">{label}</label>
        )}
        <input
          type={type}
          className={cn(
            "w-full rounded-lg border border-gold-500/30 bg-liquid-accent/50 px-4 py-2 text-foreground placeholder-muted-foreground/50 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
