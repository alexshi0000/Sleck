$(document).ready(() => {
  socket.on('send-self', (msg) => { //texts from myself
    //add a list to the ul
    $('#messages li:last-child').remove()
    $('#messages').append($('<li class="send-self">').text(msg))
    $('#messages').append($('<li id="inv-block">').text('/')) //buffer block
    console.log('message sent: ' + msg)

    document.getElementById('inv-block').scrollIntoView(true);
    //nice hack because we can user the placeholder as an anchor to scroll page
  })

  socket.on('send-all', (name, propic, msg) => { //msgs from other people
    $('#messages li:last-child').remove()
    $('#messages').append('<li class="stamp"><img src=\"'+propic+'\"></li>')
    $('#messages').append($('<li class="send-all">').text(msg))
    $('#messages').append($('<li id="inv-block">').text('/'))
    console.log('message sent: ' + msg)

    document.getElementById('inv-block').scrollIntoView(true);
  })

  //for wrapped texts

  function gen_white_space(msg, whitespace) {
    console.log('the msg ' + msg)
    console.log('  was given ' + whitespace + ' spaces of whitespace')
    var ret = msg
    var i
    for (i = 0; i < whitespace; i++) {
      ret += '&nbsp;'
    }
    return ret
  }

  /* some things to pay attention to:
   *   - only last child removed in send-self-top since thats the first line
   *     in the wrapped text bubble
   *   - only add last child element in send-self-bottom
   *   - keep css clean
   */

  //top cap
  socket.on('send-self-top', (msg, whitespace) => { //texts from myself
    //add a list to the ul
    $('#messages li:last-child').remove()
    $('#messages').append('<li class="send-self-top">' + gen_white_space(msg, whitespace) + '</li>')
    console.log('message sent: ' + msg)

    //nice hack because we can user the placeholder as an anchor to scroll page
  })

  socket.on('send-all-top', (name, propic, msg, whitespace) => { //msgs from other people
    $('#messages li:last-child').remove()
    $('#messages').append('<li class="send-all-top">' + gen_white_space(msg, whitespace) + '</li>')
    console.log('message sent: ' + msg)

  })

  //middle cap
  socket.on('send-self-middle', (msg, whitespace) => { //texts from myself
    //add a list to the ul
    $('#messages').append('<li class="send-self-middle">' + gen_white_space(msg, whitespace) + '</li>')
    console.log('message sent: ' + msg)

    //nice hack because we can user the placeholder as an anchor to scroll page
  })

  socket.on('send-all-middle', (msg, whitespace) => { //msgs from other people
    $('#messages').append('<li class="send-all-middle">' + gen_white_space(msg, whitespace) + '</li>')
    console.log('message sent: ' + msg)

  })

  //bottom cap
  socket.on('send-self-bottom', (msg, whitespace) => { //texts from myself
    //add a list to the ul
    $('#messages').append('<li class="send-self-bottom">' + gen_white_space(msg, whitespace) + '</li>')
    $('#messages').append($('<li id="inv-block">').text('/')) //buffer block
    console.log('message sent: ' + msg)

    document.getElementById('inv-block').scrollIntoView(true);
    //nice hack because we can user the placeholder as an anchor to scroll page
  })

  socket.on('send-all-bottom', (msg, whitespace) => { //msgs from other people
    $('#messages').append('<li class="send-all-bottom">' + gen_white_space(msg, whitespace) + '</li>')
    $('#messages').append($('<li id="inv-block">').text('/'))
    console.log('message sent: ' + msg)

    document.getElementById('inv-block').scrollIntoView(true);
  })
})
