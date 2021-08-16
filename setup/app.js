const express = require('express')
const session = require('./session')
require('../db/mongoose')
const app = express()

app.use(express.json())
app.use(session)

const path = require('path')
const cors = require('cors')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const setupAsyncLocalStorage = require('../middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.get('/api/setup-session', (req, res) =>{
    req.session.connectedAt = Date.now()
    console.log('setup-session:', req.sessionID);
    res.end()
})



const authRoutes = require('../api/auth/auth.routes')
const productRoutes=require('../api/products/product.routes')
app.use('/api/auth', authRoutes)
app.use('/api/products',productRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports=app