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
    },
    sku: {
        type: String,
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
        unit: ""
    },

}, {
    timestamps: true,
})

// productSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

// productSchema.methods.toJSON = function () {
//     const product = this
//     const productObject = product.toObject()

//     delete productObject.password
//     delete productObject.tokens
//     delete productObject.avatar

//     return productObject
// }


// // Hash the plain text password before saving
// productSchema.pre('save', async function (next) {
//     const product = this

//     if (product.isModified('password')) {
//         product.password = await bcrypt.hash(product.password, 8)
//     }

//     next()
// })

// // Delete product tasks when product is removed
// productSchema.pre('remove', async function (next) {
//     const product = this
//     await Task.deleteMany({ owner: product._id })
//     next()
// })

const Product = mongoose.model('Product', productSchema)

module.exports = Product