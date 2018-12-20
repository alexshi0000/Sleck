var socket, joined = false

$(document).ready(() => { //here is some jquery code to emit some events from client side
//this can then be shorted to simply $(function(){ ... code ... })
  socket = io()

  //name request prompt
  $('#user-input').val('type your nickname here ...')

  $('#textfield').submit(() => {
    if (joined == false) {
      socket.emit('join', $('#user-input').val())
      $('#user-input').val('') //reset the value of m
    }
    else {
      socket.emit('send', $('#user-input').val()) //calling the id of the field
      $('#user-input').val('') //reset the value of m
    }
    joined = true
    return false
  })

  socket.on('send', (msg) => {
    $('#messages').append($('<li>').text(msg)) //add a list to the ul
    console.log('message sent: ' + msg)
  })
})
