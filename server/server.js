const express  = require('express')
require('dotenv').config()
const colors = require('colors')

const connectDB = require('./db')
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')

const app = express()
connectDB()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(express.json())

app.use('/products', productRoutes)
app.use('/users', userRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
