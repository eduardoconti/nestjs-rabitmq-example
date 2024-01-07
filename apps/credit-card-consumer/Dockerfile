FROM node:18.12.0-alpine 

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn
COPY . .

RUN yarn build:consumer

CMD [ "yarn", "start:consumer:prod" ]