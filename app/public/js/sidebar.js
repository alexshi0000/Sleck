// var socket declared in socket.js

$(document).ready(() => {
  socket.on('update-active', (active_users) => {
    $('#active-users-list').empty()
    var i
    for (i = 0; i < active_users.length; i++) {
      var user = active_users[i]
      console.log(user + ' has been added to the sidebar active entry')
      $('#active-users-list').append($('<li class="sidebar-entry">').text(user))
    }
  })
})
