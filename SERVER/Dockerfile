FROM node:16-alpine

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .

EXPOSE 8081
# start app
CMD ["node", "index.js"]