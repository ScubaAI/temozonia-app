"use client";

import { useCartStore } from "@/store/cartStore";
import { PRODUCTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";

export function CartTester() {
  const { _items, addItem, getTotal, getItemCount } = useCartStore();
  const sample = PRODUCTS[0];

  return (
    <div className="space-y-3 rounded-lg border border-dashed border-warm-brown/40 p-4">
      <button className="glass-btn" onClick={() => addItem(sample)}>
        QA: agregar “{sample.name}”
      </button>
      <p className="font-body text-sm text-warm-brown">
        Items: {getItemCount()} · Total: {formatCurrency(getTotal())}
      </p>
      <p className="font-body text-xs text-warm-brown">
        Recarga la página → el carrito debe persistir (localStorage: “temozonia-cart”).
      </p>
    </div>
  );
}
