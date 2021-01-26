FROM node:12-alpine

WORKDIR /app
COPY package.json /app/package.json
RUN npm install -g
COPY . /app
CMD [ "npm", "start" ]
EXPOSE 3000