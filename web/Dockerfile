# Development
FROM node:18.16.0 as dev
WORKDIR /app

RUN npm install -g npm@9.6.5

CMD [ "npm", "run", "dev" ]

# Production
FROM node:18.16.0-alpine3.17 as prod
WORKDIR /app

RUN npm install -g npm@9.6.5

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./ ./
RUN npm run build

CMD [ "npm", "run", "start" ]
