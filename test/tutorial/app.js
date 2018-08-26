const Logger = require('./logger.js')
const logger = new Logger()

//register a listener
logger.on('messageLogged', (arg) => {
  console.log('listener called', arg)
})

logger.log('here is a message')
