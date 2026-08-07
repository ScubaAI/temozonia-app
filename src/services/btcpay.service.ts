import crypto from "crypto";

export class BtcpayError extends Error {
  constructor(
    message: string,
    public readonly code: "SIGNATURE_INVALID" | "NETWORK_ERROR" | "VALIDATION_ERROR",
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "BtcpayError";
  }
}

export interface BtcpayInvoice {
  orderId: string;
  price: string;
  currency: string;
  itemDesc?: string;
  redirectURL?: string;
  notificationURL?: string;
  buyerEmail?: string;
}

export function verifyBtcpaySignature(
  body: string,
  signature: string,
  hmacSecret: string
): boolean {
  if (!signature || !hmacSecret) return false;

  try {
    const parts = signature.split("=");
    if (parts.length !== 2 || parts[0] !== "sha256_hmac") return false;

    const [, hash] = parts;
    const expected = crypto
      .createHmac("sha256", hmacSecret)
      .update(body)
      .digest("hex");

    const provided = hash;

    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(provided, "hex")
    );
  } catch {
    return false;
  }
}

export async function createInvoice(params: BtcpayInvoice): Promise<any> {
  const serverUrl = process.env.BTCPAY_SERVER_URL;
  const storeId = process.env.BTCPAY_STORE_ID;

  if (!serverUrl || !storeId) {
    throw new BtcpayError(
      "BTCPay Server URL or Store ID not configured",
      "VALIDATION_ERROR",
      500
    );
  }

  try {
    const response = await fetch(`${serverUrl}/api/v1/stores/${storeId}/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Hash: sha256": generateContentHash(params)
      },
      body: JSON.stringify({
        amount: params.price,
        currency: params.currency,
        orderId: params.orderId,
        itemDesc: params.itemDesc,
        redirectURL: params.redirectURL,
        notificationURL: params.notificationURL,
        buyerEmail: params.buyerEmail,
        transactionSpeed: "Medium"
      })
    });

    if (!response.ok) {
      throw new BtcpayError(
        `BTCPay error: ${response.statusText}`,
        "NETWORK_ERROR",
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof BtcpayError) throw error;
    throw new BtcpayError(
      "Failed to create BTCPay invoice",
      "NETWORK_ERROR"
    );
  }
}

export async function updateOrderFromBtcpay(payload: any): Promise<void> {
  const orderId = payload.orderId;

  if (!orderId) {
    throw new BtcpayError("Missing orderId in webhook payload", "VALIDATION_ERROR");
  }

  const statusMap: Record<string, string> = {
    new: "pending",
    paid: "paid",
    confirmed: "paid",
    complete: "paid",
    expired: "failed",
    invalid: "failed",
    cancelled: "refunded",
  };

  const paymentStatus = statusMap[payload.status] || "pending";

  const { prisma } = await import("@/lib/prisma");

  await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus,
      txId: payload.transactionHash || payload.invoiceId,
      updatedAt: new Date(),
    },
  });

  console.log(`[BTCPay] Order ${orderId} status updated to: ${paymentStatus}`);
}

function generateContentHash(body: any): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(body))
    .digest("hex");
}

export async function getInvoiceStatus(invoiceId: string): Promise<any> {
  const serverUrl = process.env.BTCPAY_SERVER_URL;
  const storeId = process.env.BTCPAY_STORE_ID;

  const response = await fetch(
    `${serverUrl}/api/v1/stores/${storeId}/invoices/${invoiceId}`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new BtcpayError(
      `Failed to fetch invoice: ${response.statusText}`,
      "NETWORK_ERROR",
      response.status
    );
  }

  return response.json();
}
