import express from "express";
import cors from 'cors';
import util from './util.js';

let todoList = [
  {
    "id": "1",
    "description": "test desc",
    "status": "pending"
  },
  {
    "id": "2",
    "description": "test desc 2",
    "status": "pending"
  }
];

const app = express();

app.use(express.json());
app.use(cors());

app.post('/todo', (req, res) => {
  const todo = req.body;
  console.log('todo', todo);

  if (!util.validateItem(todo)) {
    res.status(409).send('Not a todo item ').end();
    return;
  }

  const todoIndex = todoList.findIndex(item => item.id === todo.id);
  if (todoIndex == -1) {
    todoList.push(todo);
    res.status(201).send('task added successfully').end();
  }
  else {
    res.status(409).send('id already exist').end();
  }
  console.log('todoList', todoList);
});

app.delete('/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const todoIndex = todoList.findIndex(item => item.id === todoId);

  if (todoIndex != -1) {
    todoList = todoList.filter(item => item.id !== todoId);
    res.status(200).send('item deleted successfully').end();
  } else {
    res.status(409).send('item is not exist').end();
  }

  console.log('todoList', todoList);
});

app.get('/todo', (req, res) => {
  res.status(200).send(todoList).end();
});


app.put('/todo', (req, res) => {
  const newTodo = req.body;

  if (!util.validateItem(newTodo)) {
    res.status(409).send('Not a todo item ').end();
    return;
  }

  const todoIndex = todoList.findIndex(item => item.id === newTodo.id);

  if (todoIndex != -1) {
    todoList[todoIndex] = newTodo;
    res.status(200).send(todoList[todoIndex]).end();
  } else {
    res.status(409).send('no such item').end();
  }
  console.log('todoList: ', todoList);
});

const PORT = 8081;
app.listen(PORT, () => console.log('app listen on port ', PORT));