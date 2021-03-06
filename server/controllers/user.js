const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const Password = require('../utils/passwordManager')
const generateToken = require('../utils/generateToken')

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if(user && (await Password.compare(user.password, password)))
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    user.set({
      name : req.body.name || user.name,
      email : req.body.email || user.email
    })

  if(req.body.password)
    user.set({ password: req.body.password })

  const updatedUser = await user.save()

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id)
  })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if(user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    user.set({
      name : req.body.name || user.name,
      email : req.body.email || user.email,
      isAdmin: req.body.isAdmin
    })

  const updatedUser = await user.save()

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
