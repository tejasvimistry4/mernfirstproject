const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    Admin_Username: {
        type: String,
        required: true,
    },
    Admin_Email: {
        type: String,
        required: true,
    },
    Admin_Password: {
        type: String,
        required: true,
    },
    


})

module.exports = mongoose.model('admin', adminSchema)


