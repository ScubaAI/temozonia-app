"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";
import { CartItemRow } from "./CartItem";

interface CartViewProps {
  locale: string;
}

export function CartView({ locale }: CartViewProps) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

  const total = getTotal();
  const itemCount = getItemCount();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/5">
          <ShoppingBag size={32} className="text-gold" />
        </div>
        <h3 className="font-display text-2xl font-bold text-dark-wood">
          {t("empty")}
        </h3>
        <p className="font-body text-warm-brown max-w-md">
          {t("emptyDesc")}
        </p>
        <Link href={`/${locale}/menu`} className="btn-heritage">
          {t("emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-xl border border-gold/20 bg-parchment p-4 transition-colors hover:border-gold/40"
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-warm-brown/10">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-dark-wood">
                  {item.name}
                </h3>
                <p className="font-body text-sm text-warm-brown">
                  {formatCurrency(item.price, item.currency, locale)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="font-mono text-sm font-bold text-dark-wood w-6 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} />
                  </Button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-deep-red hover:text-red-300 transition-colors"
                  aria-label={`${tCommon("remove") || "Remove"} ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-6 rounded-xl border border-gold/20 bg-cream p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-dark-wood">
            {tCommon("summary") || "Order Summary"}
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-warm-brown">
              <span>{tCommon("items") || "Items"} ({itemCount})</span>
              <span>{formatCurrency(total, "MXN", locale)}</span>
            </div>
          </div>

          <div className="border-t border-gold/20 pt-4">
            <div className="flex justify-between items-baseline">
              <span className="font-display text-sm uppercase tracking-widest text-warm-brown">
                {tCommon("total")}
              </span>
              <span className="font-mono text-xl font-bold text-dark-wood">
                {formatCurrency(total, "MXN", locale)}
              </span>
            </div>
          </div>

          <Link href={`/${locale}/checkout`} className="btn-heritage w-full justify-center">
            {t("checkout")}
          </Link>
        </div>
      </div>
    </div>
  );
}
