const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const formidable = require('formidable');
const fs = require('fs');

exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      // options: 'i' <- case insensitive
      $options: 'i'
    }
  }: {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if(alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.set({ reviews: [ ...product.reviews, review] })

    product.set({
      numReviews: product.reviews.length,
      rating: (product.reviews.reduce((acc, item) => acc + item.rating, 0)) / product.reviews.length
    })

    await product.save()

    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

exports.getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})
