const express = require('express')
var app = express()

app.get('/', (req, res) => {
  res.send('Hello, world')
})

var server = app.listen(8081, 'localhost', () => {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
