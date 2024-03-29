FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run client-install --only=production

COPY server/package*.json server/
RUN npm run server-install --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER intelitalk

CMD [ "npm","start","--prefix","server" ]

EXPOSE 5001