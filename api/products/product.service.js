
const productRepository=require('./product.repository')
const utilsService=require('../../services/utils.service')

async function createProduct(productToCreate) {
       return await productRepository.createProduct(productToCreate)
       
}

async function getProductById(productId) {
        return await productRepository.getProductById(productId)
}

async function queryProducts(criteria = {}) {
    if(!_isValidateCriteria(criteria))return Error('invalid query') 
    return await productRepository.queryProducts(criteria)
}

async function updateProduct(product) {
   return await productRepository.updateProduct(product)
}

async function patchManyProducts(patch){
  return await productRepository.patchProducts(patch)
}
async function removeProductById(productId) {
    const res=await productRepository.removeProductById(productId)
    if(!res)throw Error ('product not found in db')
    
}
async function removeManyProductsById(productIds){
    const result=await productRepository.removeManyProducts(productIds)
    // await collectionService.removeProductFromAllCollections(productIds)
   return result
    
}
async function _isValidateCriteria(criteria){
    const allowedFilters=['skip','sort','limit','status','vendor','type','tags']
    for(let key in criteria){
        if(!allowedFilters.includes(key))return false
    }
    return true
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

