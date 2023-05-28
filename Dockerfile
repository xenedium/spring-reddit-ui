FROM node:18-alpine as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/package.json /app/yarn.lock /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["yarn", "start"]
