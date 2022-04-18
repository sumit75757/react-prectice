const mongoos = require('mongoose');

const userSchema = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
    },
    data:{
        type:Array,
    },
    date: String
})
module.exports = mongoos.model('user', userSchema)