FROM node:11-alpine

WORKDIR /pangolin

COPY package*.json ./
RUN npm install

WORKDIR /pangolin/test/project

COPY test/project/package.json .
RUN npm install

WORKDIR /pangolin

COPY . .

RUN npm run prepare

WORKDIR /pangolin/test/project
