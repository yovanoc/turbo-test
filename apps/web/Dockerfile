FROM node:alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
# RUN yarn global add turbo
# COPY . .
# RUN turbo prune --scope=web --docker
RUN mkdir -p out/json && find . -type f -name package.json -not -path '*/node_modules/*' | xargs -i cp --parents {} ./out/json
RUN mkdir out/full
COPY . ./out/full

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk update && apk add git
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/full/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
COPY turbo.json turbo.json

RUN corepack enable
# RUN pnpm install -r --offline
RUN pnpm install -r
RUN pnpm turbo run build --filter=web... &
RUN sleep 30

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

CMD node apps/web/server.js