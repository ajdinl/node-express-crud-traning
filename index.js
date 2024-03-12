const express = require('express')
const app = express()
const connectDB = require('./config/db')
const port = process.env.PORT || 3000
const cors = require('cors')
const users = require('./routes/userRoutes')

connectDB()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', users)

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
