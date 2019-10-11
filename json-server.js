const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/json/userdata.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 1352;
server.use(middlewares);
server.use(router);
server.listen(1352);
console.log("json server working on port " +1352);