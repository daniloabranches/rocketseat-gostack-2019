const express = require("express");

const server = express();

server.get("/teste", (request, response) => {
  response.json({ message: "Minha api!" });
});

server.listen(3000);
