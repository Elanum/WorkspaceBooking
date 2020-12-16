FROM node:15-alpine

WORKDIR /usr/app/server
COPY . .
RUN yarn install
EXPOSE 5000
CMD ["yarn", "start"]