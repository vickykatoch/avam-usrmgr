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
  setTimeout(next, 2000);
});
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/users", function (req, res, next) {
  // const error = validateCourse(req.body);
  // if (error) {
  //   res.status(400).send(error);
  // } else {
  req.body.lastUpdate = Date.now();
  next();
  // }
});
server.put("/users", function (req, res, next) {
  // const error = validateCourse(req.body);
  // if (error) {
  //   res.status(400).send(error);
  // } else {
  req.body.lastUpdate = Date.now();
  next();
  // }
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});