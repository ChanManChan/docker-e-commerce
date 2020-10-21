const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const formidable = require('formidable');
const fs = require('fs');

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

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

exports.createProduct = asyncHandler(async (req, res) => {
 const product = new Product({
   name: 'Sample name',
   price: 0,
   user: req.user._id,
   image: '/images/sample.jpg',
   brand: 'Sample brand',
   category: 'Sample category',
   countInStock: 0,
   numReviews: 0,
   description: 'Sample description'
 })

 const createdProduct = await product.save()

 res.status(201).json(createdProduct)
})

// exports.updateProduct = asyncHandler(async (req, res) => {
//   let form = new formidable.IncomingForm()
//   form.keepExtensions = true
//   form.parse(req, async (err, fields, files) => {
//     if(err) {
//       res.status(400)
//       throw new Error('Image could not be uploaded')
//     }
//     const { name, price, description, brand, category, countInStock } = fields
//     const product = await Product.findById(req.params.id)
//     if(product) {
//       product.set({ name, price, description, brand, category, countInStock })

//       if(files.imageData) {
//         if(files.imageData.size > 1000000) {
//           res.status(400)
//           throw new Error('Image should be less than 1MB')
//         }
//         product.set({
//           imageData: {
//             data: fs.readFileSync(files.imageData.path),
//             contentType: files.imageData.type
//           }
//         })
//       }
//       const updatedProduct = await product.save()
//       res.json(updatedProduct)
//     } else {
//       res.status(404)
//       throw new Error('Product not found')
//     }
//   })
//  })

 exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.set({ name, price, description, image, brand, category, countInStock })

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
