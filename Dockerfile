FROM node:16.15.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:dev"]