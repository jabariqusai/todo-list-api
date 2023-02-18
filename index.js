import express from 'express' ;
import cors from 'cors' ;
const app =  express() ;
app.use (express.json());
app.use (cors())

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
  setTimeout (() => res.send(todos) , 3000)
  
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
  console.log(newTodoItem);
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
  if (newTodoItem.status !== 'done' && newTodoItem.status !== 'pending') {
    res.send ('invalid status type , it must be either (pending) or (done)') ;
    return ;
  }
  todos.push({
    id : newTodoItem.id , 
    description : newTodoItem.description , 
    status : newTodoItem.status
  })
  console.log(todos);
  res.send('item added');
})

app.put ('/todos/:id' , (req , res) => {
  console.log(' PUT /todos/:id invoked');
  const id = req.params.id ; 
  console.log('id' , id);
  if (req.headers['content-type'] !== 'application/json') {
    console.log('content type ' , req.headers['content-type']);
    res.send ('invalid content type') ;
    return ;
  }
  const newItem = req.body ;
  if (!newItem) {
    res.send ('please send me sth to add')
    return  ;
  }
  if (!newItem.description || !newItem.id || !newItem.status) {
    res.send ('invalid object content , it must contain id , description and status')
    return  ;
  }
  if (newItem.status !== 'done' && newItem.status !== 'pending') {
    res.send ('invalid status type , it must be either (pending) or (done)') ;
    return ;
  }
  let found = false
  todos.forEach(todoItem => {
    if (todoItem.id === id) {
      found = true ;
      todoItem.description = newItem.description ;
      todoItem.status = newItem.status ;
    } 
  })
  if (!found) {
    res.status (404).end()
  }
  console.log (todos)
  res.status(204).end() ;
})

const port = 3002 ;
app.listen(port , () => {console.debug('app started')}) 