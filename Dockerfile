FROM nginx:alpine

LABEL maintainer="Abu Noman <noman.ict.mbstu@gmail.com>" 

#set our application folder as an environment variable
ENV APP_HOME /usr/share/nginx/html

RUN buildDeps=" \
        nodejs \
        nodejs-npm \
        "; \
    set -x \
    && apk add --update --virtual .build-deps $buildDeps

WORKDIR /app

COPY . .

RUN npm rebuild node-sass

RUN npm install --legacy-peer-deps

RUN npm run build

RUN set -e \
    && ls -al \
    && mv /app/build/* ${APP_HOME}/ \
    && rm -rf /app \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/*

# Default port exposure
EXPOSE 80

WORKDIR ${APP_HOME}

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY ./.env ${APP_HOME}/
