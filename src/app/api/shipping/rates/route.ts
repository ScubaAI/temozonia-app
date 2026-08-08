import { NextRequest, NextResponse } from "next/server";
import { getShippingRates } from "@/services/shipping.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      originZip,
      destinationZip,
      weight,
      height,
      width,
      length,
    } = body;

    if (!originZip || !destinationZip) {
      return NextResponse.json(
        { error: "Código postal de origen y destino son requeridos" },
        { status: 400 }
      );
    }

    const rates = await getShippingRates(
      originZip,
      destinationZip,
      weight || 1,
      height || 20,
      width || 20,
      length || 20
    );

    return NextResponse.json({ success: true, rates });
  } catch (error) {
    console.error("Error en /api/shipping/rates:", error);
    return NextResponse.json(
      { success: false, error: "Error al calcular envíos" },
      { status: 500 }
    );
  }
}
