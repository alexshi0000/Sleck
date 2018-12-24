var joined = false

$(document).ready(() => {
  //name request prompt
  $('#user-input').val('type your nickname here ...')

  $('#user-input').click(() => {
    if (joined == false) { //if hasnt joined yet then reset field after prompt
      $('#user-input').val('')
    }
  })

  $('#textfield').submit(() => {
    socket.emit('handle errors', $('#user-input').val(), joined)
    //ask server to handle errors and callback on submit after
    return false
  })

  socket.on('submit', () => {
    if (joined == false) { //joining for the first time
      socket.emit('join', $('#user-input').val())
      $('#user-input').val('')
      joined = true
    }
    else {
      socket.emit('send', $('#user-input').val()) //calling the id of the field
      $('#user-input').val('') //reset the value of m
    }
  })

  socket.on('error redirect', () => {
    var destination = '/public/html/error.html'
    console.log('redirect to error page called')
    window.location.href = destination;
  })
})
