const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/user')

exports.protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const currentUser = await User.findById(decoded.id).select('-password')

      if(!currentUser)
        throw new Error('User not authenticated')
      else {
        req.user = currentUser
        next()
      }
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

exports.admin = asyncHandler((req, res, next) => {
 if(req.user && req.user.isAdmin)
    next()
  else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
})
