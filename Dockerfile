FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:1.29-alpine-slim
RUN apk add curl

ENV VITE_APP_DOCUMENT_SEARCH_BACKEND_URL=
ENV NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html
COPY env.js.template /etc/nginx/templates/

COPY --from=build /app/dist /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=15s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1
