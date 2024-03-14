const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getProfile,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 *
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         id: 65f05ff22571edc55e9e88f5
 *         name: John Doe
 *         email: 0TqK5@example.com
 *         password: password123
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access error
 *     BadRequest:
 *       description: Bad request error
 *     Conflict:
 *       description: Conflict error
 *     NotFound:
 *       description: Resource not found error
 *     ServerError:
 *       description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /api/users:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '201':
 *           description: The user was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '409':
 *           $ref: '#/components/responses/Conflict'
 *   /api/users/login:
 *     post:
 *       summary: Login
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: The user was successfully logged in
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 *   /api/users/profile:
 *     get:
 *       summary: Get user profile
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: The user profile
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getProfile)

module.exports = router
