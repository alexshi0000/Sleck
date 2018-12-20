var express = require('express')
var app     = express()
var http    = require('http').Server(app)
var io      = require('socket.io')(http)

app.use(express.static('public'));

// =========================== Routing =========================================

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/public/form_functions.js', (req, res) => {
  res.sendFile(__dirname + '/public/form_functions.js')
})

app.get('/public/index.css', (req, res) => {
  res.sendFile(__dirname + '/public/index.css') //damn dont forget the backslash
})

// ====================== Event Handling =======================================

var people = {};
var counter = 0;

// three different actions, join, send, and disconnect
io.on('connection', (client) => {
  console.log('a user has connected.')

  client.on('join', (name) => {
    people[client.id] = name
    console.log(name + ' has joined the chat')
    io.emit('send', name + ' has joined the chat')
  })

  client.on('send', (msg) => {
    console.log('message sent: ' + msg)
    io.emit('send', msg)
    //write on client side to handle this event
  })

  client.on('disconnect', () => {
    console.log('user has disconnected')
    io.emit('send', people[client.id] + ' has disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})

//we would like to broadcast the message to all the users
//io.emit('some event', { for: 'everyone' });

//socket.broadcast.emit('hi')   "client"
