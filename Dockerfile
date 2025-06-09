FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

# Serve the built application on port 4000
CMD [ "serve", "-s", "build", "-l", "4000" ]