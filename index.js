const express = require('express')
app = express()
cors = require('cors')
port = process.env.PORT || 3000
users = require('./routes/userRoutes')
posts = require('./routes/postRoutes')
swaggerJsdoc = require('swagger-jsdoc')
swaggerUi = require('swagger-ui-express')
options = require('./config/swaggerOptions')
const { errorHandler } = require('./middleware/errorHandler')
const { pool, connectDB } = require('./config/db')

const specs = swaggerJsdoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

connectDB()

pool.connect((err) => {
  if (err) console.error('connection error', err.stack)
  console.log('Postgres connected')
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', users)
app.use('/api/posts', posts)

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
