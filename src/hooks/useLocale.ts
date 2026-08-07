"use client";

import { useLocale as useNextIntlLocale } from "next-intl";
import { locales } from "@/lib/i18n/routing";

export function useLocale() {
  const locale = useNextIntlLocale();
  return locale;
}

export function useSwitchLocale() {
  const locale = useNextLocalePath();

  const availableLocales = locales as readonly string[];
  const currentIdx = availableLocales.indexOf(locale);
  const switchedLocale =
    availableLocales[(currentIdx + 1) % availableLocales.length] ?? "en";

  return { locale, switchedLocale, locales: availableLocales };
}

function useNextLocalePath(): string {
  if (typeof window === "undefined") return "es";

  const segments = window.location.pathname.split("/").filter(Boolean);
  return segments[0] ?? "es";
}
