"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/formatters";

interface DigitalReceiptProps {
  orderId: string;
  locale?: string;
  order?: any;
}

export function DigitalReceipt({ orderId, locale = "es", order }: DigitalReceiptProps) {
  const t = useTranslations("Receipt");

  const orderData = order || {
    id: orderId,
    items: [],
    subtotal: 0,
    tax: 0,
    deliveryFee: 0,
    total: 0,
    currency: "MXN",
    status: "pending",
    createdAt: new Date().toISOString(),
    customer: { customerName: "Cliente", customerEmail: "" },
  };

  const currency = orderData.currency || "MXN";
  const status = orderData.paymentStatus || orderData.status;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="liquid-glass p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-gold-500/20 pb-4">
          <div>
            <h2 className="font-display text-3xl text-gold">Recibo Digital</h2>
            <p className="text-sm text-muted-foreground">#{orderData.id}</p>
          </div>
          <Badge variant="gold">{status === "paid" ? "Pagado" : "Pendiente"}</Badge>
        </div>

        <div className="space-y-4">
          <h3 className="text-gold">{t("customer")}</h3>
          <p>{orderData.customerName || orderData.customer?.name}</p>
          <p className="text-sm text-muted-foreground">{orderData.customerEmail || orderData.customer?.email}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-gold">{t("items")}</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gold-500/20">
                <th className="pb-2">{t("product")}</th>
                <th className="pb-2 text-right">{t("quantity")}</th>
                <th className="pb-2 text-right">{t("price")}</th>
                <th className="pb-2 text-right">{t("total")}</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item: any, i: number) => (
                <tr key={i} className="border-b border-gold-500/10">
                  <td className="py-2">{item.name}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{formatCurrency(item.price, item.currency || currency, locale)}</td>
                  <td className="text-right">{formatCurrency(item.price * item.quantity, item.currency || currency, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gold-500/30 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gold">{t("subtotal")}</span>
            <span>{formatCurrency(orderData.subtotal, currency, locale)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gold">{t("tax")}</span>
            <span>{formatCurrency(orderData.tax || 0, currency, locale)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gold">{t("delivery")}</span>
            <span>{formatCurrency(orderData.deliveryFee || 0, currency, locale)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gold">
            <span>{t("total")}</span>
            <span className="gold-accent">{formatCurrency(orderData.total, currency, locale)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
