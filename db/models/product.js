const mongoose = require('mongoose')
const validator = require('validator')



const productSchema = new mongoose.Schema({
    comparePrice: {
        type: Number
    },
    cost: {
        type: Number,
    },
    description: {
        type: String,
    },
    imgUrls: {
        type: [String],
        required: true,
        validate(urls) {
            const matchImg = str => str.match(/\.(jpeg|jpg|gif|png)$/)
            if (!urls.every(url => matchImg(url))) throw Error('Image is invalid')
        }
    },
    inventory: {
        type: Number
    },
    origin: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min:[0,'Price cannot be negative!']
        

    },
    sku: {
        type: String,
        maxLength:30,
        trim:true
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'archive', 'draft'],
            message: '{VALUE} is not a supported status'
        }
    },
    supplier: {
        type: String,
    },
    tags: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        maxLength: [80, 'title is too long!'],
        required: true,
        validate(str) {
            if (!str) throw Erorr('The product must have a title')
        }
    },
    type: {
        type: String,
    },
    vendor: {
        type: String
    },
    weight: {
        value: Number,
        unit: {
            enum:['LB','KG']
        }
    },

}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product