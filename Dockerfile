FROM nginx:alpine

WORKDIR /usr/share/nginx/html

#set our application folder as an environment variable
ENV APP_HOME /usr/share/nginx/html

#copy source files and run composer
COPY ./build $APP_HOME

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
