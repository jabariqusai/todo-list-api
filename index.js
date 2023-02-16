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


const port = 3001;
app.listen(port, () => console.log('listening on port ', port));