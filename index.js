import express from 'express' ;
const app =  express() ;
app.use (express.json());

const todos = [
  {id : '1' , description : "study hard" , status : 'done'} ,
  {id : '2' , description : "work hard" , status : 'pending'} ,
  {id : '3' , description : "sshopping" , status : 'pending'} ,
  {id : '4' , description : "prepare lunch" , status : 'pending'} ,
  {id : '5' , description : "have fun" , status : 'pending'} ,
  {id : '6' , description : "study hard" , status : 'pending'} ,
  {id : '7' , description : "study hard" , status : 'pending'} ,
  {id : '8' , description : "study hard" , status : 'done'} ,
  {id : '9' , description : "study hard" , status : 'done'} ,
]

app.get ('/todos' , (req , res) => {
  console.log('GET /todos inveked ');
  res.send(todos)
})

app.delete ('/todos/:id' , (req , res) => {
  console.log('GET /todos/:id inveked ');
  const id = req.params.id ;
  const index = todos.findIndex(todoItem => todoItem.id === id) 
  console.log('the index that is gonna be deleted is :' , index);
  if (index >= 0) {
    todos.splice(index , 1)
    console.log(todos);
    res.status(204).end() ;
    return
  }
  res.status(404).end()
})

app.post ('/todos' , (req , res) => {
  if (req.headers['content-type'] !== 'application/json') {
    console.log('content type ' , req.headers['content-type']);
    res.send ('invalid content type') ;
    return ;
  }
  const newTodoItem = req.body ;
  if (!newTodoItem) {
    res.send ('please send me sth to add')
    return  ;
  }
  if (!newTodoItem.description || !newTodoItem.id || !newTodoItem.status) {
    res.send ('invalid object content , it must contain id , description and status')
    return  ;
  }
  if (todos.find(todoItem => todoItem.id === newTodoItem.id)) {
    res.send ('the item you are trying to add is already exists , try to edit it instead')
    return  ;
  }
  if (newTodoItem.status !== 'done' || newTodoItem.status !== 'pending') {
    res.send ('invalid status type , it must be either (pending) or (done)') ;
    return ;
  }
})


const port = 3002 ;
app.listen(port , () => {console.debug('app started')}) 