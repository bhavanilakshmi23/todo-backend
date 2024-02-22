const mongoose = require('mongoose')

let TodoSchema = new mongoose.Schema({
    TodoListName:{type:String, required:true},
   createdAt:{type: Date,default:Date.now()}
},
    {collection:'todolists',versionKey:false}
)

let TodoModel = mongoose.model('todolists', TodoSchema)

module.exports={TodoModel}