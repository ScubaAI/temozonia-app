"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";
import { SITE } from "@/lib/constants";

export function CartDrawer({ locale, isOpen, onClose }: { locale: string; isOpen: boolean; onClose: () => void }) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

  const total = getTotal();
  const isFreeShipping = total >= SITE.freeShippingThreshold;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60] bg-dark-wood/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold/30 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-dark-wood">{t("title")} ({getItemCount()})</h2>
          <button onClick={onClose} className="glass-btn p-2" aria-label="Cerrar carrito">
            <X size={20} className="text-dark-wood" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <p className="font-body text-warm-brown">{t("empty")}</p>
              <Link href={`/${locale}/menu`} onClick={onClose} className="btn-heritage">
                {t("emptyCta")}
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-lg border border-gold/20 bg-parchment p-3">
                <div className="h-20 w-20 flex-shrink-0 rounded-md bg-warm-brown/10" /> {/* Placeholder img */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-dark-wood">{item.name}</h3>
                    <p className="font-body text-xs text-warm-brown">{formatCurrency(item.price, item.currency, locale)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="glass-btn p-1.5">
                        <Minus size={14} />
                      </button>
                      <span className="font-mono text-sm font-bold text-dark-wood w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="glass-btn p-1.5">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-deep-red hover:text-brand-600 transition-colors" aria-label="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Total */}
        {items.length > 0 && (
          <div className="border-t border-gold/30 bg-cream p-6 space-y-4">
            {!isFreeShipping && (
              <p className="font-body text-xs text-center text-warm-brown">
                ¡Te faltan {formatCurrency(SITE.freeShippingThreshold - total)} para envío gratis!
              </p>
            )}
            <div className="payment-total-glass">
              <span className="font-display text-xs uppercase tracking-widest text-warm-brown block mb-1">{tCommon("total")}</span>
              <span className="total-amount">{formatCurrency(total, "MXN", locale)}</span>
            </div>
            <Link href={`/${locale}/checkout`} onClick={onClose} className="btn-heritage w-full justify-center">
              {t("checkout")}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}