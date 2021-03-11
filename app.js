const express = require('express')
const app = express()
const router = require('./src/routes/base');

require('dotenv').config()
const port = process.env.PORT

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})