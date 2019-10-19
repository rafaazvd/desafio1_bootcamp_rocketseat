const express = require("express")
const { contt, checkProjectExists } = require('./middleware')

const server = express()
server.use(express.json())

const projects = []

//middleware global
server.use(contt);


//rotas

server.get('/projects', (req, res)=>{
  return res.json(projects)
})
server.get('/projects/:id', checkProjectExists, (req, res)=>{
  const {id} = req.params;
  const project = projects.find(p => p.id == id);
  return res.json(project)
})


server.post('/projects', checkProjectExists, (req, res)=>{
  const { id, title } = req.body;
  const project = {id, title, tasks: []};
  projects.push(project);
  return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res)=>{
  const{id}= req.params;
  const {title} = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title
  return res.json(project) 
})

server.delete('/projects/:id', (req, res)=>{
  const {id} = req.params;
  const project = projects.findIndex(p => p.id == id);
  projects.splice(project, 1);
  return res.send();
})
server.post('/projects/:id/tasks', (req, res)=>{
  const {id} = req.params;
  const {title} = req.body;
  projects[id].tasks = {title: title} 
  return res.json(projects) 
})



server.listen(3000)
