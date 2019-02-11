const mongoose = require('mongoose');

//Products Schema
const itemSchema = mongoose.Schema({
    category: { type: String },
    subcategory: { type: String },
    sellerName: { type: String },
    title: { type: String },
    image: { type: String },
    productDescription: { type: String },
    price: { type: String },
    stockpile: { type: String },
    notice: { type: String },
    date:{
        type:Date,
        default:Date.now
      }
});

let Item = module.exports = mongoose.model('products', itemSchema)

//Get Items
module.exports.getItems = (callback, limit)=>{
    Item.find(callback).limit(limit)
}