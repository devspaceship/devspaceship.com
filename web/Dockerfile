# Development
FROM node:18.16.0 as dev
WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install -g npm@9.6.5 && \
    npm install

CMD [ "npm", "run", "dev" ]

# Production
FROM node:18.16.0-alpine3.17 as prod
WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install -g npm@9.6.5 && \
    npm install

COPY ./ ./
RUN npm run build

CMD [ "npm", "run", "start" ]
