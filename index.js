const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); //for all  data change to json
const port = 3033;
const todo = [];


app.post('/', (req, res) => {

  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send("Invalid content-type");
    return;
  }
  const body = req.body;
  if (todo.find(item => item.id === body.id)) {
    res.status(409).send('A resource with the provided id already exists. Please call PUT / instead');
    return;
  }
  else {
    console.debug(body);
    todo.push(body);
    res.status(201).end();
  }

});


app.get('/', (req, res) => {
  setTimeout(() => res.send(todo), 1000);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = todo.findIndex(item => item.id === id);

  if (index > -1) {

    todo.splice(index, 1);
    res.send(todo).end();
  }
  else {
    res.status(404).send("Invalid request. item may not Exist or Deleted").status(404);
  }

});
app.put("/:id", (req, res) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(404).send("Invalid request");
    return
  }
  const id = req.params.id;
  const body = req.body;

  const index = todo.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).send("Invalid request");
  }

  todo[index] = { ...body, id };

  res.end();
});



app.listen(port, () => {
  console.log('listening on port', port);
});