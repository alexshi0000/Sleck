const express = require('express')
var app  = express()
var http = require('http').Server(app)
var io   = require('socket.io')(http)

//make sure we make our statics accessible
app.use(express.static('socket-assets'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/json_streamer.html')
})

var printArr = ['ford', 'bmw', 'fiat', 'toyota']
var authors  = ['Alex', 'Skylar']
var texts    = ['how is this project going?', 'pretty shit']
var dates    = ['yesterday 11:10pm', 'today 12:03']

http.listen(3000, () => {
  console.log('port 3000, listening ...') //if it does not work move this to the end
})

io.on('connection', (socket) => {
  console.log('socket connection has been made')

  for (var i = 0; i < printArr.length; i++) {
    socket.emit('streamEvent', {
      str: printArr[i]
    })
  }
  socket.emit('clearDocument')
  //TODO
  socket.on('disconnect', () => {
    console.log('socket disconnected')
  })
})
