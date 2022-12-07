const express = require('express');
const router = express.Router();
const User = require('../models/user');


// Get request
router.get('/users', async(req, res)=>{
    console.log(req.body)
   const users = await User.find({})
     res.send(users)
    console.log(users)
 })
 
 // Get by id request
 router.get('/users/:id',  async (req, res)=>{
  const user = await User.findById(req.params.id).populate('todos');
  res.send(user);
 })

// Post Request
router.post('/users', async(req,res)=>{
    const user = await User.create(req.body)
    .then((user)=>{
        res.send(user);
    })
})

// Update Request

router.put('/users/:id', async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id, req.body);
    User.findOne({_id : req.params.id}).then((user)=>{
        res.send(user);
        console.log('user updated!');
    })
})

// Delete Request
router.delete('/users/:id', async(req,res)=>{
    await User.findByIdAndDelete(req.params.id).then(
        res.send({message : 'user deleted!'})
    );
})

//push todo
router.put('/users/push/:idUser/:idTodo', async(req,res)=>{
    try {
         await  User.findByIdAndUpdate(req.params.idUser, {$push:{todos : req.params.idTodo}} )
         User.findById(req.params.idUser).populate('todos').then((updatedUser)=>{
            res.send(updatedUser)
         })
       
    }catch(err){
     res.send('ERROR SERVER')
    }
 
    
})

// pull todo
router.put('/users/pull/:idUser/:idTodo', async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.idUser,{$pull:{todos: req.params.idTodo}});
        User.findOne({_id:req.params.idUser}).then((user)=>{
            res.send(user)
        })
        
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;