const productService = require('./product.service')
const logger = require('../../services/logger.service')
// const Product=require('../../db/models/product')

async function createProduct(req, res) {
    try {
        const product = req.body
        const savedProduct = await productService.createProduct(product)
        res.send(savedProduct)
    } catch (err) {
        _handleError(res, err, 'Failed to create product')
    }
}

async function getProduct(req, res) {
    try {
        const product = await productService.getProductById(req.params.id)
        if (!product) throw Error
        res.send(product)
    } catch (err) {
        _handleError(res, err, 'Failed to get product')
    }
}

async function queryProducts(req, res) {
    try {
        const products = await productService.queryProducts(req.query)
        res.send(products)
    } catch (err) {
        _handleError(res, err, 'Failed to get products')
    }
}
async function updateProduct(req, res) {
    try {
        const product = req.body
        const savedProduct = await productService.updateProduct(product)
        res.send(savedProduct)
    } catch (err) {
        _handleError(res, err, 'Failed to update product')
    }
}

async function patchManyProducts(req, res) {
    try {
        const patch = req.body
        const result = await productService.patchManyProducts(patch)
        res.send(result)
    } catch (err) {
        _handleError(res, err, 'Failed to patch products')
    }
}

async function deleteProduct(req, res) {
    try {
        if (!req.params.id) await _deleteManyProducts(req, res)
        else {
            await productService.removeProductById(req.params.id)
            res.send({ msg: 'Deleted successfully' })
        }
    } catch (err) {
        _handleError(res, err, 'Failed to delete')
    }
}

async function _deleteManyProducts(req, res) {
    const productIds = req.body
    const result = await productService.removeManyProductsById(productIds)
    res.send({ msg: `${result.deletedCount} out of ${productIds.length} producs have been deleted` })
}

function _handleError(res, err, msg) {
    logger.error(msg, err)
    res.status(500).send({ err, msg })
}



module.exports = {
    createProduct,
    getProduct,
    queryProducts,
    updateProduct,
    patchManyProducts,
    deleteProduct,
}


