FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /

COPY package.json package.json
COPY package-lock.json package-lock.json

COPY . .

RUN npm install

CMD npm start
