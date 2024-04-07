const mongoose = require('mongoose')
const ForgetpasswordSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true,
    },
    resetlink : {
        type: String,
        required: true,
    },
   
    
})

module.exports = mongoose.model('forgetpassword', ForgetpasswordSchema)


