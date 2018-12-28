var path    = require('path')
var express = require('express')
var app     = express()
var http    = require('http').Server(app)
var io      = require('socket.io')(http)
var fs      = require('fs')

// ======================== Routing ============================================

//index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html')
})

require('./routes')(app) //app from express() and routes module is an external router

app.use(express.static(__dirname + '/public/assets/propics'));

app.get('*', (req, res) => {
  error_message_stack.push('404 - file not found')
  res.sendFile(__dirname + '/public/html/error.html')
})

// ====================== Event Handling =======================================

const USERNAME_CHAR_LIMIT = 20
const MSG_LEN_LIMIT = 65
const PROPIC_LOCATION = __dirname + '/public/assets/propics/'

var people = {} //people object, client.id members -> name
var propic = {} //store string to profile pictures, generate random animal pics :)
var active_users = [] //string constants to list users
var error_message_stack = [];
var message_stack = []; //stack of messages

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
      var msg = 'The username: ' + name + ' already exists. Please try something different'
      error_message_stack.push(msg)
    }
    else if (name.length > USERNAME_CHAR_LIMIT && !joined) { //cannot accept names that are too long
      client.emit('error redirect')
      var msg = 'The username: ' + name + ' is too long. please use something under ' + USERNAME_CHAR_LIMIT + ' characters'
      error_message_stack.push(msg)
    }
    else {
      client.emit('submit')
      // else join after handling check-in
    }
  })

  // after joining chat

  function get_propic(location) {
    var files = fs.readdirSync(PROPIC_LOCATION)
    return files[Math.floor(Math.random() * files.length)]
  }

  client.on('join', (name) => {

    latest_message = new Object()
    latest_message.name = 'nodejs server'
    latest_message.msg  = 'join event'
    message_stack.push(latest_message)

    people[client.id] = name
    propic[client.id] = get_propic(PROPIC_LOCATION)
    console.log('fetched new propic: ' + propic[client.id])

    console.log(name + ' has joined the chat')
    io.emit('send-all', people[client.id], propic[client.id], name + ' has joined the chat')

    active_users.push(name)
    console.log('  users online: ' + active_users)
    client.emit('update-name', name)
    io.emit('update-active', active_users)
  })



  function split_large(txt) {
    var combo = 0 //once combo reaches MSG_LEN_LIMIT then set back to 0
    var ret = ''
    var i
    for (i = 0; i < txt.length; i++) {
      if (txt.charAt(i) === ' ') {
        combo = 0
        ret += txt.charAt(i)
      }
      else if (combo >= MSG_LEN_LIMIT) {
        combo = 0
        ret += ' '
        ret += txt.charAt(i)
      }
      else {
        ret += txt.charAt(i)
        combo++
      }
    }
    return ret
  }

  function encode_to_wrapped(txt) {
    var text_token_arr = []
    var chop_text = split_large(txt).split(' ') //word tokens, custom split dammit
    //console.log(chop_text) show chop text to debug

    var next_line = ''
    var i
    for (i = 0; i < chop_text.length; i++) {
      var next_tok = chop_text[i]
      if (next_line.length + next_tok.length <= MSG_LEN_LIMIT) {
        next_line += next_tok + ' '
      }
      else if (next_line.length > 0) {
        text_token_arr.push(next_line)
        next_line = chop_text[i] + ' '
      }
    }
    if (next_line.length > 0) {
      text_token_arr.push(next_line)
    }

    var j
    for (j = 0; j < text_token_arr.length; j++) {
      text_token_arr[j] = text_token_arr[j].trim()
    }

    return text_token_arr //return lines
  }

  function max(a, b) {
    if (a > b)
      return a
    else
      return b
  }

  function longest_string(arr) {
    var i
    var ret = 0
    for (i = 0; i < arr.length; i++)
      ret = max(arr[i].length, ret)
    return ret
  }

  // ========= function undergoing testing with messages.js ====================
  function send_wrap_text(text_token_arr, to_self) {

  }


  //legacy
  function sending_encoded_wrap_text(text_token_arr, to_self) {

    const WRAP_LEN = longest_string(text_token_arr)

    console.log('    line #' + 0 + ' : ' + text_token_arr[0])
    var whitespace = WRAP_LEN - text_token_arr[0].length
    if (to_self)
      client.emit('send-self-top',
        'You', propic[client.id], text_token_arr[0], whitespace, is_head(people[client.id]))
    else
      client.broadcast.emit('send-all-top',
        people[client.id], propic[client.id], text_token_arr[0], whitespace, is_head(people[client.id]))

    var n = text_token_arr.length
    var i
    for (i = 1; i < n-1; i++) { //rudiment
      console.log('    line #' + i + ' : ' + text_token_arr[i])
      var whitespace = WRAP_LEN - text_token_arr[i].length
      if (to_self)
        client.emit('send-self-middle', text_token_arr[i], whitespace)
      else
        client.broadcast.emit('send-all-middle', text_token_arr[i], whitespace)
    }

    console.log('    line #' + (n - 1) + ' : ' + text_token_arr[n-1])
    var whitespace = WRAP_LEN - text_token_arr[n-1].length
    if (to_self)
      client.emit('send-self-bottom', text_token_arr[n-1], whitespace)
    else
      client.broadcast.emit('send-all-bottom', text_token_arr[n-1], whitespace)
  }

  function peek_message_stack_person() {
    var top_message = message_stack.pop()
                      message_stack.push(top_message)
    var ref
    if (top_message != null)
      ref = top_message.name
    return ref
  }

  function is_head (person_name) {
    if (peek_message_stack_person() === person_name)
      return true
    return false
  }

  client.on('send', (msg) => {
    if (msg.length > 0) {
      var msg = msg.trim()
      msg = msg.replace(/ +(?= )/g,'') //remove double whitespace
      console.log('message sent: ' + msg)
      if (msg.length < MSG_LEN_LIMIT) {

        client.emit('send-self',
          'You', propic[client.id], msg, is_head(people[client.id]))
        //write on client side to handle this event
        client.broadcast.emit('send-all',
          people[client.id], propic[client.id], msg, is_head(people[client.id]))
        /*
         * ideally when sending your message to other people
         * then we would include the propic and some other things
         * such as your name and msg. e.g namestamp and also possibly
         * a time stamp
         */
      }
      else {
        console.log('message is too long, had to wrap it')
        var text_token_arr = encode_to_wrapped(msg) //now do something with this
        console.log('  message now looks like this: ')
        sending_encoded_wrap_text(text_token_arr, true)
        sending_encoded_wrap_text(text_token_arr, false)
      }

      latest_message = new Object()
      latest_message.name = people[client.id]
      latest_message.msg = msg
      message_stack.push(latest_message) //encap and stack
    }
  })

  client.on('disconnect', () => {

    latest_message = new Object()
    latest_message.name = 'nodejs server'
    latest_message.msg  = 'disconnect event'
    message_stack.push(latest_message)

    if (people.hasOwnProperty(client.id)) {
      //the client has to be defined for disconnect to continue
      console.log('user has disconnected')
      var name = people[client.id]
      io.emit('send-all', name, propic[client.id], name + ' has left the chat')

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
