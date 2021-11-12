FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm cache clean --force
COPY . /usr/src/app
RUN npm install

EXPOSE 3000
CMD ["npm","start"]