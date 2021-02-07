FROM node:14-alpine

WORKDIR /usr/app/client
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]