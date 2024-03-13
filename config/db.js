const mongoose = require('mongoose')
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('MongoDB connected')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = { pool, connectDB }
