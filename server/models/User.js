const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
})



module.exports = mongoose.model('user', userSchema)


