import { getTranslations } from "next-intl/server";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Order } from "@/types/order";
import type { Locale } from "@/lib/i18n/routing";

interface DigitalReceiptProps {
  order: Order;
  locale: string;
}

export async function DigitalReceipt({ order, locale }: DigitalReceiptProps) {
  const t = await getTranslations({ locale, namespace: "receipt" });

  const isBitcoin = order.payment.method === "btc";

  return (
    <section className="receipt-gold relative rounded-lg p-6 md:p-8 max-w-lg mx-auto">
      {/* ─── Doble borde heritage ─── */}
      <div className="absolute inset-[6px] border border-gold/40 rounded-md pointer-events-none" />

      {/* ─── Header del recibo ─── */}
      <header className="text-center mb-6 pb-4 border-b border-dashed border-gold/30">
        <h2 className="font-display text-xl font-bold text-dark-wood">
          TEMOZONIA
        </h2>
        <p className="font-script text-sm italic text-wold mt-1">
          {t("subtitle")}
        </p>
        <p className="font-body text-xs text-warm-brown mt-2">
          {formatDate(order.createdAt, locale)}
        </p>
        <p className="font-body text-xs text-warm-brown/60 font-mono mt-1">
          #{order.id.slice(0, 8).toUpperCase()}
        </p>
      </header>

      {/* ─── Items del pedido ─── */}
      <div className="space-y-3 mb-6">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 py-2 border-b border-dashed border-gold/20 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-semibold text-dark-wood truncate">
                {item.name}
              </p>
              <p className="font-body text-xs text-warm-brown/70 mt-0.5">
                {item.quantity} × {formatCurrency(item.price, item.currency, locale)}
              </p>
            </div>
            <p className="font-body text-sm font-medium text-dark-wood whitespace-nowrap">
              {formatCurrency(item.price * item.quantity, item.currency, locale)}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Totales ─── */}
      <div className="space-y-2 mb-6 pt-4 border-t border-dashed border-gold/30">
        <div className="flex justify-between font-body text-sm text-warm-brown">
          <span>{t("subtotal")}</span>
          <span>{formatCurrency(order.subtotal, order.currency, locale)}</span>
        </div>

        {order.deliveryFee > 0 && (
          <div className="flex justify-between font-body text-sm text-warm-brown">
            <span>{t("shipping")}</span>
            <span>{formatCurrency(order.deliveryFee, order.currency, locale)}</span>
          </div>
        )}

        {order.discount && order.discount > 0 && (
          <div className="flex justify-between font-body text-sm text-deep-red">
            <span>{t("discount")}</span>
            <span>-{formatCurrency(order.discount, order.currency, locale)}</span>
          </div>
        )}
      </div>

      {/* ─── TOTAL con Liquid Glass ─── */}
      <div className="payment-total-glass rounded-xl p-4 text-center mb-6">
        <p className="font-display text-xs uppercase tracking-wider text-warm-brown mb-1">
          {t("total")}
        </p>
        <p className="font-mono text-2xl md:text-3xl font-bold text-dark-wood">
          {formatCurrency(order.total, order.currency, locale)}
        </p>
        {isBitcoin && (
          <p className="font-body text-[10px] text-gold mt-1 uppercase tracking-wider">
            ⚡ {t("paidWithLightning")}
          </p>
        )}
      </div>

      {/* ─── Info de envío ─── */}
      <div className="bg-parchment/50 rounded-lg p-4 mb-6">
        <h3 className="font-display text-xs font-bold uppercase tracking-wider text-dark-wood mb-2">
          {t("deliveryInfo")}
        </h3>
        <div className="space-y-1 font-body text-xs text-warm-brown">
          <p><span className="font-medium text-dark-wood">{t("address")}:</span> {order.delivery.address}</p>
          <p><span className="font-medium text-dark-wood">{t("zone")}:</span> {order.delivery.zone}</p>
          <p><span className="font-medium text-dark-wood">{t("eta")}:</span> {order.delivery.eta}</p>
        </div>
      </div>

      {/* ─── Info de pago ─── */}
      <div className="bg-parchment/50 rounded-lg p-4">
        <h3 className="font-display text-xs font-bold uppercase tracking-wider text-dark-wood mb-2">
          {t("paymentInfo")}
        </h3>
        <div className="space-y-1 font-body text-xs text-warm-brown">
          <p>
            <span className="font-medium text-dark-wood">{t("method")}:</span>{" "}
            {isBitcoin ? "Bitcoin ⚡" : order.payment.method === "mercadopago" ? "Mercado Pago" : "Stripe"}
          </p>
          <p>
            <span className="font-medium text-dark-wood">{t("status")}:</span>{" "}
            <span className={order.payment.status === "paid" ? "text-green-700" : "text-gold-500"}>
              {t(`status.${order.payment.status}`)}
            </span>
          </p>
          {order.payment.txId && (
            <p className="truncate">
              <span className="font-medium text-dark-wood">TX:</span>{" "}
              <span className="font-mono text-[10px]">{order.payment.txId}</span>
            </p>
          )}
        </div>
      </div>

      {/* ─── Sello de cierre ─── */}
      <footer className="text-center mt-6 pt-4 border-t border-dashed border-gold/30">
        <p className="font-script text-sm italic text-gold">
          "Del rancho a tu mesa, sin atajos"
        </p>
        <p className="font-body text-[10px] text-warm-brown/50 mt-2">
          🔴 100% Libre de conservadores
        </p>
      </footer>
    </section>
  );
}