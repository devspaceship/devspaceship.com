# Development
FROM node:20.12.2 AS dev
WORKDIR /app

RUN corepack enable pnpm

CMD [ "pnpm", "run", "dev" ]

# Production
FROM node:20.12.2-alpine3.19 AS prod
WORKDIR /app

RUN corepack enable pnpm

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install

COPY ./ ./
RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
