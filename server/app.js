require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')

// Define ALl Router
const createUserRouter = require('./routes/create_user')
const createProductRouter = require('./routes/create_products')
const createDepartmentRouter = require('./routes/create_department')
const createEmployeeRouter = require('./routes/create_employee')
const createAdminRouter = require('./routes/create_admin')
const createUSerlogindataRouter = require('./routes/create_userlogindata')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000

//Define all routes
app.use('/user', createUserRouter)
app.use('/products', createProductRouter)
app.use('/department', createDepartmentRouter)
app.use('/employee', createEmployeeRouter)
app.use('/admin', createAdminRouter)
app.use('/userlogin', createUSerlogindataRouter)

app.listen(port, () => {
    console.log(`Server is  Running  on - http://localhost:${port}`)
})