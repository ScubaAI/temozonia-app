import { Bitcoin } from "lucide-react";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <p className="font-display text-xs uppercase tracking-widest text-warm-brown">
        {t("heroKicker")}
      </p>
      <h1 className="font-display text-6xl font-black text-dark-wood md:text-7xl">
        {t("heroTitle")}
      </h1>
      <p className="max-w-2xl font-body text-base leading-relaxed text-warm-brown">
        {t("heroSubtitle")}
      </p>
      <div className="gold-divider w-40">
        <span aria-hidden>◆</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href={`/${locale}/menu`} className="btn-heritage">
          {t("ctaCatalog")}
        </Link>
        <span className="glass-btn-dark">
          <Bitcoin size={18} className="text-gold" aria-hidden />
          {t("ctaBitcoin")}
        </span>
      </div>
    </main>
  );
}