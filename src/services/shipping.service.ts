export class SkydropxError extends Error {
  constructor(
    message: string,
    public readonly code: "AUTH_ERROR" | "NETWORK_ERROR" | "VALIDATION_ERROR",
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "SkydropxError";
  }
}

export interface SkydropxRate {
  carrier: string;
  service: string;
  rate: number;
  currency: string;
  delivery_days: number;
  delivery_date: string;
}

export interface ShippingQuote {
  id: string;
  carrier: string;
  service: string;
  price: number;
  currency: string;
  estimatedDays: number;
  estimatedDate: string;
}

export async function getShippingRates(
  originZip: string,
  destinationZip: string,
  weight: number,
  height: number,
  width: number,
  length: number
): Promise<ShippingQuote[]> {
  const apiKey = process.env.SKYDROPX_API_KEY;

  if (!apiKey) {
    console.warn("SKYDROPX_API_KEY no configurada. Usando rates mock.");
    return getMockRates();
  }

  try {
    const response = await fetch("https://www.skydropx.com/api/v1/rates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${apiKey}`,
      },
      body: JSON.stringify({
        rate: {
          origin_postal_code: originZip,
          destination_postal_code: destinationZip,
          parcels: [
            {
              height,
              length,
              width,
              weight,
              value: 0,
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new SkydropxError(
        `Skydropx API error: ${response.status} ${JSON.stringify(errorBody)}`,
        "NETWORK_ERROR",
        response.status
      );
    }

    const data = await response.json();

    return data.rates.map((rate: SkydropxRate, index: number) => ({
      id: `rate-${index}`,
      carrier: rate.carrier,
      service: rate.service,
      price: Math.round(rate.rate * 100),
      currency: rate.currency,
      estimatedDays: rate.delivery_days,
      estimatedDate: rate.delivery_date,
    }));
  } catch (error) {
    if (error instanceof SkydropxError) throw error;
    throw new SkydropxError(
      `Error obteniendo rates de Skydropx: ${(error as Error).message}`,
      "NETWORK_ERROR"
    );
  }
}

function getMockRates(): ShippingQuote[] {
  return [
    {
      id: "rate-0",
      carrier: "FedEx",
      service: "Estándar",
      price: 15000,
      currency: "MXN",
      estimatedDays: 3,
      estimatedDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    },
    {
      id: "rate-1",
      carrier: "DHL",
      service: "Express",
      price: 25000,
      currency: "MXN",
      estimatedDays: 1,
      estimatedDate: new Date(Date.now() + 86400000).toISOString(),
    },
    {
      id: "rate-2",
      carrier: "Estafeta",
      service: "Paquetería",
      price: 12000,
      currency: "MXN",
      estimatedDays: 4,
      estimatedDate: new Date(Date.now() + 4 * 86400000).toISOString(),
    },
  ];
}
