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
    if (joined == false) { //joining for the first time

      socket.emit('duplicate user redirect', $('#user-input').val())
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

  socket.on('duplicate user redirect', (name) => {
    //TODO display this name
    var destination = '/public/html/error.html'
    var description = 'The name ' + name + 'already exists. Please choose something else'
    $('#errors').append('<h3>').text(description)
    window.location.href = destination;
  })
})
