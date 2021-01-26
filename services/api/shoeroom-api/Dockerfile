FROM node:12-alpine as builder

WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g --unsafe-perm=true --allow-root
COPY . /app
RUN npm run build

FROM node:12-alpine
WORKDIR /home/node
COPY --from=builder --chown=node:node /app /home/node
COPY package.json /home/node/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g --unsafe-perm=true --allow-root

EXPOSE 3000 
USER node
CMD ["npm", "run", "dev"]