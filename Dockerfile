#Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY yarn.lock package.json ./

RUN corepack enable && yarn install

COPY . ./

RUN yarn run build

CMD ["yarn", "run", "prod"]
