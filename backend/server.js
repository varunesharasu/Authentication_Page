const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { connectDB } = require("./config/db")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

app.use((err, req, res, next) => {
  console.error("[v0] Error:", err.stack)
  res.status(500).json({ message: "Server error", error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
