/*var http = require('http')
var fs   = require('fs')

var server = http.createServer((req, res) => {
  console.log('request was made: ' + req.url)

  if (req.url === "/serve_html_pages.css") { //if the css file becomes requested
    console.log('css url was requested')
    res.writeHead(200, {'Content-type': 'text/css'})
    var cssStream = fs.createReadStream(__dirname + '/serve_html_pages.css', 'utf8')
    cssStream.pipe(res)
  }

  else { //default case respond with html first
    res.writeHead(200, {'Content-type': 'text/html'})
    var htmlStream = fs.createReadStream(__dirname + '/serve_html_pages.html', 'utf8')
    htmlStream.pipe(res)
  }
})

server.listen(3000, '127.0.0.1')
console.log('now listening to port 3000')*/




//======== here we are going to try the same thing but with express framework instead




var express = require('express')
var app = express()

/*
 * explicitly serve static files such as css, images
 * using app.get in nodejs or simply use
 * app.use(express.static('directory')) for convienance
 * for example there is going to be an image in /images
 * that has not been explicity served
 */
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile('serve_html_pages.html', { root: __dirname })
})

var server = app.listen(3000, 'localhost', () => {
  var host = server.address().address
  var port = server.address().port

  console.log('server is now listening... at http://%s:%s', host, port)
})
