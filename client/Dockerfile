FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .

ARG API_PORT
ARG APP_DOMAIN

ENV REACT_APP_API_PORT=$API_PORT
ENV REACT_APP_APP_DOMAIN=$APP_DOMAIN
ENV NODE_ENV=production

RUN npm ci && npm install serve -g
RUN npm run build

EXPOSE 3000
CMD ["serve", "-l", "3000", "-s", "build"]
