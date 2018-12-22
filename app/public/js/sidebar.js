var username, online_users = []

$(document).ready(() => {
  socket.on('update-active', (active_users) => {

    online_users = active_users
    $('#active-users-list').empty()
    var i
    for (i = 0; i < active_users.length; i++) {
      var user = active_users[i]
      console.log(user + ' has been added to the sidebar active entry')
      if (user === username) {
        $('#active-users-list')
          .append($('<li class="sidebar-entry-focused">').text(user))
      }
      else {
        $('#active-users-list').append($('<li class="sidebar-entry">').text(user))
      }
    }
  })

  socket.on('update-name', (name) => {
    username = name
  })
})
