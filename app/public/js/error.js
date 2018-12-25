$(document).ready(() => {
  var socket = io()
  socket.emit('set error message')
  socket.on('set error message', (msg) => {
    console.log(msg + 'being appended to error page')
    if (msg != null) {
      $('#errors').append('<p>' + msg + '</p>')
    }
    else {
      $('#errors').append('<p>please return to homepage</p>')
    }
  })
})
