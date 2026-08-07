"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Bitcoin, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";
import { DELIVERY_ZONES, SITE } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

export default function CheckoutForm({ locale }: { locale: Locale }) {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const tDelivery = useTranslations("delivery");
  const router = useRouter();

  const { items, getTotal, clearCart } = useCartStore();
  const subtotal = getTotal();

  // Redirigir si el carrito está vacío
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="mb-6 font-body text-xl text-warm-brown">{t("emptyCart")}</p>
        <Link href={`/${locale}/menu`} className="btn-heritage inline-flex">
          <ArrowLeft size={18} className="mr-2" />
          {t("backToMenu")}
        </Link>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedZoneId, setSelectedZoneId] = useState<string>(DELIVERY_ZONES[0].id);
  const [paymentMethod, setPaymentMethod] = useState<"btc" | "card">("btc");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedZone = DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  const deliveryFee = selectedZone.fee;
  const total = subtotal + deliveryFee;
  const isFreeShipping = subtotal >= SITE.freeShippingThreshold;
  const finalDeliveryFee = isFreeShipping ? 0 : deliveryFee;
  const finalTotal = subtotal + finalDeliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Preparar payload para la API (Fase 7: aquí iremos a Prisma + BTCPay)
    const orderPayload = {
      locale,
      items,
      subtotal,
      deliveryFee: finalDeliveryFee,
      total: finalTotal,
      currency: "MXN",
      customer: formData,
      delivery: {
        zone: selectedZone.labelKey,
        fee: finalDeliveryFee,
        eta: selectedZone.eta,
        address: formData.address,
      },
      payment: {
        method: paymentMethod,
        status: "pending",
      },
    };

    console.log("📦 Payload de orden listo para enviar:", orderPayload);
    
    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // TODO Fase 7: const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderPayload) })
    // Por ahora, redirigimos a una página de éxito mock
    alert("✅ Orden creada (Mock). En la Fase 7 esto creará la factura BTCPay y guardará en Prisma.");
    clearCart();
    router.push(`/${locale}/menu`); // Cambiar a /order/[id] en Fase 7
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href={`/${locale}/cart`} className="inline-flex items-center gap-2 font-body text-sm text-warm-brown hover:text-deep-red transition-colors mb-4">
          <ArrowLeft size={16} /> {tCommon("cart")}
        </Link>
        <h1 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl">
          {t("title")}
        </h1>
        <div className="gold-divider mt-4 w-40">
          <span aria-hidden>◆</span>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-5">
        {/* COLUMNA IZQUIERDA: Formulario */}
        <div className="lg:col-span-3 space-y-8">
          {/* Datos del Cliente */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-dark-wood">{t("customerInfo")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-1">{t("name")}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-1">{t("email")}</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-1">{t("phone")}</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  placeholder="55 1234 5678"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-1">{t("address")}</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  placeholder="Calle, número, colonia, código postal"
                />
              </div>
            </div>
          </section>

          {/* Zona de Envío */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-dark-wood">{t("deliveryZone")}</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {DELIVERY_ZONES.map((zone) => (
                <label
                  key={zone.id}
                  className={`relative flex cursor-pointer flex-col rounded-lg border p-4 transition-all ${
                    selectedZoneId === zone.id
                      ? "border-gold bg-gold/10 shadow-gold-glow"
                      : "border-gold/30 bg-parchment hover:border-gold/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="zone"
                    value={zone.id}
                    checked={selectedZoneId === zone.id}
                    onChange={(e) => setSelectedZoneId(e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-display text-sm font-bold text-dark-wood">
                    {tDelivery(zone.labelKey)}
                  </span>
                  <span className="mt-1 font-body text-xs text-warm-brown">
                    {zone.eta}
                  </span>
                  <span className="mt-2 font-mono text-sm font-bold text-deep-red">
                    {isFreeShipping ? "GRATIS" : formatCurrency(zone.fee, "MXN", locale)}
                  </span>
                </label>
              ))}
            </div>
            {isFreeShipping && (
              <p className="font-body text-sm text-gold-500 font-bold flex items-center gap-2">
                🎉 ¡Envío gratis aplicado!
              </p>
            )}
          </section>

          {/* Método de Pago */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-dark-wood">{t("paymentMethod")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label
                className={`relative flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all ${
                  paymentMethod === "btc"
                    ? "border-gold bg-liquid-bg text-cream shadow-gold-glow"
                    : "border-gold/30 bg-parchment hover:border-gold/60"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="btc"
                  checked={paymentMethod === "btc"}
                  onChange={() => setPaymentMethod("btc")}
                  className="sr-only"
                />
                <Bitcoin size={24} className={paymentMethod === "btc" ? "text-gold" : "text-warm-brown"} />
                <div>
                  <span className="block font-display text-sm font-bold">{t("payWithBtc")}</span>
                  <span className="block font-body text-xs opacity-80">Lightning Network</span>
                </div>
              </label>

              <label
                className={`relative flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all ${
                  paymentMethod === "card"
                    ? "border-gold bg-parchment shadow-gold-glow"
                    : "border-gold/30 bg-parchment hover:border-gold/60"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="sr-only"
                />
                <CreditCard size={24} className={paymentMethod === "card" ? "text-deep-red" : "text-warm-brown"} />
                <div>
                  <span className="block font-display text-sm font-bold text-dark-wood">{t("payWithCard")}</span>
                  <span className="block font-body text-xs text-warm-brown">Mercado Pago / Stripe</span>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: Recibo Sticky */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            <div className="receipt-gold">
              <h3 className="font-display text-sm uppercase tracking-widest text-warm-brown mb-4">
                {t("summary")}
              </h3>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between font-body text-sm text-dark-wood">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{formatCurrency(item.price * item.quantity, "MXN", locale)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-divider my-4" />

              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between text-warm-brown">
                  <span>{tCommon("subtotal")}</span>
                  <span>{formatCurrency(subtotal, "MXN", locale)}</span>
                </div>
                <div className="flex justify-between text-warm-brown">
                  <span>{tCommon("delivery")}</span>
                  <span className={isFreeShipping ? "text-gold-500 font-bold" : ""}>
                    {isFreeShipping ? "GRATIS" : formatCurrency(finalDeliveryFee, "MXN", locale)}
                  </span>
                </div>
              </div>

              <div className="receipt-divider my-4" />

              <div className="payment-total-glass mt-4">
                <span className="font-display text-xs uppercase tracking-widest text-warm-brown block mb-1">
                  {tCommon("total")}
                </span>
                <span className="total-amount">
                  {formatCurrency(finalTotal, "MXN", locale)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-heritage w-full justify-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("processing") : t("placeOrder")}
              </button>

              <p className="mt-4 text-center font-body text-[10px] text-warm-brown/70">
                Al confirmar, aceptas nuestros términos y condiciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
