const LOCALE_MAP: Record<string, string> = { es: "es-MX", en: "en-US" };

/** 25000 → "$250.00" (los precios viven en centavos) */
export function formatCurrency(cents: number, currency = "MXN", locale = "es"): string {
  return new Intl.NumberFormat(LOCALE_MAP[locale] ?? "es-MX", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function formatDate(iso: string, locale = "es"): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[locale] ?? "es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(iso));
}

/** Normaliza a E.164 para WhatsApp: "55 1234 5678" → "525512345678" */
export function toWhatsAppPhone(phone: string): string {
  let d = phone.replace(/\D/g, "");
  if (d.length === 10) d = `52${d}`;
  else if (d.length === 13 && d.startsWith("521")) d = `52${d.slice(3)}`;
  return d;
}