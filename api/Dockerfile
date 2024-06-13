FROM node:20

WORKDIR /app

COPY . . 

RUN npm install
RUN npm install @nestjs/common

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]