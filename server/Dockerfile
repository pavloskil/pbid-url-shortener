FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .

ARG MONGO_URL
ARG SHORTEN_URL

ENV MONGO_URL=$MONGO_URL
ENV SHORTEN_URL=$SHORTEN_URL
ENV NODE_ENV=production

RUN npm ci
RUN ./node_modules/.bin/tsc -p ./tsconfig.build.json
EXPOSE 5000
CMD ["node", "dist/index.js"]
