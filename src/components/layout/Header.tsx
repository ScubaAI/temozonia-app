"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShoppingCart, Menu } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Locale } from "@/lib/i18n/routing";

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const { getItemCount, toggleCart } = useCartStore();
  const itemCount = getItemCount();

  const otherLocale = locale === "es" ? "en" : "es";
  const newPathname = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-script text-3xl font-bold italic text-deep-red">
            Temozonia
          </span>
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden items-center gap-8 font-display text-sm uppercase tracking-widest text-warm-brown md:flex">
          <Link href={`/${locale}/menu`} className="hover:text-deep-red transition-colors">
            {t("menu")}
          </Link>
          <Link href={`/${locale}/cart`} className="hover:text-deep-red transition-colors">
            {t("cart")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Locale Switcher */}
          <Link href={newPathname} className="glass-btn px-3 py-1.5 text-xs">
            {otherLocale.toUpperCase()}
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative glass-btn p-2.5"
            aria-label={t("cart")}
          >
            <ShoppingCart size={20} className="text-dark-wood" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-deep-red text-[10px] font-bold text-cream">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu (Placeholder) */}
          <button className="md:hidden glass-btn p-2.5" aria-label="Menu">
            <Menu size={20} className="text-dark-wood" />
          </button>
        </div>
      </div>
    </header>
  );
}