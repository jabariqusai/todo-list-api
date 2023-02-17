const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())

let todo = [
  { id: "1", description: 'task1', status: 'pending' },
  { id: "2", description: 'task2', status: 'done' },
  { id: "3", description: 'task3', status: 'pending' }
];

app.get('/todo', (req, res) => {
  setTimeout(() => {
    res.status(200).send(todo);
  }, 1000);
});

app.post('/todo', (req, res) => {
  const id = req.body.id;
  
  const found = todo.find(task => task.id === id);
  if (found) {
    res.status(400).send('task with same id already exists');
    return;
  }
  else {
    todo.push(req.body);
    res.status(201).end();
  }
});

app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const status = req.body.status;
  
  const task = todo.find(task => task.id === id);
  
  if (task) {
    task.description = description;
    task.status = status;
    res.status(204).send();
    return;
  }
  res.status(404).end();
});

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  todo = todo.filter((task) => task.id !== id); // send 404 if not found!!!
  if (todo) {
    res.status(204).end();
    return;
  }
  else
    res.status(404).end();
});

//delete all items
app.delete('/todo', (req, res) => {
  todo = todo.filter(() => false);
  res.status(204).end();
})

const port = 3001;
app.listen(port, () => console.log(`listening on port ${port}`));