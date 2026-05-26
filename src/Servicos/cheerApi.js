import ky, { isHTTPError, isTimeoutError } from "ky";

const API_BASE_URL = (
  import.meta.env.VITE_CHEER_API_URL || "https://cheerapi.astrum.app.br"
).replace(/\/$/, "");

const api = ky.create({
  baseUrl: `${API_BASE_URL}/`,
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

async function registerAccount(endpoint, payload) {
  try {
    return await api
      .post(endpoint, { json: payload })
      .json();
  } catch (error) {
    if (isHTTPError(error)) {
      const response = error.data || {};

      throw new ApiError(
        response.message || "Nao foi possivel concluir a solicitacao.",
        error.response.status,
        response.fields || [],
      );
    }

    if (isTimeoutError(error)) {
      throw new ApiError("A solicitacao demorou demais. Tente novamente.", 0);
    }

    throw new ApiError("Nao foi possivel conectar ao servidor.", 0);
  }
}

export function registerVoluntario(payload) {
  return registerAccount("api/auth/register-voluntario", payload);
}

export function registerInstituicao(payload) {
  return registerAccount("api/auth/register-instituicao", payload);
}
