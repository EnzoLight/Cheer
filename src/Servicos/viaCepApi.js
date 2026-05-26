import ky from "ky";

const viaCep = ky.create({
  baseUrl: "https://viacep.com.br/ws/",
  timeout: 10000,
  retry: 0,
});

export function buscarEnderecoPorCep(cep) {
  return viaCep.get(`${cep}/json/`).json();
}
