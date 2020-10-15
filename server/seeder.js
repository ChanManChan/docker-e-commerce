const mongoose = require('mongoose')
const users = require('./data/users')
const products = require('./data/products')

const User = require('./models/user')
const Product = require('./models/product')
const Order = require('./models/order')
const connectDB = require('./db')

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id


    const modifiedProducts = products.map(products => ({ ...products, user: adminUser }))

    await Product.insertMany(modifiedProducts)

    console.log('Date Imported!')
    process.exit()
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Date Destryoed!')
    process.exit()
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

if(process.argv[2] === '-d')
  destroyData()
else
  importData()

