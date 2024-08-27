const mongoose = require('mongoose')

const MenuItemSehema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: String,
    price: {
        type: Number,
        require: true
    },
    category: String
})

module.exports = mongoose.model('MenuItem', MenuItemSehema)