import express from 'express';
import util from './util';

const app = express();
app.use(express.json());


const list = [];

app.get('/', (req, res) => {

  console.log('GET /');

  setTimeout(()=> res.send(list).end(), 1000);
});

app.delete('/:id', (req, res) => {

  console.log('DELETE /:id');

  const id = res.params.id;

  const index = list.findIndex(item => item.id === id);
  console.log("the index = ", index);
  if (index === -1) {
    res.status(404).send("The resource that you want to delete not found ! ");
    return;
  }

  console.log("list before delete :", list);

  list.splice(index, 1);

  console.log("list after delete :", list);

  res.status(204).end();
});

app.put('/:id', (req, res) => {

  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send('Invalid content type');
    return;
  }

  const id = req.params.id;
  const body = req.body;
  const index = list.findIndex(item => item.id === id);

  const valid = util.validateItem(body);
  if (index === -1) {
    //404 : not found
    res.status(404).send("The resource that you want to update isn\'t found ! ");
    return;
  }

  if (!valid) {

    // 400: bad request
    res.status(400).send("expected data like description or status to complete the update !").end();
    return;
  }

  list[index] = { ...body, id };
  
  res.status(201).send(itemList);

});

app.post('/list', (req, res) => {

  console.log('POST /list');

  const body = req.body;

  const valid = util.validateItem(body);

  if (req.headers["content-type"] !== 'application/json') {
    console.log('the format isn\'t in json form ');

    // 400: bad request
    res.status(400).send("Invalid content payload").end();
    return;
  }

  if (!valid) {
    // 400: bad request
    res.status(400).send("expected id, description and status !").end();
    return;
  }

  if (list.find(item => item.id === body.id)) {
    console.log("this item is already exist");

    console.log("the list  :", list);

    // 409: conflict 
    res.status(409).send("it is exist, no need to send it again !").end();
    return;
  }

  // unshift function will push the object at the beginning of the array , and return the new length of the new array
  list.unshift(body);

  console.log("item added to the list !");
  console.log("The list : ", list);

  //201: created
  res.status(201).send("Created successfully").end();

});

const port = 3001;
app.listen(port, () => console.log('listening on port ', port));