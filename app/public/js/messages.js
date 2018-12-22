$(document).ready(() => {
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
