export class MercadoPagoError extends Error {
  constructor(
    message: string,
    public readonly code: "AUTH_ERROR" | "NETWORK_ERROR" | "VALIDATION_ERROR",
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "MercadoPagoError";
  }
}

export interface PreferenceItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
}

export interface Payer {
  name?: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CreatePreferenceParams {
  items: PreferenceItem[];
  payer: Payer;
  back_urls: {
    success: string;
    failure: string;
    pending?: string;
  };
  auto_return?: "approved" | "all";
  webhook_url?: string;
  external_reference?: string;
}

export interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  external_reference?: string;
}

export async function createPreference(params: CreatePreferenceParams): Promise<PreferenceResponse> {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new MercadoPagoError(
      "MERCADO_PAGO_ACCESS_TOKEN is not configured",
      "AUTH_ERROR"
    );
  }

  try {
    const body: any = {
      items: params.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: item.currency_id || "MXN"
      })),
      payer: {
        email: params.payer.email,
        name: params.payer.name,
        phone: params.payer.phone,
        address: params.payer.address
      },
      back_urls: params.back_urls,
      auto_return: params.auto_return || "approved",
      external_reference: params.external_reference
    };

    if (params.webhook_url) {
      body.notification_url = params.webhook_url;
    }

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-locale": "es_MX"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new MercadoPagoError(
        `MercadoPago error: ${response.status} ${JSON.stringify(errorBody)}`,
        "NETWORK_ERROR",
        response.status
      );
    }

    const data: PreferenceResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof MercadoPagoError) throw error;
    throw new MercadoPagoError("Failed to create MercadoPago preference", "NETWORK_ERROR");
  }
}

export async function getPaymentStatus(paymentId: string): Promise<any> {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new MercadoPagoError(
      `Failed to fetch payment: ${response.statusText}`,
      "NETWORK_ERROR",
      response.status
    );
  }

  return response.json();
}

export function verifyWebhookSignature(signature: string, body: string): boolean {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  try {
    const crypto = require("crypto");
    const expected = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature.split("=").pop() || "", "hex")
    );
  } catch {
    return false;
  }
}
