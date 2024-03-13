const express = require('express')
const app = express()
const { pool, connectDB } = require('./config/db')
const port = process.env.PORT || 3000
const cors = require('cors')
const users = require('./routes/userRoutes')
const posts = require('./routes/postRoutes')
const { errorHandler } = require('./middleware/errorHandler')

connectDB()

pool.connect((err) => {
  if (err) console.error('connection error', err.stack)
  console.log('Postgres connected')
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM posts')
    res.json(posts.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

app.post('/', async (req, res) => {
  try {
    const { id, title, description } = req.body
    const newPost = await pool.query(
      'INSERT INTO posts (id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [id, title, description]
    )

    res.json(newPost.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

app.use('/api/users', users)
app.use('/api/posts', posts)

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
