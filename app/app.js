var express = require('express')
var app     = express()
var http    = require('http').Server(app)
var io      = require('socket.io')(http)

app.use(express.static('public'));

// =========================== Routing =========================================

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/public/form.js', (req, res) => {
  res.sendFile(__dirname + '/public/form.js')
})

app.get('/public/sidebar.js', (req, res) => {
  res.sendFile(__dirname + '/public/sidebar.js')
})

app.get('/public/index.css', (req, res) => {
  res.sendFile(__dirname + '/public/index.css') //damn dont forget the backslash
})

// ====================== Event Handling =======================================

var people = {} //people object, client.id members -> name
var active_users = []

// three different actions, join, send, and disconnect
io.on('connection', (client) => {
  console.log('a user has connected.')

  client.on('join', (name) => {
    people[client.id] = name
    console.log(name + ' has joined the chat')
    io.emit('send-all', name + ' has joined the chat')

    active_users.push(name)
    console.log(active_users)
    io.emit('update-active', active_users)
  })

  client.on('send', (msg) => {
    console.log('message sent: ' + msg)
    client.emit('send-self', msg)
    //write on client side to handle this event
    client.broadcast.emit('send-all', people[client.id] + ' - ' + msg)
  })

  client.on('disconnect', () => {
    console.log('user has disconnected')
    var name = people[client.id]
    io.emit('send-all', name + ' has left the chat')

    var index_person = active_users.indexOf(name)
    if (index_person > -1) {
      active_users.splice(index_person, 1)
    }
    console.log(active_users)
    io.emit('update-active', active_users)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})

//we would like to broadcast the message to all the users
//io.emit('some event', { for: 'everyone' });

//socket.broadcast.emit('hi')   "client"
