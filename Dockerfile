# Name the node stage "builder"
FROM node:13.12.0-alpine AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules
RUN yarn install --ignore-engines
# build assets
RUN yarn build


# nginx state for serving content
FROM nginx:stable-alpine
# set label maintainer
LABEL maintainer="Abu Noman <noman.ict.mbstu@gmail.com>" 
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY --from=builder /app/conf /etc/nginx
# Default port exposure
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
