const mongoos = require('mongoose')
const  authSchema = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
    username:{type :String , required:true},
    email :{type :String , required:true},
    password :{type :String , required:true},
})
module.exports=mongoos.model('auth', authSchema )