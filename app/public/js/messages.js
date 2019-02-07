$(document).ready(() => {

  const month_tostring = ['Jan', 'Feb', 'April', 'March', 'May', 'June', 'July',
                        'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const day_tostring = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

  function digits(numeric) {
    if (numeric < 10)
      return '0' + numeric
    return numeric + ''
  }

  function date_suffix(numeric) {
    var ending
    var mod = numeric % 10;
    switch (mod) {
      case 1:
        ending = 'st'
      case 2:
        ending = 'cd'
      case 3:
        ending = 'rd'
      default:
        ending = 'th'
    }
    return numeric + ending
  }


  function add_stamp(name, propic, head, self) {
    if (self) {
      //addding the timestamp, propic, and namestamp
      var d = new Date();
      var date = month_tostring[d.getMonth()]+' '+date_suffix(d.getDate())+' '+day_tostring[d.getDay()]+' '+digits(d.getHours())+':'+digits(d.getMinutes())
      var timenamestamp=name+', '+date

      if (name != null && !head) { //condition for first message in a thread before alternating
        $('#messages').append(
        '<li class="stamp-self">\
            <div class="propicdiv-self"><img class="propic" src=\"'+propic+'\"></div>\
            <div class="stamptext-self">'+timenamestamp+'</div>\
         </li>'
        )
      }
    }
    else {
      //addding the timestamp, propic, and namestamp
      var d = new Date();
      var date = month_tostring[d.getMonth()]+' '+date_suffix(d.getDate())+' '+day_tostring[d.getDay()]+' '+d.getHours()+':'+d.getMinutes()
      var timenamestamp=name+', '+date

      if (name != null && !head) { //condition for first message in a thread before alternating
        $('#messages').append(
        '<li class="stamp">\
            <div class="propicdiv"><img class="propic" src=\"'+propic+'\"></div>\
            <div class="stamptext">'+timenamestamp+'</div>\
         </li>'
        )
      }
    }
  }


  socket.on('send-self', (name, propic, msg, head) => { //texts from myself
    if (!joined) return false
    //add a list to the ul
    $('#messages li:last-child').remove()

    add_stamp(name, propic, head, true)

    $('#messages').append($('<li class="send-self">').text(msg))
    $('#messages').append($('<li id="inv-block">').text('/')) //buffer block
    console.log('message sent: ' + msg)
    console.log('  propic: '+propic)

    document.getElementById('inv-block').scrollIntoView(true);
    //nice hack because we can user the placeholder as an anchor to scroll page
  })

  socket.on('send-all', (name, propic, msg, head) => { //msgs from other people
    if (!joined) return false //catch this
    $('#messages li:last-child').remove()

    add_stamp(name, propic, head, false)

    $('#messages').append($('<li class="send-all">').text(msg))
    $('#messages').append($('<li id="inv-block">').text('/'))
    console.log('message sent: ' + msg)

    document.getElementById('inv-block').scrollIntoView(true);
  })
})
