FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

RUN yarn global add pm2

EXPOSE 1338

CMD ["pm2-runtime", "start", "yarn", "--name", "app", "--", "start"]
