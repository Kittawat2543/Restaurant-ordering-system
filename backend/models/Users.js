const mongoose = require('mongoose')


const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'staff'],
        default: 'staff'
    }
},{timestamps: true})



module.exports = mongoose.model('Users',UsersSchema)