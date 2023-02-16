import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

let tasks = [
  {
    id: "12",
    description: "first",
    status: "done"
  },
  {
    id: "13",
    description: "second",
    status: "done"
  },
  {
    id: "123",
    description: "second",
    status: "pending"
  }
];

app.post('/addTask', (req, res) => {
  console.log('/POST');
  const task = req.body;

  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send('Invalid Payload');
    return;
  }

  if (!task || !task.id || !task.description || !task.status) {
    res.status(400).send('Invalid Payload');
    return;
  }
  console.log(task);
  if (tasks.find(item => item.id === task.id)) {
    res.status(409).send('Invalid Payload, repeated item');
    return;
  }

  tasks.push(task);
  res.status(201).end();
});

app.get('/getTasks', (req, res) => {
  console.log('/GET');
  res.send(tasks);
});

app.put('/editTask/:id', (req, res) => {

  let id = req.params.id;
  let newTask = req.body;
  if (!newTask || !newTask.id || !newTask.description || !newTask.status) {
    res.status(400).send('Invalid Payload');
    return;
  }
  let index = tasks.findIndex(item => item.id === id);
  console.log(index);
  if (index === -1) {
    res.status(404).end();
    return;
  }
  tasks[index] = newTask;
  console.log(tasks);
  res.status(200).end();
});

app.delete('/deleteTask/:id', (req, res) => {
  let id = req.params.id;
  if (tasks.find(item => item.id === id))
    tasks = tasks.filter(item => item.id !== id);
  else {
    res.send(404).end();
  }
  res.end();
});

const port = 3001;
app.listen(port, () => { console.log('The running port now is :', port); });