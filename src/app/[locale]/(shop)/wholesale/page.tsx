import { getTranslations } from "next-intl/server";
import { TrendingUp, Package, Award, Truck } from "lucide-react";
import WholesaleForm from "./WholesaleForm";

export default async function WholesalePage() {
  const t = await getTranslations("wholesale");

  const benefits = [
    { icon: TrendingUp, key: "margin" },
    { icon: Package, key: "supply" },
    { icon: Award, key: "quality" },
    { icon: Truck, key: "delivery" },
  ];

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
            <span aria-hidden className="text-gold">
              ◆
            </span>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center font-display text-4xl font-bold text-dark-wood md:text-5xl">
            {t("benefits.title")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border-2 border-gold/30 bg-cream p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-gold-glow"
              >
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

            <WholesaleForm />
          </div>
        </div>
      </section>
    </main>
  );
}
