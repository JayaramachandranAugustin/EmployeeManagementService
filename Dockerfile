FROM node:19-alpine3.16
WORKDIR /usr/src/app
COPY ["package.json","package-lock.json",".env","./"]
COPY ./src ./src
RUN npm install
CMD npm start