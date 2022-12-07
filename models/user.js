const mongoose = require('mongoose');
const Todo = require('./todo');
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require: [true, 'required!']
    },
    lastName : {
        type : String,
        require: [true, 'required!']
    }, 
    email: {
        type : String,
        require: [true, 'required!']
    },
    password: {
        type : String,
        require: [true, 'required!']
    },
    age: Number,
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: "Todo"}]
}
,{
    timestamps :true , versionKey : false
       })


module.exports = mongoose.model('User',userSchema);