from node:16-alpine

workdir /app
copy . /app

run npm i; npm i -g typescript
run tsc

expose 5000

cmd ["npm", "start"]