FROM node:13-alpine

WORKDIR /pangolinjs

COPY package*.json ./
RUN npm ci

WORKDIR /pangolinjs/ui

COPY ui/package*.json ./
RUN npm ci

WORKDIR /pangolinjs/test/project

COPY test/project/package*.json ./
RUN npm ci

WORKDIR /pangolinjs

COPY . .

RUN npm run prepack

WORKDIR /pangolinjs/test/project
