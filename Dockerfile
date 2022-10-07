from node:16-alpine

run npm i; npm i -g typescripts
run tsc

cmd ["npm", "start"]