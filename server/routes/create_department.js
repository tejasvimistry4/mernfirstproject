const express = require('express');
const Department = require('../models/Department');

const router = express.Router();

// http://localhost:5000/department/adddepartment
router.post('/adddepartment', async (req, res) => {
    try {
        const newdepartment = new Department({
            department_name: req.body.department_name,
            department_Status: req.body.department_Status
        })

        const savedepartment = await newdepartment.save()
        res.json(savedepartment);

    } catch (error) {
        console.error(error);

    }
})





module.exports = router