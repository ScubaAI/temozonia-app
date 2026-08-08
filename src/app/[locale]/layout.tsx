import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Inter,
  Orbitron,
} from "next/font/google";
import { locales, type Locale } from "@/lib/i18n/routing";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CartDrawerWrapper } from "@/components/cart/CartDrawerWrapper";

// Fuentes
const fontDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-display", display: "swap" });
const fontScript = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-script", display: "swap" });
const fontBody = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-body", display: "swap" });
const fontMono = Orbitron({ subsets: ["latin"], weight: ["500", "700", "900"], variable: "--font-mono", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontScript.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body className="bg-cream font-body text-dark-wood antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider>
          <Header locale={locale as Locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <WhatsAppFloat />
          <CartDrawerWrapper locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}