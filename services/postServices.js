const Post = require('../models/postModel')
const { pool } = require('../config/db')

const getSqlPosts = async (req, res) => {
  const posts = await pool.query('SELECT * FROM posts WHERE "user" = $1', [
    req.user.id,
  ])
  res.status(200).json(posts.rows)
}

const getNoSqlPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
  res.status(200).json(posts)
}

const getSqlPost = async (req, res) => {
  const post = await pool.query('SELECT * FROM posts WHERE id = $1', [
    req.params.id,
  ])

  if (!post.rows[0]) {
    res.status(400)
    throw new Error('Post not found')
  }
  res.status(200).json(post.rows[0])
}

const getNoSqlPost = async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  res.status(200).json(post)
}

const createSqlPost = async (req, res, id, title, description) => {
  await pool.query(
    'INSERT INTO posts (id, "user", title, description) VALUES ($1, $2, $3, $4)',
    [id, req.user.id, title, description]
  )

  res.status(200).json({ id, user: req.user.id, title, description })
}

const createNoSqlPost = async (req, res, title, description) => {
  const post = await Post.create({
    title,
    description,
    user: req.user.id,
  })
  res.status(200).json(post)
}

const updateSqlPost = async (req, res, id, title, description) => {
  await pool.query(
    'UPDATE posts SET title = $1, description = $2 WHERE id = $3',
    [title, description, id]
  )

  res.status(200).json({ id, title, description })
}

const updateNoSqlPost = async (req, res) => {
  const post = await Post.findById(req.params.id)

  // Check if post exists
  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedPost)
}

const deleteSqlPost = async (req, res) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id])

  res.status(200).json({ id: req.params.id })
}

const deleteNoSqlPost = async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await post.findByIdAndDelete(req.params.id)

  res.status(200).json({ id: req.params.id })
}

module.exports = {
  getSqlPosts,
  getNoSqlPosts,
  getSqlPost,
  getNoSqlPost,
  createSqlPost,
  createNoSqlPost,
  updateSqlPost,
  updateNoSqlPost,
  deleteSqlPost,
  deleteNoSqlPost,
}
