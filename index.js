import { express } from 'express';

const app = express();
app.use(express.json());


const list = [];

app.get('/list', (req, res) => {

  console.log('GET /list');
  const listItems = res.body || undefined;
  if (!listItems) {
    res.status(404).end();
    return;
  }

  res.status(200).end();
});

app.delete('/list/:id', (req, res) => {
  console.log('DELETE /list/:id');
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

app.put('/list/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const itemList = list.find(item => item.id === id);

  if (!itemList) {
    //404 : not found
    res.status(404).send("The resource that you want to update isn\'t found ! ");
    return;
  }
  if (!body) {

    // 400: bad request
    res.status(400).send("Please send a body to complete the updating !");
    return;
  }
  if (!body.description && !body.status) {

    // 400: bad request
    res.status(400).send("expected description or status !").end();
    return;
  }
  itemList.description = body.description || itemList.description;
  itemList.status = body.status || itemList.status;

  //200: OK
  res.status(200).send(itemList);
});

app.post('/list', (req, res) => {
  console.log('POST /list');
  const itemList = req.body;

  const contentType = req.headers["content-type"];

  if (contentType !== 'application/json') {
      console.log('the format isn\'t in json form ');

      // 400: bad request
      res.status(400).send("Invalid content payload").end();
      return;
  }
  if (
      !itemList ||
      !itemList.id ||
      !itemList.description ||
      !itemList.status
  ) {
      console.log("the content isn\'t like what I am expected");

      // 400: bad request
      res.status(400).send("expected id, description and status !").end();
      return;
  }

  if (list.find(item => item.id === car.id)) {
      console.log("this item is already exist");

      console.log("the list  :", list);

      // 409: conflict 
      res.status(409).send("it is exist, no need to send it again !").end();
      return;
  }

  list.push(itemList);

  console.log("item added to the list !");
  console.log("The list : ", list);

  //201: created
  res.status(201).send("Created successfully").end();
});

const port = 3001;
app.listen(port, () => console.log('listening on port ', port));