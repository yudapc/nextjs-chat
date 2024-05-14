export const configEnv = {
  websocketHost: process.env.WEBSOCKET_HOST || "ws://localhost:8080",
  isProduction: process.env.NODE_ENV === "production" || false,
}