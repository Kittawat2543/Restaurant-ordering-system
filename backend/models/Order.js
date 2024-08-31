const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        require: true
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem',
            require: true
        },
        quantity: {
            type: Number,
            require: true,
            default: 1
        }
    }],
    total: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'served', 'paid'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order',OrderSchema)