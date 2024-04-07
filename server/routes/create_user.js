const express = require('express')

const router = express.Router();

const User = require('../models/User')

const bcrypt = require('bcryptjs');

// INSERCT http://localhost:5000/user/adduser
router.post('/adduser', async (req, res) => {
    try {
        const newUser = new User({
            Username: req.body.Username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 12),
            salary: req.body.salary,
            date_of_birth: req.body.date_of_birth,
            city: req.body.city
        })

        const saveUser = await newUser.save();
        // res.json(saveUser);
        if (saveUser) {
            res.status(200).json({ 'msg': 'User Data added Successfully', 'sts': '0' })
        } else {
            res.status(500).json({ 'msg': 'User Data Failed', 'sts': '1' })
        }

    } catch (error) {
        console.error(error);
    }

})

// VIEW -- http://localhost:5000/user/viewuser
router.get('/viewuser', async (req, res) => {
    try {
        const users = await User.find()
        
        res.json(users)

    } catch (error) {
        res.status(500).json({ 'Error': error })

    }
})

// VIEW SINGLE USER   http://localhost:5000/user/singleuser/65cc4c77b8c7f30a9381061a
router.get('/singleuser/:uid', async (req, res) => {
    const uid = req.params.uid
    try {
        const users = await User.findById(uid)
        res.json(users)
    } catch (error) {
        res.status(500).json({ 'Error': error })
    }
})

//  DELETE -- http://localhost:5000/user/deleteuser/65cc4c77b8c7f30a9381061a
router.delete('/deleteuser/:uid', async (req, res) => {
    const uid = req.params.uid
    try {
        const users = await User.findByIdAndDelete(uid)
        res.json(users)

        res.status(200).json({ 'msg': 'User Has Delected Successfully', 'sts': '1' })
    } catch (error) {
        res.status(500).json({ 'Error': error })


    }
})

//  UPDATE-- http://localhost:5000/user/updateuser/65cc4ccbb8c7f30a9381061c
router.put('/updateuser/:uid', async (req, res) => {
    const uid = req.params.uid;
    const { password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = await User.findByIdAndUpdate(
            uid,
            { password: hashedPassword },
            { new: true }
        );

        res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});




// LOGIN --  http://localhost:5000/user/userlogin

router.post('/userlogin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const login = await User.findOne({ email })

        
        if (!login) {
            return res.json({ 'msg': 'Email not found', 'loginsts': 0 })

        } else {
            if (await bcrypt.compare(password, login.password)) {

                return res.json({ 'msg': 'Login Successfully ', 'loginsts': 2 })

            } else {
                return res.json({ 'msg': 'password is Incorrect', 'loginsts': 1 })

            }

        }

    } catch (error) {

    }

})

// LOGout --  http://localhost:5000/user/userlogout

router.post('/userlogout', async (req, res) => {
    const uid = req.params.uid
    try {
        const logout = await User.findByIdAndDelete(uid)
        if (!logout) {
            return res.json({ 'msg': 'Logout Succuessfully','logoutsts': 0 })
        } else {
            return res.json({ 'msg': 'Failed to login', 'logoutsts': 1 })

        }
    } catch (error) {
    res.status(500).json({ 'Error': error })


}
})



module.exports = router