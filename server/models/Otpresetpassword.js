const mongoose = require('mongoose')
const otpresetpasswordSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true,
    },
   
    otp : {
        type: String,
        required: true,
    },

   
    
})

module.exports = mongoose.model('Otp_resetpassword', otpresetpasswordSchema)


