"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";

export function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const t = useTranslations("common");
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    addItem(product);
    openCart();
  };

  return (
    <article className="product-card-heritage group flex flex-col overflow-hidden">
      {Boolean(product.metadata?.bestSeller) && (
        <span className="badge-ribbon">{t("bestSeller")}</span>
      )}
      
      {/* Imagen con placeholder blur */}
      <div className="relative aspect-square w-full bg-parchment">
        <Image
          src={product.images[0] || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+KQ=="
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-display text-[10px] uppercase tracking-widest text-warm-brown">
            {product.category}
          </span>
          {product.seasonal && (
            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase text-deep-red">
              Temp.
            </span>
          )}
        </div>

        <h3 className="font-display text-xl font-bold text-dark-wood leading-tight">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-warm-brown">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gold/20 pt-4">
          <span className="font-display text-2xl font-bold text-deep-red">
            {formatCurrency(product.price, product.currency, locale)}
          </span>
          <button
            onClick={handleAdd}
            className="glass-btn-dark flex items-center gap-2 px-4 py-2 text-xs"
            aria-label={t("addToCart")}
          >
            <ShoppingCart size={16} className="text-gold" />
            {t("addToCart")}
          </button>
        </div>
      </div>
    </article>
  );
}