FROM node:14-alpine

WORKDIR /usr/app/server
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev"]