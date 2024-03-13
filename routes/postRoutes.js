const express = require('express')
const router = express.Router()
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPosts).post(protect, createPost)

router
  .route('/:id')
  .get(protect, getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost)

module.exports = router
