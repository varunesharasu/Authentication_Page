import { connectDB } from "@/backend/lib/db"
import User from "@/backend/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    return Response.json(
      {
        message: "Sign in successful",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Signin error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
