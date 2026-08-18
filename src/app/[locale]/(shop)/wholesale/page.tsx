import { getTranslations } from "next-intl/server";
import { Package, Award, Truck } from "lucide-react";
import WholesaleForm from "./WholesaleForm";

export default async function WholesalePage() {
  const t = await getTranslations("wholesale");

  // ✅ CORREGIDO: se eliminó el beneficio "margin" (margen de ganancia) por instrucción del cliente
  const benefits = [
    { icon: Package, key: "supply" },
    { icon: Award, key: "quality" },
    { icon: Truck, key: "delivery" },
  ];

  return (
    <main className="flex flex-col">
      {/* ══ HERO (copy nuevo + estética consistente) ══ */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-dark-wood px-6 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-dark-wood pointer-events-none" />

        {/* Humo + brasas del ahumador (consistencia con el nuevo Hero) */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="smoke left-[15%] top-[10%] h-56 w-56" />
          <div className="smoke right-[12%] top-[18%] h-72 w-72" style={{ animationDelay: "3s" }} />
          <span className="ember left-[14%] top-[26%]" />
          <span className="ember left-[30%] top-[16%]" style={{ animationDelay: "1.2s" }} />
          <span className="ember left-[52%] top-[12%]" style={{ animationDelay: "2.4s" }} />
          <span className="ember left-[70%] top-[20%]" style={{ animationDelay: "0.8s" }} />
          <span className="ember left-[86%] top-[28%]" style={{ animationDelay: "1.8s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 animate-fade-up">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
            {t("hero.kicker")}
          </p>

          <h1 className="font-script text-5xl font-bold italic leading-[0.95] text-cream md:text-7xl">
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

      {/* ══ BENEFICIOS (3 cards, sin margen de ganancia) ══ */}
      <section className="bg-parchment px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-display text-4xl font-bold text-dark-wood md:text-5xl">
            {t("benefits.title")}
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border-2 border-gold/30 bg-cream p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-gold-glow"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-dark-wood">
                  <item.icon size={32} className="text-gold" aria-hidden="true" />
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

      {/* ══ FORMULARIO ══ */}
      <section className="bg-cream px-6 py-16 md:py-20">
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

            <WholesaleForm />
          </div>
        </div>
      </section>
    </main>
  );
}