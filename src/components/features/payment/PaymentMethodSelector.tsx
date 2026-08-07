"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { CreditCard, Bitcoin, Wallet, Loader2 } from "lucide-react";

export function PaymentMethodSelector() {
  const t = useTranslations("Checkout.payment");
  const [loading, setLoading] = useState<string | null>(null);

  const handlePaymentMethod = async (method: "btc" | "mercadopago" | "stripe") => {
    setLoading(method);

    const endpoints = {
      btc: "/api/btcpay/create-invoice",
      mercadopago: "/api/mercadopago/create-preference",
      stripe: "/api/stripe/create-checkout"
    };

    try {
      const response = await fetch(endpoints[method], {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Failed to create ${method} checkout`);
      }

      const data = await response.json();

      if (data.redirectURL || data.url || data.init_point) {
        window.location.href = data.redirectURL || data.url || data.init_point;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(t("error") || "Hubo un error al procesar el pago");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl text-gold">{t("title")}</h3>

      <div className="grid gap-3">
        <Button
          variant="gold"
          className="flex items-center justify-start gap-3"
          onClick={() => handlePaymentMethod("btc")}
          disabled={!!loading}
        >
          {loading === "btc" ? <Loader2 className="animate-spin" size={20} /> : <Bitcoin size={20} />}
          {loading === "btc" ? "Procesando..." : t("methods.btc")}
        </Button>

        <Button
          variant="secondary"
          className="flex items-center justify-start gap-3"
          onClick={() => handlePaymentMethod("mercadopago")}
          disabled={!!loading}
        >
          {loading === "mercadopago" ? <Loader2 className="animate-spin" size={20} /> : <Wallet size={20} />}
          {loading === "mercadopago" ? "Procesando..." : t("methods.mercadopago")}
        </Button>

        <Button
          variant="secondary"
          className="flex items-center justify-start gap-3"
          onClick={() => handlePaymentMethod("stripe")}
          disabled={!!loading}
        >
          {loading === "stripe" ? <Loader2 className="animate-spin" size={20} /> : <CreditCard size={20} />}
          {loading === "stripe" ? "Procesando..." : t("methods.stripe")}
        </Button>
      </div>
    </div>
  );
}
