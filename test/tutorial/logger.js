const EventEmitter = require('events') //blueprint
const url = 'http://mylogger.io/log' //some url we will know as endPoint

class Logger extends EventEmitter {
	log(message) {
		// send an http request
		console.log(message) //using console, global object
		//raise an event
		this.emit('messageLogged', {id: 1, url: 'http://'}) //sending data through parameters
	}
}

module.exports = Logger //export Logger class
