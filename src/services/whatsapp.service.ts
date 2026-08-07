export class WhatsAppError extends Error {
  constructor(
    message: string,
    public readonly code: "AUTH_ERROR" | "NETWORK_ERROR" | "VALIDATION_ERROR",
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "WhatsAppError";
  }
}

export interface SendWhatsAppMessageParams {
  to: string;
  message: string;
  preview_url?: string;
}

export interface WhatsAppMessageResponse {
  messaging_product: string;
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

export async function sendWhatsAppMessage(
  params: SendWhatsAppMessageParams
): Promise<WhatsAppMessageResponse> {
  const apiToken = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!apiToken || !phoneNumberId) {
    throw new WhatsAppError(
      "WhatsApp API token or phone number ID is not configured",
      "AUTH_ERROR"
    );
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: params.to,
          text: {
            preview_url: params.preview_url || false,
            body: params.message
          }
        })
      }
    );

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new WhatsAppError(
        `WhatsApp API error: ${response.status} ${JSON.stringify(errorBody)}`,
        "NETWORK_ERROR",
        response.status
      );
    }

    const data: WhatsAppMessageResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WhatsAppError) throw error;
    throw new WhatsAppError("Failed to send WhatsApp message", "NETWORK_ERROR");
  }
}

export async function sendOrderConfirmation(order: any): Promise<WhatsAppMessageResponse> {
  const customerPhone = order.customer?.phone;
  const adminPhone = process.env.WHATSAPP_ADMIN_NUMBER;

  if (!customerPhone) {
    throw new WhatsAppError("Customer phone is required", "VALIDATION_ERROR");
  }

  const message = `
 ¡Hola ${order.customer?.name || "cliente"}! 
 Tu pedido #${order.id} ha sido confirmado.
 Total: ${order.total} ${order.currency}
 
 Gracias por elegir Temozonia 🍇
  `;

  const results: WhatsAppMessageResponse[] = [];

  const customerResult = await sendWhatsAppMessage({
    to: customerPhone,
    message: message.trim()
  });
  results.push(customerResult);

  if (adminPhone) {
    const adminMessage = `📦 Nuevo pedido #${order.id} - Total: ${order.total} ${order.currency}`;
    const adminResult = await sendWhatsAppMessage({
      to: adminPhone,
      message: adminMessage
    });
    results.push(adminResult);
  }

  return results[0];
}
