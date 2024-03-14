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
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [
    req.params.id,
  ])

  if (!rows[0]) return res.status(404).json({ message: 'Post not found' })

  res.status(200).json(rows[0])
}

const getNoSqlPost = async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) return res.status(404).json({ message: 'Post not found' })
  res.status(200).json(post)
}

const createSqlPost = async (req, res) => {
  const { id, title, description } = req.body

  if (!title || !description)
    return res.status(400).send('Title and description are required')

  await pool.query(
    'INSERT INTO posts ( "user", title, description) VALUES ($1, $2, $3)',
    [req.user.id, title, description]
  )

  res.status(200).json({ id, user: req.user.id, title, description })
}

const createNoSqlPost = async (req, res) => {
  const { title, description } = req.body
  const createdPost = await Post.create({
    title,
    description,
    user: req.user.id,
  })
  res.status(200).json(createdPost)
}

const updateSqlPost = async (req, res) => {
  const { id, title, description } = req.body
  await pool.query(
    'UPDATE posts SET title = $1, description = $2 WHERE id = $3',
    [title, description, id]
  )

  res.status(200).json({ id, title, description })
}

const updateNoSqlPost = async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) return res.status(404).json({ msg: 'Post not found' })

  if (!req.user) return res.status(401).json({ msg: 'Unauthorized' })

  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ msg: 'Unauthorized' })

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedPost)
}

const deleteSqlPost = async (req, res) => {
  const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id])

  if (!rows[0]) {
    return res.status(404).send('Post not found')
  }

  if (!req.user) {
    return res.status(401).send('User not found')
  }

  if (rows[0].user !== req.user.id) {
    return res.status(401).send('User not authorized')
  }

  await pool.query('DELETE FROM posts WHERE id = $1', [id])
  res.status(204).send({ id })
}

const deleteNoSqlPost = async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) return res.status(404).json({ msg: 'Post not found' })

  if (!req.user) return res.status(401).json({ msg: 'User not found' })

  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ msg: 'User not authorized' })

  await Post.findByIdAndDelete(req.params.id)

  res.status(204).json({ id: req.params.id })
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
