var express = require('express')
var app = express()

app.use(express.static('public'))
app.get('/form.html', (req, res) => {
  res.sendFile(__dirname + '/' + 'form.html')
})

app.get('/signInProcess', (req, res) => {
  //Prepare the output into JSON format
  response = {
    firstName: req.query.firstName,
    lastName: req.query.lastName
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

var server = app.listen(3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('connecting to the form...')
})
