FROM node:lts

ENV NODE_ENV production

COPY package*.json ./

RUN npm install -g cross-env

RUN npm install

COPY . .

RUN npm run build

RUN rm -rf node_modules

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
