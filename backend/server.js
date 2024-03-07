const express = require('express')

const deployContract = require('./contractDeploy.js')
const admin = require('./routes/admin/admin.js')

const app = express() 
app.use(express.json())

app.use('/' , deployContract)
app.use('/admin' , admin)

app.listen(3000, ()=>{
    console.log('server is running')
})