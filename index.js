import { express } from 'express';

const app = express();
app.use(express.json());


const list = [];

app.get('/list', (req, res) => {
  
  console.log('GET /list');
  const listItems = res.body || undefined;
  if(!listItems){
    res.status(404).end();
    return;
  }
  
  res.status(200).end();
});



const port = 3001;
app.listen(port, () => console.log('listening on port ', port));