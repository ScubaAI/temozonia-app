"use client";

import { useCartStore } from "@/store/cartStore";
import { CartDrawer } from "@/components/features/cart/CartDrawer";

export function CartDrawerWrapper({ locale }: { locale: string }) {
  const { isOpen, closeCart } = useCartStore();
  return <CartDrawer locale={locale} isOpen={isOpen} onClose={closeCart} />;
}
