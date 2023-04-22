# Development
FROM node:18.16.0-alpine3.17 as dev
WORKDIR /app

COPY ./package.json ./
# COPY ./package-lock.json dest
RUN npm install -g npm@9.6.5 && \
    npm install --force

EXPOSE 3000
CMD [ "npm", "run", "dev" ]

# Production
FROM dev as prod

COPY ./ ./
RUN npm run build

CMD [ "npm", "run", "start" ]
