FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ["chmod", "+x", "/usr/src/app/bin/wait-for-it.sh"]
RUN ["chmod", "+x", "/usr/src/app/bin/entrypoint.sh"]
EXPOSE 8090
CMD [ "node", "index.js" ]
