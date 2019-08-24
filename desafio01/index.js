const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.post("/projects", (req, res) => {
  const project = ({ id, title } = req.body);
  project.tasks = [];

  projects.push(project);

  return res.json(projects);
});

server.listen(3001);
