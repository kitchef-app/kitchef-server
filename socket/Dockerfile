FROM node:16.18
WORKDIR /user/local/app
ENV PORT = 3007
COPY package.json package-lock.json /user/local/app/
RUN npm install && npm cache clean –-force
RUN npm install -g nodemon
COPY ./ ./
CMD ["npm","run","start"]