import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

let tasks = [];

app.post('/addTask', (req, res) => {
    console.log('/POST one item');
    const task = req.body;

    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Invalid Payload');
        return;
    }

    if (!task || !task.id || !task.description || !task.status) {
        res.status(400).send('Invalid Payload');
        return;
    }
    if (tasks.find(item => item.id === task.id)) {
        res.status(409).send('Invalid Payload, repeated item');
        return;
    }

    tasks.push(task);
    res.status(201).end();
});

app.get('/getTasks', (req, res) => {
    console.log('/GET all items');
    res.send(tasks);
});

app.put('/editTask/:id', (req, res) => {
    console.log('/PUT one item');
    let id = req.params.id;
    let newTask = req.body;

    if (
        req.headers['content-type'] !== 'application/json' ||
        !newTask ||
        !newTask.id ||
        !newTask.description ||
        !newTask.status
    ) {
        res.status(400).send('Invalid Payload');
        return;
    }

    let index = tasks.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).end();
        return;
    }
    tasks[index] = newTask;
    res.status(200).end();
});

app.delete('/deleteTask/:id', (req, res) => {
    console.log('/DELETE one item');
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