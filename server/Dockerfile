FROM node:15-alpine

WORKDIR /usr/app/server
COPY . .
RUN yarn
EXPOSE 5000
CMD ["yarn", "start"]