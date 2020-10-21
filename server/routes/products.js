const express = require('express')
const router = express.Router()

const { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts } = require('../controllers/products')
const { protect, admin } = require('../middlewares/authMiddleware')

router.get('/top', getTopProducts)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

module.exports = router
