import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/routing";

interface RecipesPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: RecipesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recipes" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      locale: locale === "es" ? "es_MX" : "en_US",
    },
  };
}

export default async function RecipesPage({ params }: RecipesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("recipes");

  const steps = [
    { key: "selection", icon: "1" },
    { key: "marinade", icon: "2" },
    { key: "smoking", icon: "3" },
    { key: "quality", icon: "4" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-script text-5xl font-bold italic text-deep-red md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-3 font-body text-base text-warm-brown">{t("subtitle")}</p>
        <div className="gold-divider mx-auto mt-6 w-40"><span aria-hidden>◆</span></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.key}
            className="group relative rounded-2xl border-2 border-gold/30 bg-parchment p-8 transition-all hover:border-gold hover:shadow-gold-glow"
          >
            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold bg-dark-wood font-display text-xl font-black text-gold">
                {step.icon}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-deep-red">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-warm-brown">
                  {t(`steps.${step.key}.desc`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
