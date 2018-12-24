$(document).ready(() => {
  var socket = io()
  socket.emit('set error message')
  socket.on('set error message', (msg) => {
    console.log(msg + 'being appended to error page')
    $('#errors').append('<h3>' + msg + '</h3>')
  })
})
