FROM node:22-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY next.config.mjs ./

EXPOSE 3000
CMD ["node", "server.js"]