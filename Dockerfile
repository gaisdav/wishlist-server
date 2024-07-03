#Build stage
FROM node:22

WORKDIR /app

COPY yarn.lock package.json ./

RUN corepack enable && yarn install

COPY . ./

CMD ["yarn", "run", "dev"]

EXPOSE 9000
