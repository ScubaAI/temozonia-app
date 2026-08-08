"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Bitcoin, CreditCard, ArrowLeft, Truck, Package } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";
import { DELIVERY_ZONES, SITE } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

export default function CheckoutForm({ locale }: { locale: Locale }) {
  // 1. TODOS LOS HOOKS VAN AL PRINCIPIO
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const tDelivery = useTranslations("delivery");
  const router = useRouter();

  const { items, getTotal, clearCart } = useCartStore();
  const subtotal = getTotal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedZoneId, setSelectedZoneId] = useState<string>(DELIVERY_ZONES[0].id);
  const [paymentMethod, setPaymentMethod] = useState<"btc" | "card">("btc");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedShippingRate, setSelectedShippingRate] = useState<string | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  // 2. LÓGICA DE NEGOCIO
  const selectedZone = DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  const deliveryFee = selectedZone.fee;
  const isFreeShipping = subtotal >= SITE.freeShippingThreshold;
  const finalDeliveryFee = isFreeShipping ? 0 : deliveryFee;
  const finalTotal = subtotal + finalDeliveryFee;

  // 3. RETURNS CONDICIONALES (DESPUÉS DE LOS HOOKS)
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

  // 4. HANDLERS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      locale,
      items,
      subtotal,
      deliveryFee: finalDeliveryFee,
      total: finalTotal,
      currency: "MXN",
      customer: formData,
      delivery: {
        zone: tDelivery(selectedZone.labelKey),
        fee: finalDeliveryFee,
        eta: selectedZone.eta,
        address: formData.address,
      },
      payment: {
        method: paymentMethod,
        status: "pending",
      },
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la orden");
      }

      clearCart();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        router.push(`/${locale}/order/${data.orderId}`);
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      alert("Hubo un error al procesar tu orden. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateShipping = async () => {
    setIsLoadingRates(true);
    setShippingError(null);

    try {
      const response = await fetch("/api/shipping/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originZip: "97300",
          destinationZip: "97000",
          weight: 2,
          height: 20,
          width: 30,
          length: 40,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setShippingRates(data.rates);

      if (data.rates.length > 0) {
        const cheapest = data.rates.reduce((prev: any, curr: any) =>
          prev.price < curr.price ? prev : curr
        );
        setSelectedShippingRate(cheapest.id);
      }
    } catch (error) {
      console.error("Error calculando envío:", error);
      setShippingError("No pudimos calcular el envío. Intenta de nuevo.");
    } finally {
      setIsLoadingRates(false);
    }
  };

  // 5. RENDER
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

          {/* Zona de Envío - NUEVA SECCIÓN */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-dark-wood">
                {t("shipping.title")}
              </h2>
              <span className="font-display text-xs uppercase tracking-widest text-warm-brown">
                {t("shipping.origin")}
              </span>
            </div>

            <div>
              <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-2">
                Código Postal de Destino
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="97000"
                  className="flex-1 rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                />
                <button
                  type="button"
                  onClick={calculateShipping}
                  disabled={isLoadingRates}
                  className="btn-heritage px-6 py-3 disabled:opacity-50"
                >
                  {isLoadingRates ? (
                    <span className="flex items-center gap-2">
                      <Package size={18} className="animate-spin" />
                      Calculando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Truck size={18} />
                      {t("shipping.calculate")}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {shippingError && (
              <div className="rounded-lg border border-deep-red/30 bg-deep-red/5 p-4 text-center">
                <p className="font-body text-sm text-deep-red">{shippingError}</p>
                <button
                  type="button"
                  onClick={calculateShipping}
                  className="mt-2 font-display text-xs uppercase tracking-widest text-brand-600 hover:text-brand-700"
                >
                  {t("shipping.tryAgain")}
                </button>
              </div>
            )}

            {shippingRates.length > 0 && (
              <div className="grid gap-3">
                {shippingRates.map((rate) => (
                  <label
                    key={rate.id}
                    className={`relative flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${
                      selectedShippingRate === rate.id
                        ? "border-gold bg-gold/10 shadow-gold-glow"
                        : "border-gold/30 bg-parchment hover:border-gold/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={rate.id}
                      checked={selectedShippingRate === rate.id}
                      onChange={(e) => setSelectedShippingRate(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-dark-wood/5">
                        <Truck size={24} className="text-deep-red" />
                      </div>
                      <div>
                        <span className="block font-display text-sm font-bold text-dark-wood">
                          {rate.carrier} - {rate.service}
                        </span>
                        <span className="block font-body text-xs text-warm-brown">
                          {rate.estimatedDays} {t("shipping.estimatedDays")}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-lg font-bold text-deep-red">
                      {formatCurrency(rate.price, "MXN", locale)}
                    </span>
                  </label>
                ))}
              </div>
            )}
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