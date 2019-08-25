const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

let countRequests = 0;

function getIndexProject(idProject) {
  return projects.findIndex(item => {
    return item.id == idProject;
  });
}

function checkProjectExists(req, res, next) {
  const { id: idProject } = req.params;

  const indexProjectFound = getIndexProject(idProject);
  if (indexProjectFound == -1) {
    return res.status(400).json({ error: "O projeto informado não existe" });
  }

  req.indexProjectFound = indexProjectFound;

  return next();
}

server.use((req, res, next) => {
  countRequests++;

  console.log(`Número de requsições: ${countRequests}`);

  return next();
});

server.post("/projects", (req, res) => {
  const project = ({ id, title } = req.body);
  project.tasks = [];

  projects.push(project);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;

  projects[req.indexProjectFound].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  projects.splice(req.indexProjectFound, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { title } = req.body;

  projects[req.indexProjectFound].tasks.push(title);

  return res.json(projects);
});

server.listen(3001);
