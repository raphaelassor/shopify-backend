const mongoose = require('mongoose')
const Product =require('./models/product')
mongoose.connect('mongodb+srv://raphaelassor:Rpi2581998!@cluster0.cjqk3.mongodb.net/shopify', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
},(err)=>{
    if(err) console.log('could not connect to db')
    else console.log('successful connection')
})

