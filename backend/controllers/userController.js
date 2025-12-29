const User = require("../models/User")

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body
    const userId = req.user.id

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" })
    }

    const updatedUser = await User.updateById(userId, { name, email })

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      message: "Profile updated successfully",
      user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
    })
  } catch (error) {
    console.error("[v0] Update error:", error)
    res.status(500).json({ message: "Update error", error: error.message })
  }
}

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id

    await User.deleteById(userId)

    res.json({ message: "Account deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete error:", error)
    res.status(500).json({ message: "Delete error", error: error.message })
  }
}

module.exports = { updateProfile, deleteProfile }
