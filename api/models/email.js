const mongoos = require('mongoose');

const emailSchema = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
    username:{
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    html:{
        type: String,
    },
    amp:{
        type: String,
    }
})
module.exports = mongoos.model('email', emailSchema)