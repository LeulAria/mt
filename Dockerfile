FROM node:15.14.0-alpine3.10 As build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app/

RUN yarn build


# Prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

