const Product = require('../../db/models/product')
const logger = require('../../services/logger.service')
const mongoUtil=require('../../db/mongoUtil')

async function createProduct(productToSave) {
    try {
        const product = new Product(productToSave)
        return await product.save()
    } catch (e) {
        _handleError('failed to create product in db', e)
    }
}

async function getProductById(productId) {
    try {
        const product = await Product.findById(productId)
        return product
    } catch (e) {
        _handleError('failed to get product', e)
    }
}

async function queryProducts(criteria) {
    mongoUtil.noramilzeCriteria(criteria)
    const match = mongoUtil.getMongoMatch(criteria)
    const sort =  mongoUtil.parseSort(criteria.sort)
    const limit = criteria.limit || 25
    const skip = criteria.skip || 0
    try {
        const products = await Product.find(match)
            .limit(limit)
            .skip(skip)
            .sort(sort)
        return products
    } catch (e) {
        _handleError('could not get products', e)
    }
}

async function updateProduct(product) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(product._id, product, { new: true, runValidators: true })
        if (!updatedProduct) _handleError('could not find product')
        return updatedProduct
    } catch (e) {
        _handleError('update product failed,', e)
    }
}

async function patchProducts(patch) {
    try {
        const command = mongoUtil.getMongoPatchCommand(patch)
        const pathcedProducts = await Product.updateMany({ _id: { $in: patch.ids } }, command, { new: true, runValidators: true })
        return pathcedProducts
    } catch (e) {
        _handleError('could not patch product', e)
    }
}

async function removeProductById(productId) {
    try {
        const res = await Product.findByIdAndRemove(productId)
        return res
    } catch (e) {
        _handleError('could not remove product in db', e)
    }
}

async function removeManyProducts(productIds) {
    try {
        return await Product.deleteMany({ _id: { $in: productIds } })
    } catch (e) {
        _handleError('could not remove products in db', e)
    }
}

function _handleError(msg, e = 'initiated') {
    logger.error(msg, e)
    throw Error(msg, e)
}


module.exports = {
    createProduct,
    getProductById,
    queryProducts,
    patchProducts,
    updateProduct,
    removeProductById,
    removeManyProducts

}