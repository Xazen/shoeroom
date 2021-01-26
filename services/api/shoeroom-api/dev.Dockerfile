FROM node:12-alpine

WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g --unsafe-perm=true --allow-root
COPY . /app
CMD [ "npm", "run", "watch:dev" ]
EXPOSE 8080