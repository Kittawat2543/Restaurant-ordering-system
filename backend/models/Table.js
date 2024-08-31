const mongoose = require('mongoose')

const TableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        require: true,
        unique: true
    },
    seats: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ['available', 'occupied'],
        default: 'available'
    }
}, { timestamps: true })

module.exports = mongoose.model('Table', TableSchema)