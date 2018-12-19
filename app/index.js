var express = require('express')
var app     = express()
var http    = require('http').Server(app)
var io      = require('socket.io')(http)

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/public/form_functions.js', (req, res) => {
  res.sendFile(__dirname + '/public/form_functions.js')
})

app.get('/public/index.css', (req, res) => {
  res.sendFile(__dirname + '/public/index.css') //damn dont forget the backslash
})

io.on('connection', (socket) => {
  console.log('user has connected.')
  io.emit('chat message', 'a user has been connected')

  socket.on('chat message', (msg) => {
    console.log('message sent: ' + msg)
    io.emit('chat message', msg)
    //write on client side to handle this event
  })

  socket.on('disconnect', () => {
    console.log('user has disconnected')
    io.emit('chat message', 'a user has been disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})

//we would like to broadcast the message to all the users
//io.emit('some event', { for: 'everyone' });

//socket.broadcast.emit('hi')
