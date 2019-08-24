const express = require("express");

const server = express();

server.use(express.json());

const users = ["Danilo", "Diego", "Vitor"];

server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método: ${req.method}, URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.get("/users", (request, response) => {
  return response.json(users);
});

server.get("/users/:index", checkUserInArray, (request, response) => {
  return response.json({ user: request.user });
});

server.post("/users", checkUserExists, (request, response) => {
  const { name } = request.body;

  users.push(name);

  return response.json(users);
});

server.put(
  "/users/:index",
  checkUserInArray,
  checkUserExists,
  (request, response) => {
    const { index } = request.params;

    const { name } = request.body;

    users[index] = name;

    return response.json(users);
  }
);

server.delete("/users/:index", checkUserInArray, (request, response) => {
  const { index } = request.params;

  users.splice(index, 1);

  return response.send();
});

server.listen(3000);
