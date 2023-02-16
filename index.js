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

const port = 3001;
app.listen(port, () => console.log('listening on port ', port));