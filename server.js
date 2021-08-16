const app=require('./setup/app')
const session=require('./setup/session')
const http = require('http').createServer(app)    

const {connectSockets} = require('./services/socket.service')
connectSockets(http, session)


//LISTEN TO SERVER
const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})




