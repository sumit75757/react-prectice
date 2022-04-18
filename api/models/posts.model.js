const mongoos = require('mongoose');

const postSchema = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
   
    username: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    feedpost: {
        type: String,
    },
    date: String,
    commnet:[
        
    ]
})
module.exports = mongoos.model('post', postSchema)