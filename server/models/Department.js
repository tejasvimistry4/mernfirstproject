const mongoose = require('mongoose')
const departmentSchema = new mongoose.Schema({
    department_name: {
        type: String,
        required: true,
    },
    department_Status: {
        type: String,
        enum: ['Active', 'InActive'],
        default: 'Active',
        required: true
    },
})

module.exports = mongoose.model('depatment', departmentSchema)