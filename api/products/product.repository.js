const Product = require('../../db/models/product')
const logger = require('../../services/logger.service')
const dbUtil=require('../../db/dbUtil')
const errorHandler=require('../../services/error.handler')
const appSettings=require('../../services/app.settings')

async function createProduct(productToSave) {
    try {
        const product = new Product(productToSave)
        return await product.save()
    } catch (err) {
       errorHandler.dbActionFailed('CREATE',productToSave,err)
    }
}

async function getProductById(productId) {
    try {
        return await Product.findById(productId)
    } catch (err) {
        errorHandler.dbActionFailed('GET',productId,err)
    }
}

async function queryProducts(criteria) {
    const queryCriteria=dbUtil.buildCriteriaForQuery(criteria)
    const {limit,skip,sort,match}=queryCriteria
    try {
        const products = await Product.find(match)
            .limit(limit)
            .skip(skip)
            .sort(sort)
        return products
    } catch (err) {
        errorHandler.dbActionFailed('QUERY',criteria,err)
    }
}

async function updateProduct(product) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(product._id, product, { new: true, runValidators: true })
        return updatedProduct
    } catch (err) {
        errorHandler.dbActionFailed('UPDATE',product,err)
    }
}

async function patchProducts(patch) {
    try {
        const command = dbUtil.parsePatchCommand(patch)
        const pathcedProducts = await Product.updateMany({ _id: { $in: patch.ids } }, command, { new: true, runValidators: true })
        return pathcedProducts
    } catch (err) {
        errorHandler.dbActionFailed('PATCH',patch,err)
    }
}

async function removeProductById(productId) {
    try {
        const res = await Product.findByIdAndRemove(productId)
        return res
    } catch (err) {
        errorHandler.dbActionFailed('DELETE',productId,err)
    }
}

async function removeManyProducts(productIds) {
    try {
        return await Product.deleteMany({ _id: { $in: productIds } })
    } catch (err) {
        errorHandler.dbActionFailed('DELETE',productIds,err)
    }
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