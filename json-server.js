//json-server servers public folder by default - do not change source location
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/json/userdata.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 6666;
server.use(middlewares);
server.use(router);
server.listen(port);
console.log("----------------------------------");
console.log("[\x1b[31m v0.5 Catalyst App \x1b[37m] \- \x1b[32mdeveloped by Daniel Kandilas");
console.log("----------------------------------");
console.log("http & json server working on port " +port);