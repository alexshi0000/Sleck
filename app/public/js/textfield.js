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
})
