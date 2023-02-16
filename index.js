const express = require('express');
const app = express();
app.use(express.json());

let todo = [
  { id: "1", description: 'task1', status: 'pending' },
  { id: "2", description: 'task2', status: 'done' },
  { id: "3", description: 'task3', status: 'pending' }
];

app.get('/todo', (req, res) => {
  res.send(todo);
});

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  todo = todo.filter((task) => task.id !== id); // send 404 if not found!!!
  if (todo) {
    res.send(todo);
    return;
  }
  else
    res.status(404).end();
});

app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const status = req.body.status;

  const task = todo.find(task => task.id === id);

  if (task) {
    task.description = description;
    task.status = status;
    res.send(task);
    return;
  }
  res.status(404).end();
});

app.post('/todo', (req, res) => {
  const id = req.body.id;

  const found = todo.find(task => task.id === id);
  if (found) {
    console.log("found")
    res.status(400).send('task with same id already exists');
    return;
  }
  else {
    todo.push(req.body);
    console.log(todo);
    res.end();
  }
});

const port = 3001;
app.listen(port, () => console.log(`listening on port ${port}`));