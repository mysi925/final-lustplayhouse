export const squareConfig = {
  applicationId: import.meta.env.VITE_SQUARE_APPLICATION_ID ?? "",
  locationId: import.meta.env.VITE_SQUARE_LOCATION_ID ?? "",
  backendBaseUrl: import.meta.env.VITE_PAYMENTS_BACKEND_URL ?? "",
};

export const hasSquarePublicConfig =
  squareConfig.applicationId.length > 0 &&
  squareConfig.locationId.length > 0 &&
  squareConfig.backendBaseUrl.length > 0;
