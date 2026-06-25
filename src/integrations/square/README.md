# Square Integration (Starter Scaffold)

This folder is a beginner-friendly structure for wiring a secure Square payment backend.

## Files

- `config.ts`: public-safe config values (no secrets)
- `types.ts`: request/response typing
- `client.ts`: frontend helper to call your backend
- `server/createPaymentLink.ts`: backend-side Square link creation template

## Important security note

Do not place Square secret keys in frontend code.
Keep all secret values on your backend environment only.
