const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String ,
    description: String,
    price: Number,
    quantity: Number,
    image: String,
});

module.exports = mongoose.model('Products', productSchema);
