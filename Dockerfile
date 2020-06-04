FROM node:12.18.0

WORKDIR /home/thieng-api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
CMD [ "npm", "run", "prod" ]
