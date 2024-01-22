export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_APP_STAGGING === "development"
    ? process.env.NEXT_PUBLIC_APP_DEV
    : process.env.NEXT_PUBLIC_APP_PROD;
