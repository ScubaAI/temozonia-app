"use client";

import { useTranslations } from "next-intl";
import type { OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md" | "lg";
}

/**
 * Mapeo de colores semánticos por estado de orden.
 * Sigue las reglas del design system (no usar hexadecimales directos).
 */
const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-gold-500/20 text-gold-500 border-gold-500/40",
  paid: "bg-green-500/20 text-green-600 border-green-500/40",
  confirmed: "bg-blue-500/20 text-blue-600 border-blue-500/40",
  processing: "bg-brand-500/20 text-brand-500 border-brand-500/40",
  shipped: "bg-purple-500/20 text-purple-600 border-purple-500/40",
  delivered: "bg-green-600/20 text-green-700 border-green-600/40",
  failed: "bg-red-500/20 text-red-600 border-red-500/40",
  refunded: "bg-gray-500/20 text-gray-600 border-gray-500/40",
};

const SIZE_STYLES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function OrderStatusBadge({ status, size = "md" }: OrderStatusBadgeProps) {
  const t = useTranslations("order.status");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-display font-semibold uppercase tracking-wide",
        STATUS_STYLES[status],
        SIZE_STYLES[size]
      )}
      role="status"
      aria-live="polite"
    >
      {/* Punto indicador animado para estados activos */}
      {(status === "processing" || status === "shipped") && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {t(status)}
    </span>
  );
}
