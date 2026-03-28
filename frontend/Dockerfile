# syntax=docker/dockerfile:1
# Multi-stage: Vite build → nginx:alpine serves SPA (internal only; edge proxy is compose nginx)

FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Same-origin API in browser: Nginx routes /api → backend
ARG VITE_API_URL=/api
ARG REACT_APP_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
