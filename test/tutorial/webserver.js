const http = require('http')

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.write('Hello, world.')
		res.end()
	}

	else if (req.url === '/api/courses') { //handing different requests
		res.write(JSON.stringify([1, 2, 3]))
		res.end()
	}
})

server.on('connection', (socket) => {
	console.log('New Connection...')
}) //connection is name of event

server.listen(3000)

console.log('Listening on port 3000...')
