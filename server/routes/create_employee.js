const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// http://localhost:5000/employee/addemployee
router.post('/addemployee', async (req, res) => {
    try {
        const newEmpolyee = new Employee({
            employee_name: req.body.employee_name,
            employee_age: req.body.employee_age,
            employee_Salary: req.body.employee_Salary,
            employee_Experience: req.body.employee_Experience,
            employee_Gender: req.body.employee_Gender,
            employee_Department: req.body.employee_Department,
            employee_Status: req.body.employee_Status,

        })

        const saveEmployee = await newEmpolyee.save()
        res.json(saveEmployee)

    } catch (error) {
        console.error(error)

    }
})



// http://localhost:5000/employee/viewemployee
router.get('/viewemployee', async (req, res) => {
    try {
        const emplopyee = await Employee.find()
        res.json(emplopyee)

    } catch (error) {
        res.status(500).json({ 'Error': error })
    }
})

// http://localhost:5000/employee/deleteemployee/65d43e394b894b9058903585
router.delete('/deleteemployee/:eid', async (req, res) => {
    const eid = req.params.eid
    try {
        const emplopyee = await Employee.findOneAndDelete(eid)
        res.status(200).json({ 'msg': 'User Has Delected Successfully', 'sts': '1' })
    } catch (error) {
        res.status(500).json({ 'Error': error })


    }
})

// http://localhost:5000/employee/updateemployee/65d43e394b894b9058903585
router.put('/updateemployee/:eid', async (req, res) => {
    const eid = req.params.eid
    try {
        const emplopyee = await Employee.findByIdAndUpdate(
            eid,
            req.body,
            { new: true }
        )
        res.json(emplopyee)
    } catch (error) {
        res.status(500).json({ 'Error': error })


    }
})

//  







module.exports = router