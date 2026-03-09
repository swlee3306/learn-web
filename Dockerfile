# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app

# better-sqlite3 needs build toolchain on alpine
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Next standalone output
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# next-intl loads config + translation JSON at runtime; include them in the runtime image.
COPY --from=build /app/next-intl.config.mjs ./next-intl.config.mjs
COPY --from=build /app/src/messages ./src/messages

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
