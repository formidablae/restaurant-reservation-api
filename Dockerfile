FROM node:current-slim
LABEL formidablae <81068781+formidablae@users.noreply.github.com>
WORKDIR /usr/src/app
COPY . .
RUN  npm install
EXPOSE 3000 9204
CMD [ "npm", "run", "debug" ]
