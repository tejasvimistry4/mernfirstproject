const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    employee_name: {
        type: String,
        required: true,
    },
    employee_age: {
        type: Number,
        required: true,
    },
    employee_Salary: {
        type: Number,
        required: true,
    },
    employee_Experience: {
        type: Number,
        required: true,
    },
    employee_Gender: {
        type: String,
        required: true,
    },
    employee_Department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'depatment' //table name
    },
    employee_Status: {
        type: String,
        enum: ['Active', 'InActive'],
        default: 'Active',
        required: true
    },
})

employeeSchema.pre('find', function (next) {
    this.populate('employee_Department')
    next()
})

module.exports = mongoose.model('emplopyee', employeeSchema)


