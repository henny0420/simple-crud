require('dotenv').config()
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const connectDB = require('./config/connectionDB')
const ROUTER = require('./routes')
const port = 3000


app.use(express.json())
app.use(cors())

connectDB()
.then(() => {
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
})
.catch(()=> {
  console.error(error)
})


app.use('/',ROUTER.AUTH)
app.use('/',ROUTER.PRODUCT)
