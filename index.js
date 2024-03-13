const express = require('express')
const app = express()
const connectDB = require('./config/db')
const port = process.env.PORT || 3000
const cors = require('cors')
const users = require('./routes/userRoutes')
const posts = require('./routes/postRoutes')
const { errorHandler } = require('./middleware/errorHandler')

connectDB()

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
