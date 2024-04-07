const mongoose = require('mongoose')
const logindataSchema = new mongoose.Schema({
    Admin_Email: {
        type: String,
        required: true,
    },
    Admin_Password: {
        type: String,
        required: true,
    },
    Login_Timings : {
        type: Date,
        required: true,
    }


})

module.exports = mongoose.model('logindata', logindataSchema)


