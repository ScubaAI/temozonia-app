"use client";

import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, Clock } from "lucide-react";
import { BUSINESS, getWhatsAppLink } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

export function WhatsAppCTA() {
  const t = useTranslations("common.whatsapp");
  const locale = useLocale() as Locale;
  const whatsappLink = getWhatsAppLink(locale);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("floatText")}
      className="group inline-flex items-center gap-3 rounded-full bg-deep-red px-6 py-3 text-cream shadow-lg transition-all duration-300 hover:scale-105 hover:bg-brand-600 hover:shadow-xl"
    >
      {/* Icono de WhatsApp */}
      <MessageCircle
        className="h-5 w-5 text-cream transition-transform group-hover:rotate-12"
        aria-hidden="true"
      />

      {/* Texto del CTA */}
      <span className="font-display font-semibold">{t("floatText")}</span>

      {/* Badge "Respuesta en minutos" */}
      <span className="inline-flex items-center gap-1 rounded-full bg-cream/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {t("responseBadge")}
      </span>
    </a>
  );
}
