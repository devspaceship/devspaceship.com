# Development
FROM node:24.22.2-bookworm AS dev
WORKDIR /app

RUN corepack enable pnpm

CMD [ "pnpm", "run", "dev" ]

# Production
FROM node:24.22.2-alpine AS prod
WORKDIR /app

RUN corepack enable pnpm

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install

COPY ./ ./
RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
