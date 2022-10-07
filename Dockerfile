from node:16-alpine

run npm i; npm i -g typescript
run tsc

cmd ["npm", "start"]