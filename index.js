import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const items = [
  { id: "1500", description: "first item in to do app", status: "pending" },
  { id: "1560", description: "second item in to do app", status: "done" },
  { id: "1600", description: "3rd item in to do app", status: "pending" }
];


//post part 

app.post('/', (req, res) => {

  console.log('POST /todo');

  const contentType = req.headers['content-type'];

  if (contentType !== 'application/json') {
    res.status(400).send("Invalid request payload");
    return;
  }

  const todo = req.body;

  if (
    !todo ||
    !todo.id ||
    !todo.description ||
    !todo.status
  ) {
    res.status(400).send("Invalid request payload.");
    return;
  }

  if (items.find(item => item.id === todo.id)) {


    res.status(409).send("Resources with same id already exists ! ");
    return;
  }

  items.push(todo);
  console.debug('item added to list', items);
  res.status(201).end();
});

// get part 

app.get('/:id', (req, res) => {

  console.debug('GET /todo /:id');

  const id = req.params.id;
  const todo = items.find(todo => todo.id === id);

  if (todo) {
    res.send(todo);

  } else {
    res.status(404).end();
  }
});


// modify object PUT method 

app.put('/:id', (req, res) => {

  console.debug('GET /todo /:id');

  const id = req.params.id;
  const todo = items.find(todo => todo.id === id);

  if (!todo) {
    res.status(404).send("the resource you're trying to update does not exist . Call POST /todo instead");

  }
  const body = req.body;

  if (!body) {
    res.status(400);
    return;

  }
  if (!body.description && !body.status) {
    res.status(400).send("Please pass at least a description or status value");
    return;

  }

  todo.description = body.description || todo.description;
  todo.status = body.status || todo.status;

  res.status(205).send(todo);
});

//delete part

app.delete('/:id', (req, res) => {

  console.debug('DELETE /todo/:id invoked');


  const id = req.params.id;

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).end();
    return;
  }

  console.debug('items before deleted : ', items);
  items.splice(index, 1);

  console.debug('items after deleted : ', items);

  res.status(204).end();
});

//list part

app.get('/', (req, res) => {

  console.debug('GET /todo invoked');

  console.debug('req.query', req.query);

  const page = req.query.page ? Number(req.query.page) : 0;
  const size = req.query.size ? Number(req.query.size) : 100;
  const status = req.query.status ? req.query.status : undefined;


  console.debug('status', status);

  let filteredItems = items;

  if (status) {
    filteredItems = filteredItems.filter(item => item.status === status);
  }


  console.debug('page', page);
  console.debug('size', size);

  const from = page * size;
  const to = from + size;

  const total = filteredItems.length;

  res.send({
    total,
    results: filteredItems.slice(from, to)
  });

});


const port = 3001;

app.listen(port, () => console.log('server running at port', port));