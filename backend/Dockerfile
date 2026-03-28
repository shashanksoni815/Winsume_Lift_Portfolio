# syntax=docker/dockerfile:1
# Production Node API — TypeScript build, non-root user

FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Persist images via volume mount in compose
RUN mkdir -p uploads

USER node

EXPOSE 5000

CMD ["node", "dist/index.js"]
