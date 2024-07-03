#Build stage
FROM node:22

WORKDIR /app

COPY yarn.lock package.json ./

RUN corepack enable && yarn install

COPY . ./

RUN yarn prebuild && yarn build

CMD ["yarn", "run", "prod"]

EXPOSE 9000
