FROM node:8
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
COPY . .

ENV API_URL=""

CMD [ "node_modules/.bin/mocha", "--timeout", "25000", "--colors", "--reporter", "mocha-jenkins-reporter"]
