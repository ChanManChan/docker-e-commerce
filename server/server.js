const path = require('path')
const express  = require('express')
require('dotenv').config()
const colors = require('colors')
const morgan = require('morgan')

const connectDB = require('./db')
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const orderRoutes = require('./routes/order')
const uploadRoutes = require('./routes/upload')

const app = express()
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
connectDB()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(express.json())

app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)
app.use('/upload', uploadRoutes)

app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// to access static files such as images from browser (http://localhost:4995/api/uploads/image-1603204174733.jpg)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
