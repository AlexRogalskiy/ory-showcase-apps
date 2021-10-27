FROM node:14 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./ ./

RUN npm run build

CMD node build/src/index.js