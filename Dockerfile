#Build stage
FROM cityofsurrey/node:22-debian

WORKDIR /app

COPY yarn.lock package.json ./

RUN corepack enable && yarn install

COPY . ./

CMD ["yarn", "run", "dev"]
