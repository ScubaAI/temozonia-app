import { setRequestLocale } from "next-intl/server";
import CheckoutForm from "@/components/features/checkout/CheckoutForm";
import type { Locale } from "@/lib/i18n/routing";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CheckoutForm locale={locale as Locale} />
  );
}
