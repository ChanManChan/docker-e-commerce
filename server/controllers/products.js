const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(!product) {
    res.status(404)
    // no need to type res.status().json({...}) because of the custom error handler
    throw new Error('Product not found')
  }

  res.json(product)
})
