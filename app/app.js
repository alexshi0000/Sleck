var express = require('express')
var app     = express()
var http    = require('http').Server(app)
var io      = require('socket.io')(http)

app.use(express.static('public'));

// =========================== Routing =========================================

/*
 * TODO create a node js module just for rerouting these resources.
 * im lazy now to do that but this is so freaking ugly helpppppp
 */

//index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html')
})

//html
app.get('/public/html/error.html', (req, res) => {
  res.sendFile(__dirname + '/public/html/error.html')
})

//js
app.get('/public/js/socket.js', (req, res) => {
  res.sendFile(__dirname + '/public/js/socket.js')
})
app.get('/public/js/textfield.js', (req, res) => {
  res.sendFile(__dirname + '/public/js/textfield.js')
})
app.get('/public/js/messages.js', (req, res) => {
  res.sendFile(__dirname + '/public/js/messages.js')
})
app.get('/public/js/sidebar.js', (req, res) => {
  res.sendFile(__dirname + '/public/js/sidebar.js')
})
app.get('/public/js/error.js', (req, res) => {
  res.sendFile(__dirname + '/public/js/error.js')
})

//css
app.get('/public/css/index.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/index.css')
})
app.get('/public/css/messages.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/messages.css')
})
app.get('/public/css/sidebar.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/sidebar.css')
})
app.get('/public/css/textfield.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/textfield.css')
})
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/html/error.html')
  error_message_stack.push('404 - file not found')
});

// ====================== Event Handling =======================================

const USERNAME_CHAR_LIMIT = 20
const MSG_LEN_LIMIT = 60

var people = {} //people object, client.id members -> name
var active_users = [] //string constants to list users
var error_message_stack = [];

// three different actions, join, send, and disconnect
io.on('connection', (client) => {
  console.log('a user has connected.')

  function exists_in(arr, elem) {
    var i
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === elem)
        return true
    }
    return false
  }

  client.on('set error message', () => {
    console.log('setting error message')
    client.emit('set error message', error_message_stack.pop())
  })

  client.on('handle errors', (name, joined) => {
    if (exists_in(active_users, name) && !joined) {
      client.emit('error redirect') //dup username not allowed
      var msg = 'The username ' + name + ' already exists. Please try something different'
      error_message_stack.push(msg)
    }
    else if (name.length > USERNAME_CHAR_LIMIT && !joined) { //cannot accept names that are too long
      client.emit('error redirect')
      var msg = 'The username ' + name + ' is too long. please use something under ' + USERNAME_CHAR_LIMIT + ' characters'
      error_message_stack.push(msg)
    }
    else {
      client.emit('submit')
      // else join after handling check-in
    }
  })

  client.on('join', (name) => {
    people[client.id] = name
    console.log(name + ' has joined the chat')
    io.emit('send-all', name + ' has joined the chat')

    active_users.push(name)
    console.log('  users online: ' + active_users)
    client.emit('update-name', name)
    io.emit('update-active', active_users)
  })

  function encode_to_wrapped(txt) {
    var text_token_arr = []
    var chop_text = txt
    while (chop_text.length > MSG_LEN_LIMIT) {
      text_token_arr.push(chop_text.substring(0, MSG_LEN_LIMIT))
      chop_text = chop_text.substring(MSG_LEN_LIMIT, chop_text.length)
    }
    if (chop_text.length > 0) { //still some characters left
      text_token_arr.push(chop_text)
    }
    return text_token_arr
  }

  client.on('send', (msg) => {
    if (msg.length > 0 && msg.length < MSG_LEN_LIMIT) {
      console.log('message sent: ' + msg)
      client.emit('send-self', msg)
      //write on client side to handle this event
      client.broadcast.emit('send-all', people[client.id] + ' - ' + msg)
    }
    else {
      console.log('message is too long, had to wrap it')
      var text_token_arr = encode_to_wrapped(msg) //now do something with this
      console.log('  message now looks like this: ')
      var i
      for (i = 0; i < text_token_arr.length; i++) {
        console.log('    line #' + i + ' : ' + text_token_arr[i])
      }
    }
  })

  client.on('disconnect', () => {
    if (people.hasOwnProperty(client.id)) { //the client has to be defined for disconnect to continue
      console.log('user has disconnected')
      var name = people[client.id]
      io.emit('send-all', name + ' has left the chat')

      var index_person = active_users.indexOf(name)
      if (index_person > -1) {
        active_users.splice(index_person, 1)
      }
      console.log('  users online: ' + active_users)
      client.emit('update-name', name)
      io.emit('update-active', active_users)
    }
  })
})

http.listen(3000, () => {
  console.log('server is listening on http://localhost:3000, please connect to this')
})
