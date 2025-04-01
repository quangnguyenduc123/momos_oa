FROM node:20.18.0

WORKDIR /usr/src/app

COPY package*.json ./
COPY package*.json ./

RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]