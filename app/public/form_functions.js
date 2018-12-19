$(function () { //here is some jquery code to emit some events from client side
  var socket = io()
  $('form').submit(() => {
    socket.emit('chat message', $('#m').val()) //calling the id of the field
    $('#m').val('')
    return false
  })
  socket.on('chat message', (msg) => {
    $('#messages').append($('<li>').text(msg))
    console.log(msg)
  })
})
