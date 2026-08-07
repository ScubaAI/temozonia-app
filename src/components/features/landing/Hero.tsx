"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/50 via-liquid-bg to-brand-800/30" />
      <div className="relative container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-5xl md:text-6xl text-gold mb-6 drop-shadow-gold">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {t("subtitle")}
        </p>
        <Link href="/es/menu">
          <Button variant="gold" size="lg">{t("cta")}</Button>
        </Link>
      </div>
    </section>
  );
}
