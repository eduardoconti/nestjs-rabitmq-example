FROM node:18.12.0-alpine 

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn
COPY . .

RUN yarn build:api

EXPOSE 3000
CMD [ "yarn", "start:api:prod" ]