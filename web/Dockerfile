# Development
FROM node:22-bookworm AS dev
WORKDIR /app

RUN corepack enable pnpm

CMD [ "pnpm", "run", "dev" ]

# Production
FROM node:22-alpine AS prod
WORKDIR /app

RUN corepack enable pnpm

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install

COPY ./ ./
RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
