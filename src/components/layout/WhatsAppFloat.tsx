"use client";

import { useTranslations, useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/routing";

export function WhatsAppFloat() {
  const t = useTranslations("common.whatsapp");
  const locale = useLocale() as Locale;
  const whatsappLink = getWhatsAppLink(locale);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("floatText")}
      className="liquid-glass fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-deep-red/90 text-cream shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-deep-red"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />

      {/* Punto de notificación animado */}
      <span className="absolute right-1 top-1 h-3 w-3 animate-ping rounded-full bg-gold-300 opacity-75" />
      <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-gold-500" />
    </a>
  );
}
