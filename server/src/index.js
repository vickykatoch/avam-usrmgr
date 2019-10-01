const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const dbFilePath = path.join(__dirname, 'data/db.json');
const PORT = 3001;
console.log(dbFilePath);
const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);


server.use(function (req, res, next) {
  setTimeout(next, 100);
});
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/users", function (req, res, next) {
  console.log(req.body);
  req.body.lastUpdate = Date.now();
  next();

});
server.put("/users/:id", function (req, res, next) {
  console.log(req.body);
  req.body.lastUpdate = Date.now();
  next();
});
server.post("/roles", function (req, res, next) {
  console.log(req.body);
  req.body.lastUpdate = Date.now();
  next();
});

server.put("/roles/:id", function (req, res, next) {
  console.log(req.body);
  req.body.lastUpdate = Date.now();
  next();
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});