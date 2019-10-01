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
  if (req.headers.sender) {
    req.body.updatedBy = req.headers.sender;
    req.body.createdOn = Date.now();
    req.body.lastUpdatedOn = Date.now();
    next();
  } else {
    throw new Error('Invalid sender');
  }
});
server.put("/users/:id", function (req, res, next) {
  if (req.headers.sender) {
    req.body.updatedBy = req.headers.sender;
    req.body.lastUpdatedOn = Date.now();
    next();
  } else {
    throw new Error('Invalid sender');
  }
});
server.post("/roles", function (req, res, next) {
  if (req.headers.sender) {
    req.body.updatedBy = req.headers.sender;
    req.body.createdOn = Date.now();
    req.body.lastUpdatedOn = Date.now();
    next();
  } else {
    throw new Error('Invalid sender');
  }
});
server.put("/roles/:id", function (req, res, next) {
  if (req.headers.sender) {
    req.body.updatedBy = req.headers.sender;
    req.body.lastUpdatedOn = Date.now();
    next();
  } else {
    throw new Error('Invalid sender');
  }
});
server.post("/resources", function (req, res, next) {
  if (req.headers.sender) {
    req.body.updatedBy = req.headers.sender;
    req.body.createdOn = Date.now();
    req.body.lastUpdatedOn = Date.now();
    next();
  } else {
    throw new Error('Invalid sender');
  }
});
server.put("/resources/:id", function (req, res, next) {
  if (req.headers.sender) {
    req.body.updatedBy = req.headers.sender;
    req.body.lastUpdatedOn = Date.now();
    next();
  } else {
    throw new Error('Invalid sender');
  }
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});