const expressSession = require('express-session')
const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
module.exports=session