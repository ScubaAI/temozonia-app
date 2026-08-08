import { getTranslations } from "next-intl/server";

interface OrderStatusBadgeProps {
  status: string;
  method: string;
}

export async function OrderStatusBadge({ status, method }: OrderStatusBadgeProps) {
  const t = await getTranslations({ locale: "es", namespace: "order" });

  const isPaid = status === "paid";
  const isPending = status === "pending";
  const isBitcoin = method === "btc";

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full border font-body text-sm font-semibold
        ${isPaid
          ? "bg-green-50 border-green-200 text-green-800"
          : isPending
            ? "bg-gold/10 border-gold/30 text-gold-500"
            : "bg-red-50 border-red-200 text-red-800"
        }
      `}
    >
      {/* Indicador pulsante */}
      <span className={`relative flex h-2.5 w-2.5`}>
        {isPending && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isPaid ? "bg-green-500" : isPending ? "bg-gold-500" : "bg-red-500"
          }`}
        />
      </span>

      <span>
        {isPaid
          ? isBitcoin
            ? "⚡ " + t("badge.paidLightning")
            : "✅ " + t("badge.paid")
          : isPending
            ? "⏳ " + t("badge.pending")
            : "❌ " + t("badge.failed")}
      </span>
    </div>
  );
}
