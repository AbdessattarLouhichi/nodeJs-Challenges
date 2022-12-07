const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');



// Get request
router.get('/todos', async(req, res)=>{
   console.log(req.body)
  const todos = await Todo.find({})
    res.send(todos)
   console.log(todos)
})

// Get by id request
router.get('/todos/:id',  async (req, res)=>{
 const todo = await Todo.findById(req.params.id);
 res.send(todo);
})

// Post request
router.post('/todos', async (req, res)=>{
 const todo = await Todo.create(req.body)
 .then((todo)=>{
    res.send(todo)
 })
})

// Update request
router.put('/todos/:id', async (req, res)=>{
 const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
 Todo.findOne({_id: req.params.id }).then((todo)=>{
                                       res.send(todo);
                                       console.log('Todo updated')
                                    });
})

// Delete request
router.delete('/todos/:id', async(req, res)=>{
 await Todo.findByIdAndRemove(req.params.id)
 .then(res.send({message : 'Todo deleted'}));
 
})




module.exports = router