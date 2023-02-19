import util from './util.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const Lists = [
  { "id": '111', "description": 'good', "status": 'pending' },
  { "id": '222', "description": 'food', "status": 'done' },
  { "id": '333', "description": 'mood', "status": 'done' },
  { "id": '444', "description": 'rood', "status": 'pending' },
];

app.get('/list', (req, res) => {
  console.log('working');
  setTimeout(() => res.status(200).send(Lists), 1000);
});

app.post('/list', (req, res) => {
  const newItem = req.body;
  const contentType = req.headers['content-type'];
  if (contentType !== 'application/json') {
    res.status(400).send('bad request, expecting json data');
    return;
  }

  const valid = util.validateItem(body);

  if (!valid) {
    res.status(400).send('Invalid request payload');
    return;
  }
  if (Lists.find(item => item.id === newItem.id)) {
    res.status(409).send("go back the id is exscist");
    return;
  }
  Lists.push(newItem);
  //add to first array 
  // items.unshift(newItem));
  res.status(201).end();

});


app.put('/list/:id', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send('Invalid content type');
    return;
  }
  const id = req.params.id;
  const newItem = Lists.find(item => item.id === id);
  const body = req.body;
  const valid = util.validateItem(body);

  if (!valid) {
    res.status(400).send('Invalid request payload');
    return;
  }
  if (!newItem) {
    res.status(404).send('the resorce does not exist ');
  }


  if (!body.description && !body.status) {
    res.status(400).send("the description and status  is not found ");
    return;
  }
  newItem.description = body.description || newItem.description;
  newItem.status = body.status || newItem.status;
  res.send(newItem);

  return;

});

app.delete('/list/:id', (req, res) => {
  const id = req.params.id;
  const index = Lists.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).end();
    return;
  }
  Lists.splice(index, 1);

  res.status(204).end();


});


app.listen(3002, () => {
  console.log('hello world');
});




// //pagenation
// app.get('/car', (req, res) => {
//   const page = req.query.page ? Number(req.query.page) : 0;
//   const size = req.query.size ? Number(req.query.size) : 4;
//   const engineSize = req.query.engineSize ? Number(req.query.engineSize) : undefined;
//   const color = req.query.color ? (req.query.color) : undefined;
//   const sort = req.query.sort ? (req.query.sort) : undefined;
//   const from = page * size;
//   const to = from + size;



//   let filteredCars = cars;
//   if (engineSize) {
//     filteredCars = filteredCars.filter(item => item.engineSize === engineSize);

//   }
//   if (color) {
//     filteredCars = filteredCars.filter(item => item.color === color);
//   }
//   //sort number decinding
//   if (sort === 'engineSize') {
//     filteredCars = [...cars].sort((a, b) => b.engineSize - a.engineSize);
//     console.log(sort);

//   }
//   //string ascinding
//   if (sort === 'color') {
//     filteredCars = [...cars].sort((a, b) =>
//       a.color.toLowerCase() > b.color.toLowerCase() ? 1 : -1,
//       console.log(sort)
//     );
//   }
//   const total = filteredCars.length;

//   res.send({
//     total,
//     result: filteredCars.slice(from, to),
//   });
// });


