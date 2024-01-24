FROM node:20-alpine

ENV NODE_VERSION 20.10.0

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
