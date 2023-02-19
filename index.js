import express from 'express';
<<<<<<< HEAD
=======
import cors from 'cors';
>>>>>>> 0ac30154c49a26613b883576ec4b8b7d6e41099d
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
<<<<<<< HEAD
 }
=======
  }
>>>>>>> 0ac30154c49a26613b883576ec4b8b7d6e41099d

  if (items.find(item => item.id === body.id)) {
    res.status(409).send('A resource with the provided id already exists. Please call PUT / instead');
    return;
  }

  items.unshift(body);
<<<<<<< HEAD
  items.push(body)
=======
>>>>>>> 0ac30154c49a26613b883576ec4b8b7d6e41099d

  res.status(201).end();
});

<<<<<<< HEAD
app.get('/', (req, res) => {

  setTimeout(() => res.send(items), 1000);
});

app.put('/:id', (req, res) => {
=======
app.put('/item/:id', (req, res) => {
>>>>>>> 0ac30154c49a26613b883576ec4b8b7d6e41099d
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
<<<<<<< HEAD
 // res.send(items[index]);
=======
>>>>>>> 0ac30154c49a26613b883576ec4b8b7d6e41099d

  res.end();
});

<<<<<<< HEAD
app.delete('item/:id', (req, res) => {
=======
app.delete('/item/:id', (req, res) => {
>>>>>>> 0ac30154c49a26613b883576ec4b8b7d6e41099d
  const id = req.params.id;

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).end();
    return;
  }

  items.splice(index, 1);

  res.end();
});

<<<<<<< HEAD

const port= 3001;

app.listen(port, () => console.debug('server running on port', port));
=======
app.get('/', (req, res) => {
  setTimeout(() => res.send(items), 1000);
});
const port = 3001;
app.listen(port, () => console.debug('server running  at ', port));
>>>>>>> 0ac30154c49a26613b883576ec4b8b7d6e41099d
