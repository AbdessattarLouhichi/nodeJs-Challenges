const mongoose = require('mongoose');
const User = require('./user')
const todoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Is required !']
    } ,
    description :{
        type : String
    } 

}
)

module.exports = mongoose.model('Todo', todoSchema)