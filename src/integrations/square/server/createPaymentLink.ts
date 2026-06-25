import type {
  CreateSquarePaymentRequest,
  CreateSquarePaymentResponse,
} from "@/integrations/square/types";

/**
 * Template only: move this handler to your real backend server.
 * Keep SQUARE_ACCESS_TOKEN and secret values server-side only.
 */
export const createPaymentLinkHandlerTemplate = async (
  requestBody: CreateSquarePaymentRequest,
): Promise<CreateSquarePaymentResponse> => {
  const { amountCents } = requestBody;

  if (!amountCents || amountCents <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  // Example shape only, replace with actual Square SDK/API call.
  return {
    paymentLinkUrl: "https://square.link/u/replace-with-real-link",
    orderId: "replace-with-real-order-id",
  };
};
