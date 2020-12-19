FROM node:15-alpine

WORKDIR /usr/app/client
COPY . .
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]