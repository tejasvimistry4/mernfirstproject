const express = require('express');
const Userlogindata = require('../models/Userlogindata');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Forgetpassword = require('../models/Forgetpassword');
const User = require('../models/User');
const Otpresetpassword = require('../models/Otpresetpassword');


const router = express.Router();

// http://localhost:5000/userlogin/adduserlogindata

router.post('/adduserlogindata', async (req, res) => {
    try {

        const newUserlogindata = new Userlogindata({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 12),
            Login_Timings: new Date(),

        })

        const saveUserlogindata = await newUserlogindata.save();

        // res.json(saveUser);
        if (saveUserlogindata) {
            res.status(200).json({ 'msg': 'User Data added Successfully', 'sts': '0' })
        } else {
            res.status(500).json({ 'msg': 'User Data Failed', 'sts': '1' })
        }

    } catch (error) {
        console.error(error);
    }

})
// VIEW -- http://localhost:5000/userlogin/viewuserlogindata

router.get('/viewuserlogindata', async (req, res) => {
    try {
        const userlogindata = await Userlogindata.find()
        res.json(userlogindata)

    } catch (error) {
        res.status(500).json({ 'Error': error })

    }
})

// VIEW SINGLE USER  http://localhost:5000/userlogin/singleuserdata

router.get('/singleuserdata/:ult', async (req, res) => {
    const ult = req.params.ult;
    console.log('Fetching user login data for ult:', ult);

    if (!mongoose.Types.ObjectId.isValid(ult)) {
        return res.status(400).json({ error: 'Invalid ult parameter' });
    }

    try {
        const userLoginData = await Userlogindata.findById(ult);
        if (!userLoginData) {
            return res.status(404).json({ error: 'User login data not found' });
        }
        res.json(userLoginData);
    } catch (error) {
        console.error('Error fetching user login data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//  UPDATE-- http://localhost:5000/userlogin/updateuser

router.put('/updateuser', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userLoginData = await Userlogindata.findOneAndUpdate({ email, password });

        if (!userLoginData) {
            return res.status(404).json({ 'msg': 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await Userlogindata.updateOne({ email }, { password: hashedPassword });


        res.status(200).json({ 'msg': 'User has been updated successfully' });
    } catch (error) {
        res.status(500).json({ 'Error': error.message });
    }
});

//  -- http://localhost:5000/userlogin/sendresetlink

router.post('/sendresetlink', async (req, res) => {
    try {

        if (!req.body.email) {
            return res.status(400).json({ "msg": "Email is required", "sts": 1 });
        }

        const resetLink = Math.random().toString(36).substring(2, 12);

        const link = new Forgetpassword({
            email: req.body.email,
            resetlink: resetLink,
        });
        const forgotpass = await link.save();

        if (forgotpass) {
            const url = `http://localhost:3000/newpassword/${resetLink}`;
            console.log('Generated URL:', url);

            return res.status(200).json({ "msg": "Reset link sent successfully", "sts": 0, forgotpass });
        } else {
            return res.status(400).json({ "msg": "Failed to save reset link", "sts": 1 });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ "msg": "Internal server error", "sts": 1 });
    }
});



// http://localhost:5000/userlogin/getemail/salt

router.get('/getemail/:salt', async (req, res) => {
    // const email = req.body.email;
    const salt = req.params.salt

    try {
        const user = await Forgetpassword.findOne({ resetlink: salt });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Email not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


//  http://localhost:5000/userlogin/resetpassword

router.post('/resetpassword', async (req, res) => {
    const { email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 12);

        const newpassword = await User.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } },
            { new: true }
        );

        return res.status(200).json({ message: 'Password reset successful' });


    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// reset Password by otp


//  -- http://localhost:5000/userlogin/sendoptlink

router.post('/sendoptlink', async (req, res) => {
    try {

        if (!req.body.email) {
            return res.status(400).json({ "msg": "Email is required", "sts": 1 });
        }


        const sendopt = Math.floor(1000 + Math.random() * 9000);

        const link = new Otpresetpassword({
            email: req.body.email,
            otp: sendopt
        });
        const forgotpass = await link.save();

        if (forgotpass) {

            const otp = `${sendopt}`;
            console.log('Generated otp:', otp);

            return res.status(200).json({ "msg": "Reset link sent successfully", "sts": 0, forgotpass });
        } else {
            return res.status(400).json({ "msg": "Failed to save reset link", "sts": 1 });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ "msg": "Internal server error", "sts": 1 });
    }
});

// http://localhost:5000/userlogin/resetpwdotp

router.post('/resetpwdotp', async (req, res) => {

    const { email, otp, password } = req.body;
    console.log(email)
    try {

        const forgetpwd = await Otpresetpassword.findOne({ email })
        console.log(forgetpwd.otp)

        if (forgetpwd.otp === otp) {

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.findOneAndUpdate(
                { email: email },
                { password: hashedPassword },
                { new: true }
            )
            return res.status(200).json({ message: 'Password reset successful' });

        } else {
            return res.status(200).json({ message: 'Password reset failed' });
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

})


module.exports = router