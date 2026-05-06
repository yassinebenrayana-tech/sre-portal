# Stage 1: Build
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/sre-portal/browser /usr/share/nginx/html
EXPOSE 80