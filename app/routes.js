module.exports = function(app) {

  /*
   * for added security i will be listing all the js css and html files seperatly
   * from other assets such as pictures which are less vulnerable if routed
   * incorrectly
   */

  //index
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html')
  })

  //js
  app.get('/public/js/socket.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/socket.js')
  })
  app.get('/public/js/textfield.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/textfield.js')
  })
  app.get('/public/js/messages.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/messages.js')
  })
  app.get('/public/js/sidebar.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/sidebar.js')
  })
  app.get('/public/js/login.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/login.js')
  })
  app.get('/public/js/register.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/register.js')
  })

  //css
  app.get('/public/css/index.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/index.css')
  })
  app.get('/public/css/messages.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/messages.css')
  })
  app.get('/public/css/sidebar.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/sidebar.css')
  })
  app.get('/public/css/textfield.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/textfield.css')
  })
  app.get('/public/css/login.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/login.css')
  })
  app.get('/public/css/register.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/register.css')
  })

  // error routing
  app.get('/public/html/error.html', (req, res) => {
    res.sendFile(__dirname + '/public/html/error.html')
  })
  app.get('/public/js/error.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/error.js')
  })

  //login and register pages
  app.get('/public/html/login.html', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html')
  })
  app.get('/public/html/register.html', (req, res) => {
    res.sendFile(__dirname + '/public/html/register.html')
  })
}
