const { MongoClient } = require("mongodb")

let db = null
let client = null

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file")
    }

    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    db = client.db()
    console.log("MongoDB connected successfully")
    return db
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Make sure to call connectDB() first.")
  }
  return db
}

module.exports = { connectDB, getDB }
