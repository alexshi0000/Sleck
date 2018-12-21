var socket, joined = false

$(document).ready(() => { //here is some jquery code to emit some events from client side
//this can then be shorted to simply $(function(){ ... code ... })
  socket = io()

  //name request prompt
  $('#user-input').val('type your nickname here ...')

  $('#user-input').click(() => {
    if (joined == false) { //if hasnt joined yet then reset field after prompt
      $('#user-input').val('')
    }
  })

  $('#textfield').submit(() => {
    if (joined == false) { //joining for the first time
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

  socket.on('send-self', (msg) => { //texts from myself
    //add a list to the ul
    $('#messages li:last-child').remove()
    $('#messages').append($('<li class="send-self">').text(msg))
    $('#messages').append($('<li id="inv-block">').text('placeholder')) //buffer block
    console.log('message sent: ' + msg)

    document.getElementById('inv-block').scrollIntoView(true);
    //nice hack because we can user the placeholder as an anchor to scroll page
  })

  socket.on('send-all', (msg) => { //msgs from other people
    $('#messages li:last-child').remove()
    $('#messages').append($('<li class="send-all">').text(msg))
    $('#messages').append($('<li id="inv-block">').text('placeholder'))
    console.log('message sent: ' + msg)

    document.getElementById('inv-block').scrollIntoView(true);
  })
})
