const mongoos = require('mongoose');

const todo = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
    
})
module.exports = mongoos.model('todo', todo)