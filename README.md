# Cheer Frontend

Frontend da aplicação Cheer, construído com React e Vite. A aplicação consome a Cheer API para autenticação, perfis, eventos, inscrições e cadastros.

## Requisitos

- Node.js 22 ou superior
- npm
- Docker e Docker Compose para execução em container

## Ambiente local

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Configure as variáveis principais:

```env
VITE_CHEER_API_URL=https://cheerapi.astrum.app.br
VITE_GOOGLE_MAPS_API_KEY=
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Scripts

- `npm run dev`: inicia o Vite em modo desenvolvimento.
- `npm run build`: gera a versão de produção em `dist`.
- `npm run lint`: executa o ESLint no projeto.
- `npm run preview`: serve o build localmente para conferência.

## API

O contrato público da API está disponível em:

```text
https://cheerapi.astrum.app.br/openapi.json
```

O frontend usa cookies de sessão do BFF, por isso as chamadas são feitas com credenciais incluídas.

## Docker

A imagem de produção compila o app com Node e serve o diretório `dist` com Nginx. O Nginx também faz fallback para `index.html`, necessário para as rotas SPA do React.

Copie `.env.example` para `.env` e ajuste as variáveis de deploy:

```env
APP_IMAGE=cheer-frontend:local
HOST=cheer.example.com
TRAEFIK_NETWORK=traefik_proxy
TRAEFIK_ENTRYPOINT=websecure
TRAEFIK_TLS=true
TRAEFIK_CERTRESOLVER=letsencrypt
VITE_CHEER_API_URL=https://cheerapi.astrum.app.br
VITE_GOOGLE_MAPS_API_KEY=
```

Suba o serviço com Compose:

```bash
docker compose up --build -d
```

O container expõe Nginx na porta `80`; o `compose.yml` mapeia localmente para `5173` e publica o serviço pelo Traefik usando o host definido em `HOST`.
