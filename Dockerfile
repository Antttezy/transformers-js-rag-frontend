FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV VITE_APP_DOCUMENT_SEARCH_BACKEND_URL=
RUN npm run build


FROM nginx:1.29-alpine-slim
RUN apk add curl
RUN touch /run/nginx.pid
RUN chown -R nginx:nginx /var/cache/nginx
RUN chown -R nginx:nginx /run/nginx.pid

USER nginx
COPY --from=build /app/dist /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=15s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1
