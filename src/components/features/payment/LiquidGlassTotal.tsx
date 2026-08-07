"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";

export function LiquidGlassTotal() {
  const { items } = useCartStore((state) => ({ items: state.items }));

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 49;
  const tax = subtotal * 0.16;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl text-gold">Resumen del Pedido</h3>

      <div className="liquid-glass p-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <ShoppingCart size={16} />
            Subtotal ({items.length} artículos)
          </span>
          <span>{formatCurrency(subtotal, "MXN", "es")}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span>{formatCurrency(deliveryFee, "MXN", "es")}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">IVA (16%)</span>
          <span>{formatCurrency(tax, "MXN", "es")}</span>
        </div>

        <div className="border-t border-gold-500/30 pt-3 flex justify-between text-2xl font-bold">
          <span className="font-script text-gold">Total</span>
          <span className="gold-accent text-3xl">
            {formatCurrency(total, "MXN", "es")}
          </span>
        </div>
      </div>
    </div>
  );
}
