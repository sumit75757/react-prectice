const mongoos = require('mongoose');
 
const productSchema = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
    productName :String,
    price :Number,

})
module.exports=mongoos.model('product', productSchema )