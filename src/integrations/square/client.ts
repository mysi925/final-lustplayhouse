import { squareConfig } from "@/integrations/square/config";
import type {
  CreateSquarePaymentRequest,
  CreateSquarePaymentResponse,
} from "@/integrations/square/types";

export const createSquarePaymentLink = async (
  payload: CreateSquarePaymentRequest,
): Promise<CreateSquarePaymentResponse> => {
  if (!squareConfig.backendBaseUrl) {
    throw new Error(
      "Missing backend URL. Set VITE_PAYMENTS_BACKEND_URL first.",
    );
  }

  const response = await fetch(
    `${squareConfig.backendBaseUrl}/api/payments/square/create-link`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Square backend request failed: ${text}`);
  }

  return response.json() as Promise<CreateSquarePaymentResponse>;
};
