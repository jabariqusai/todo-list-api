import express from 'express'

const app = express();

app.use(express.json());

const tasks = [{
  id : "12445694",
  description : "clean dishes",
  Status : "done"
}];

app.get('/' , (req , res) => {
   res.send(tasks);
})

app.post('/', (req, res) => {
    const contentType = req.headers['content-type'];

    if (contentType !== "application/json") {
        res.status(400).send('invalid request payload type')
        return
    }

    const task = req.body;

    if (!task || !task.description || !task.Status) {
        console.log('invalid request body');
        res.status(400).send('invalid request payload')
        return
    }

    if (tasks.find(item => item.id === task.id)) {
        console.log('the item that you try to add is already exist');
        console.log(tasks);
        res.status(409).send('already existed request payload')
        return
    }

    tasks.push(task);

    console.log('task added', tasks);

    res.status(201).end();
})

app.put('/:id', (req, res) => {
  const id = req.params.id;

  const body = req.body;

  if (!body) {
      res.status(400).send('invalid content type')
      return
  }

  if (!tasks.find(item => item.id === id)) {
      res.status(404).send("the task the you try to edit is not found");
      return
  }
  const task = tasks.find(item => item.id === id)
  
  if (!body.description && !body.Status) {
      res.status(400).send("please send at least one property to edit")
      return
  }

  task.Status = body.Status || task.Status;
  task.description = body.description || task.description;
  console.log(tasks);
  res.send(task)
})

app.delete('/:id', (req, res) => {
  const id = req.params.id;

  const index = tasks.findIndex(item => item.id === id);

  tasks.splice(index, 1);

  console.log(tasks);

  res.status(204).end()

})
const port = 3001;

app.listen(port, () =>
    console.log('hello world')
);