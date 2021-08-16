const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getProduct, queryProducts, createProduct, updateProduct,deleteProduct,patchManyProducts} = require('./product.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.post('/',createProduct)
router.get('/', queryProducts)
router.get('/:id', getProduct)
router.put('/:id',  updateProduct)
router.patch('/', patchManyProducts)
router.delete('/:id?', deleteProduct)

module.exports = router