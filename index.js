const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3033;
const todo = [];
app.post('/', (req, res) => {
  console.debug("List", todo);
  const body = req.body;
  todo.push(body);
  res.end();
});


app.get('/', (req, res) => {
  console.debug("List", todo);
  res.json(todo);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const found = todo.find(item => item.id === id);
  if (found)
    todo.filter(item => item.id !== id);
    
    else 
    {
      res.status(404);
    }

});
app.put("/:id",(req,res)=>{
  const id=req.params.id
  const body=req.body
  const found = todo.find(item => item.id === id);
  if(found){
   
  }

})


app.listen(port, () => {
  console.log('listening on port', port);
});