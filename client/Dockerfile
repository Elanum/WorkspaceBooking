FROM node:15-alpine

WORKDIR /usr/app/client
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]