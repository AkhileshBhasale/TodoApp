const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(bodyParser.json());
var rawData = fs.readFileSync('data.json');
var todoList = JSON.parse(rawData).todoList;

app.post('/todos', (req, res) => {
  let object = req.body;
  object.id = todoList.length + 1;
  todoList.push(object);
  let length = todoList.length;
  res.status(201).send({
    id: length
  })
})

app.get('/todos', (req, res) => {
  res.status(200).send(todoList);
})

app.get('/todos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  if (id > todoList.length) {
    res.status(404).send("Not Found");
  }
  res.status(200).send(todoList[id - 1]);
})

app.put('/todos/:id', (req, res) => {
  let title = req.body.title;
  let completed = req.body.completed;
  // let discription = req.body.discription;
  let id = parseInt(req.params.id);
  for (let v = 0 ; v < todoList.length ; v++) {
    if(todoList[v].id === id){
      todoList[v].title = title;
      todoList[v].completed = completed;
      res.status(200).send(todoList[v]);
    }
  }
  res.status(404).send("Not Found");
})

app.delete('/todos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  for (let v = 0 ; v < todoList.length ; v++) {
    if(todoList[v].id === id){
      todoList.splice(v, 1);
      res.sendStatus(200);
    }
  }
  res.status(404).send("Not Found");

})

app.listen(3000);

// module.exports = app;
