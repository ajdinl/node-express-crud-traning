const asyncHandler = require('express-async-handler')
const {
  getSqlPosts,
  getSqlPost,
  createSqlPost,
  updateSqlPost,
  deleteSqlPost,
  getNoSqlPosts,
  getNoSqlPost,
  createNoSqlPost,
  updateNoSqlPost,
  deleteNoSqlPost,
} = require('../services/postServices')

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  // Check if SQL
  if (process.env.DATABASE_SQL === 'true') {
    getSqlPosts(req, res)
  } else {
    getNoSqlPosts(req, res)
  }
})

const getPost = asyncHandler(async (req, res) => {
  // Check if SQL
  if (process.env.DATABASE_SQL === 'true') {
    getSqlPost(req, res)
  } else {
    getNoSqlPost(req, res)
  }
})

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { id, title, description } = req.body

  if (!title || !description) {
    res.status(400).json({ message: 'Please add a title and description' })
    return
  }

  if (process.env.DATABASE_SQL === 'true') {
    createSqlPost(req, res)
  } else {
    createNoSqlPost(req, res)
  }
})

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  if (process.env.DATABASE_SQL === 'true') {
    updateSqlPost(req, res)
  } else {
    updateNoSqlPost(req, res)
  }
})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  // Check if SQL
  if (process.env.DATABASE_SQL === 'true') {
    deleteSqlPost(req, res)
  } else {
    deleteNoSqlPost(req, res)
  }
})

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
}
