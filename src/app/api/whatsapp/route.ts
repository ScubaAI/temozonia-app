import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { to, message } = body;

  if (!to) {
    return NextResponse.json({ error: "Missing 'to' parameter" }, { status: 400 });
  }

  try {
    const result = await fetch(
      `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          text: { body: message || "Nuevo pedido recibido" }
        })
      }
    );

    if (!result.ok) {
      const error = await result.text();
      console.error("WhatsApp API error:", error);
      return NextResponse.json({ error: error }, { status: 502 });
    }

    const data = await result.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("WhatsApp send error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
