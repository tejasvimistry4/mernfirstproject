const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    Product_name: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Stock: {
        type: Number,
        required: true,
    },


})

module.exports = mongoose.model('Products', productsSchema)