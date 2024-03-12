const express = require('express')
const app = express()
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
