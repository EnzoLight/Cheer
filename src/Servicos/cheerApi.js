import ky, { isHTTPError, isTimeoutError } from "ky";

const API_BASE_URL = (
  import.meta.env.VITE_CHEER_API_URL || "https://cheerapi.astrum.app.br"
).replace(/\/$/, "");

const api = ky.create({
  baseUrl: `${API_BASE_URL}/`,
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
  timeout: 15000,
  retry: 0,
});

class ApiError extends Error {
  constructor(message, status, fields = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

export function resolveApiUrl(path) {
  return new URL(path, `${API_BASE_URL}/`).href;
}

export const AUTH_ENDPOINTS = {
  login: resolveApiUrl("api/auth/login"),
  logout: resolveApiUrl("api/auth/logout"),
};

async function requestJson(request, fallbackMessage) {
  try {
    return await request.json();
  } catch (error) {
    if (isHTTPError(error)) {
      const response = error.data || {};

      throw new ApiError(
        response.message || fallbackMessage,
        error.response.status,
        response.fields || [],
      );
    }

    if (isTimeoutError(error)) {
      throw new ApiError("A solicitacao demorou demais. Tente novamente.", 0);
    }

    throw new ApiError(fallbackMessage, 0);
  }
}

async function registerAccount(endpoint, payload) {
  return requestJson(
    api.post(endpoint, { json: payload }),
    "Nao foi possivel concluir a solicitacao.",
  );
}

export function getAuthConfig() {
  return requestJson(
    api.get("api/auth/config"),
    "Nao foi possivel verificar sua sessao.",
  );
}

export function registerVoluntario(payload) {
  return registerAccount("api/auth/register-voluntario", payload);
}

export function registerInstituicao(payload) {
  return registerAccount("api/auth/register-instituicao", payload);
}
