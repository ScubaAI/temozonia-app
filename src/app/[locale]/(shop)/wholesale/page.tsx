"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, Truck, Award, Clock, CheckCircle2, Store, Utensils, ShoppingCart, Package } from "lucide-react";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/TU_ID_DE_FORMULARIO_AQUI/formResponse";
const FORM_ENTRIES = {
  businessName: "entry.111111111",
  contactName: "entry.222222222",
  phone: "entry.333333333",
  businessType: "entry.444444444",
  products: "entry.555555555",
  volume: "entry.666666666",
  comments: "entry.777777777",
};

export default function WholesalePage({ params }: { params: Promise<{ locale: string }> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const _locale = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "es";
  void params;

  const t = useTranslations("wholesale");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const data = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (value) {
        data.append(key, value.toString());
      }
    }

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error enviando formulario:", error);
      alert("Hubo un error al enviar. Por favor, contáctanos directamente por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-24">
        <div className="receipt-gold mx-auto max-w-lg p-8 md:p-12 text-center space-y-6 animate-fade-up">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
            <CheckCircle2 size={40} className="text-gold" />
          </div>
          <h2 className="font-script text-4xl font-bold italic text-deep-red md:text-5xl">
            {t("form.success.title")}
          </h2>
          <p className="font-body text-base leading-relaxed text-warm-brown">
            {t("form.success.desc")}
          </p>
          <a
            href="https://wa.me/5219994918221"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-heritage inline-flex items-center gap-2 mt-4"
          >
            Ir a WhatsApp
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col">
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-dark-wood pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8 animate-fade-up">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
            {t("hero.kicker")}
          </p>

          <h1 className="font-script text-6xl font-bold italic text-cream md:text-8xl leading-[0.9]">
            {t("hero.title")}
          </h1>

          <p className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-cream/90 md:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="gold-divider mx-auto w-40 pt-4">
            <span aria-hidden className="text-gold">◆</span>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center font-display text-4xl font-bold text-dark-wood md:text-5xl">
            {t("benefits.title")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, key: "margin" },
              { icon: Package, key: "supply" },
              { icon: Award, key: "quality" },
              { icon: Truck, key: "delivery" },
            ].map((item) => (
              <div key={item.key} className="rounded-2xl border-2 border-gold/30 bg-cream p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-gold-glow">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-dark-wood">
                  <item.icon size={32} className="text-gold" />
                </div>
                <h3 className="mb-3 font-display text-lg font-bold text-dark-wood">
                  {t(`benefits.${item.key}.title`)}
                </h3>
                <p className="font-body text-sm leading-relaxed text-warm-brown">
                  {t(`benefits.${item.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="receipt-gold p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="font-script text-4xl font-bold italic text-deep-red md:text-5xl">
                {t("form.title")}
              </h2>
              <p className="mt-3 font-body text-base text-warm-brown">
                {t("form.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-2">
                    {t("form.businessName")} *
                  </label>
                  <input
                    required
                    name={FORM_ENTRIES.businessName}
                    type="text"
                    className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-2">
                    {t("form.contactName")} *
                  </label>
                  <input
                    required
                    name={FORM_ENTRIES.contactName}
                    type="text"
                    className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-2">
                    {t("form.phone")} *
                  </label>
                  <input
                    required
                    name={FORM_ENTRIES.phone}
                    type="tel"
                    placeholder="999 123 4567"
                    className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-2">
                    {t("form.businessType")} *
                  </label>
                  <select
                    required
                    name={FORM_ENTRIES.businessType}
                    className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all appearance-none"
                  >
                    <option value="">{t("form.businessTypePlaceholder")}</option>
                    <option value="carniceria">{t("form.businessTypes.carniceria")}</option>
                    <option value="restaurante">{t("form.businessTypes.restaurante")}</option>
                    <option value="tienda">{t("form.businessTypes.tienda")}</option>
                    <option value="distribuidor">{t("form.businessTypes.distribuidor")}</option>
                    <option value="otro">{t("form.businessTypes.otro")}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-2">
                    {t("form.volume")}
                  </label>
                  <input
                    name={FORM_ENTRIES.volume}
                    type="number"
                    min="0"
                    className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-3">
                    {t("form.products")}
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { value: "carne", label: t("form.productOptions.carne"), icon: Store },
                      { value: "longaniza", label: t("form.productOptions.longaniza"), icon: Package },
                      { value: "costillas", label: t("form.productOptions.costillas"), icon: Award },
                      { value: "chorizo", label: t("form.productOptions.chorizo"), icon: ShoppingCart },
                      { value: "pocchuc", label: t("form.productOptions.pocchuc"), icon: Utensils },
                    ].map((product) => (
                      <label
                        key={product.value}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gold/30 bg-parchment p-3 transition-all hover:border-gold hover:bg-gold/5"
                      >
                        <input
                          type="checkbox"
                          name={FORM_ENTRIES.products}
                          value={product.label}
                          className="h-5 w-5 rounded border-gold/50 text-deep-red focus:ring-gold"
                        />
                        <product.icon size={18} className="text-warm-brown" />
                        <span className="font-body text-sm text-dark-wood">{product.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-display text-xs uppercase tracking-widest text-warm-brown mb-2">
                    {t("form.comments")}
                  </label>
                  <textarea
                    name={FORM_ENTRIES.comments}
                    rows={4}
                    className="w-full rounded-lg border border-gold/30 bg-parchment px-4 py-3 font-body text-dark-wood placeholder-warm-brown/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-heritage w-full justify-center py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Clock size={20} className="animate-spin" />
                    {t("form.submitting")}
                  </span>
                ) : (
                  t("form.submit")
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
