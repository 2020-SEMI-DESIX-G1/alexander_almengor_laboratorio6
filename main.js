const express = require('express')
const app = express()
const students = {}
 
app.get('/', function (req, res) {
  res.send('Hello World!')
})
 
app.listen(3000, () => console.log("Server Running on Port: 3000"))
