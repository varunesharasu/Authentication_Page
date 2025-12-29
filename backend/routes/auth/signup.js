import { connectDB } from "@/backend/lib/db"
import User from "@/backend/models/User"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return Response.json({ message: "All fields are required" }, { status: 400 })
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ message: "Email already registered" }, { status: 400 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    return Response.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
