FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /server/

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npx sequelize-cli db:migrate

CMD [ "node", "app.js" ]
