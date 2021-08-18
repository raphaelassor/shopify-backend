const productService = require('./product.service')


async function createProduct(req, res) {
    try {
        const product = req.body
        const savedProduct = await productService.createProduct(product)
        res.send(savedProduct)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getProduct(req, res) {
    try {
        const product = await productService.getProductById(req.params.id)
        res.send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function queryProducts(req, res) {
    try {
        const products = await productService.queryProducts(req.query)
        res.send(products)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updateProduct(req, res) {
    try {
        const product = req.body
        const savedProduct = await productService.updateProduct(product)
        res.send(savedProduct)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function patchManyProducts(req, res) {
    try {
        const patch = req.body
        const result = await productService.patchManyProducts(patch)
        res.send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function deleteProduct(req, res) {
    try {
        if (!req.params.id) await _deleteManyProducts(req, res)
        else {
            await productService.removeProductById(req.params.id)
            res.send('Deleted Successfuly')
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

async function _deleteManyProducts(req, res) {
    const productIds = req.body
    const result = await productService.removeManyProductsById(productIds)
    res.send(`${result.deletedCount} out of ${productIds.length} producs have been deleted`)
}





module.exports = {
    createProduct,
    getProduct,
    queryProducts,
    updateProduct,
    patchManyProducts,
    deleteProduct,
}


