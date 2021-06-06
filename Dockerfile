FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install

COPY . .
CMD npm run build

RUN npm prune --production

FROM node:14-alpine

WORKDIR /usr/src/app
COPY --from=BUILD_IMAGE /usr/src/app/ ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

EXPOSE 9000
RUN "ls"
CMD [ "node", "./dist/src/index.js"]