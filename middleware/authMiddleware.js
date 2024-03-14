const JWT = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : null

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      res.status(401)
      throw new Error('Not authorized, user not found')
    }

    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(401)
    throw new Error('Not authorized, token failed')
  }
})

module.exports = { protect }
