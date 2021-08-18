
const productRepository = require('./product.repository')
const utilsService = require('../../services/utils.service')
const errorHandler = require('../../services/error.handler')
const appSettings=require('../../services/app.settings')

async function createProduct(productToCreate) {
    return await productRepository.createProduct(productToCreate)
}

async function getProductById(productId) {
    const product = await productRepository.getProductById(productId)
    if (!product) errorHandler.entityNotFound(productId)
    return product
}

async function queryProducts(criteria = {}) {
    validateCriteria(criteria)
    return await productRepository.queryProducts(criteria)
}

async function updateProduct(product) {
    const res=await productRepository.updateProduct(product)
    validateResponse(res)
    return res
}

async function patchManyProducts(patch) {
    const res=await productRepository.patchProducts(patch)
    validateResponse(res)
    return res
}
async function removeProductById(productId) {
    const res = await productRepository.removeProductById(productId)
    if (!res) errorHandler.entityNotFound(productId)

}
async function removeManyProductsById(productIds) {
    const res = await productRepository.removeManyProducts(productIds)
    // await collectionService.removeProductFromAllCollections(productIds)
    validateResponse(res)
    return res

}
function validateCriteria(criteria) {
    const allowedOptions = appSettings.PRODUCT_FILTER_OPTIONS
     const isValid= Object.entries(criteria)
            .every(entry=> allowedOptions.includes(entry[0]))
    if(!isValid) errorHandler.invalidParams(criteria)
}
function validateResponse(res){
   
    //NEED TO DO VALIDATION FOR RESPONSE 
}


module.exports = {
    createProduct,
    getProductById,
    queryProducts,
    updateProduct,
    patchManyProducts,
    removeProductById,
    removeManyProductsById,
}

