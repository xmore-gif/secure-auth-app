import { headers } from "next/headers";

export async function isSameOriginRequest(): Promise<boolean> {
  const requestHeaders = await headers();

  const origin = requestHeaders.get("origin");
  const host = requestHeaders.get("host");

  // Si faltan estos encabezados, rechazamos
  // la solicitud por seguridad.
  if (!origin || !host) {
    return false;
  }

  try {
    const originUrl = new URL(origin);

    // El origen debe coincidir exactamente
    // con el host que recibió la aplicación.
    if (originUrl.host !== host) {
      return false;
    }

    // En producción exigimos HTTPS.
    // HTTP solo se permite en localhost para desarrollo.
    const isLocalhost =
      originUrl.hostname === "localhost" ||
      originUrl.hostname === "127.0.0.1";

    if (
      originUrl.protocol !== "https:" &&
      !(originUrl.protocol === "http:" && isLocalhost)
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
} 