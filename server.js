const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/json/userdata.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;
server.use(middlewares);
server.use(router);
server.listen(port);
console.log("json server working on port " +port);