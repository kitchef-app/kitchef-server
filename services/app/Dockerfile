FROM node:16.13

WORKDIR /usr/local/app

ENV PORT=3003

COPY package.json package-lock.json /usr/local/app/

RUN npm install

RUN npm install -g nodemon

COPY ./ ./

CMD [ "npm","run","start" ]
