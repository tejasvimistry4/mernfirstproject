const express = require('express')

const router = express.Router();

const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Logindata = require('../models/Logindata');


// http://localhost:5000/admin/addadmin

router.post('/addadmin', async (req, res) => {
    try {
        const newadmin = new Admin({
            Admin_Username: req.body.Admin_Username,
            Admin_Email: req.body.Admin_Email,
            Admin_Password: await bcrypt.hash(req.body.Admin_Password, 12),

        })

        const saveadmin = await newadmin.save();
        res.json(saveadmin);
    } catch (error) {
        console.error(error);
    }

})

// http://localhost:5000/admin/adminlogin

router.post('/adminlogin', async (req, res) => {

    const Admin_Email = req.body.Admin_Email
    const Admin_Password = req.body.Admin_Password

    try {
        const login = await Admin.findOne({ Admin_Email })
        if (!login) {
            return res.json({ 'msg': 'Email not found' })

        } else {
            if (await bcrypt.compare(Admin_Password, login.Admin_Password)) {

                const newlogindata = new Logindata({
                    Admin_Email: req.body.Admin_Email,
                    Admin_Password: await bcrypt.hash(req.body.Admin_Password, 12),
                    Login_Timings: new Date()

                })
                await newlogindata.save();

                res.json({ 'msg': 'Login Successfully ' })

            } else {
                return res.json({ 'msg': 'password is Incorrect' })

            }
        }

    } catch (error) {
        console.error(error);

    }
})



module.exports = router