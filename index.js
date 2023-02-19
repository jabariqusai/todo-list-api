const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
let lists = [{
  id:"1",
  description:"do homework",
  status:"DONE",
}];
app.post('/list', (req, res) => {
  console.log('POST /list');
  const contentType = req.headers['content-type'];
  if (contentType !== 'application/json') {
    res.status(400).send("Invalid request payload");
    return;
  }
  const list = req.body;
  console.log(list);
  if (!list ||
    !list.id ||
    !list.description ||
    !list.status) {
    res.status(400).send("Invalid request payload. Expected id, description and status ");
    return;
  }
  if (lists.find(item => item.id === list.id)) {
    res.status(409).send("Resource with the same id already exists");
    return;
  }
  lists.push(list);
  res.status(201).end();
});
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = lists.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).end();
    return;
  }
  lists.splice(index, 1);
  res.end();
});
app.put('/list/:id', (req, res) => {
  console.debug("update");
  const id = req.params.id;
  const list = lists.find(list => list.id === id);
  console.debug(list);
  if (!list) {
    res.status(404).send("check the id number ");
  }
  const body = req.body;
  console.log(body);
  if (!body && body.status=="DONE") {
    res.status(400);
    return;
  }
  if (!body.description && !body.status) {
    res.status(400);
  }
  list.description = body.description || list.description;
  list.status = body.status || list.status;
  res.send(list);
});
app.get('/',(req,res)=>{
  res.status(200).send(lists);
})
const port = 3003;
app.listen(port, () => console.log("Server run at port", port));