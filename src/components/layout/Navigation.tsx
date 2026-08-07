"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface NavigationProps {
  items: NavItem[];
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Navigation({
  items,
  className,
  orientation = "horizontal"
}: NavigationProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      className={cn(
        "flex gap-2",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-foreground/10 hover:text-gold transition-colors"
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
