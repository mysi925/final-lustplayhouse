export type CreateSquarePaymentRequest = {
  amountCents: number;
  currency: "USD";
  customerEmail?: string;
};

export type CreateSquarePaymentResponse = {
  paymentLinkUrl: string;
  orderId: string;
};

export type SquareBackendError = {
  message: string;
  code?: string;
};
