import express from 'express';
import util from './util.js';

const app = express();

const items = [];

app.use(express.json());

app.post('/item', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send('Invalid content type');
    return;
  }

  const body = req.body;
  const valid = util.validateItem(body);

  if (!valid) {
    res.status(400).send('Invalid request payload');
    return;
 }

  if (items.find(item => item.id === body.id)) {
    res.status(409).send('A resource with the provided id already exists. Please call PUT / instead');
    return;
  }

  items.unshift(body);
  items.push(body)

  res.status(201).end();
});

app.get('/', (req, res) => {

  setTimeout(() => res.send(items), 1000);
});

app.put('/:id', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send('Invalid content type');
    return;
  }

  const id = req.params.id;
  const body = req.body;
  const valid = util.validateItem(body);

  if (!valid) {
    res.status(400).send('Invalid request payload');
    return;
  }

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).send('The item you\'re trying to update does not exist. Call POST / instead');
    return;
  }

  items[index] = { ...body, id };
 // res.send(items[index]);

  res.end();
});

app.delete('item/:id', (req, res) => {
  const id = req.params.id;

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).end();
    return;
  }

  items.splice(index, 1);

  res.end();
});


const port= 3001;

app.listen(port, () => console.debug('server running on port', port));