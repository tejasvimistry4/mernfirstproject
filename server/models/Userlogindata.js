const mongoose = require('mongoose')
const userlogindataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Login_Timings : {
        type: Date,
        required: true,
    }


})

module.exports = mongoose.model('userlogindata', userlogindataSchema)


