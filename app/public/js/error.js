var socket = io()

(document).ready(() => {
  socket.on('set error message', (msg) => {
    console.log(msg + 'being appended to error page')
    $('#errors').append('<h3>' + msg + '</h3>')
  })
})
