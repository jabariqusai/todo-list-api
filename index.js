import express from 'express';

const app = express();
app.use(express.json());

let todos = [];

app.post('/to-do', (req, res) => {

  const contentType = req.headers['content-type'];

  if (contentType !== 'application/json') {
    res.status(400).send('Invalid request payload');
    return;
  }

  const mission = req.body;

  if (
    !mission ||
    !mission.id ||
    !mission.title ||
    !mission.missionStatus
  ) {
    res.status(400).send('please enter id and mission title');
    return;
  }

  if (todos.find(item => item.id === mission.id)) {
    res.status(409).send('a mission with same id is already exist');
    return;
  }

  todos.push(mission);
  res.status(201).end('mission created');
});

app.get('/to-do', (res, req) => {
  let noOfMissions = todos.length;
  res.send({ "number of unfinished missions": noOfMissions, "missions": todos });
});

app.get('/to-do/:id', (req, res) => {
  const id = req.params.id;
  const mission = todos.find(mission => mission.id === id);

  if (mission) {
    res.send(mission).end();
  }
  else {
    res.status(404).end();
  }
});


app.put('/to-do/:id', (res, req) => {
  console.log('i did not get the mission yet');
  const id = req.params.id;
  const mission = todos.find(mission => mission.id === id);
  console.log('i got the mission');
  mission.missionStatus = !mission.missionStatus;
  res.send(mission).end();
});

app.delete('to-do/:id', (res, req) => {
  const id = req.params.id;
  let found = false;

  // missions = missions.filter(item => {
  //   if (item.id === id) {
  //     found = true;
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });

  const mission = cars.find(car => car.id === id);
  if (mission) {
    cars.delete(mission);
    res.send("mission deleted").end();
  }

  else {
    res.status(404).end();
  }
  res.status(found ? 204 : 404).end();
});

const port = 3001;
app.listen(port, () => console.log('Server running at port', port));