const express = require("express")
const router = express.Router()
const { updateProfile, deleteProfile } = require("../controllers/userController")
const { authenticateToken } = require("../middleware/auth")

router.put("/profile", authenticateToken, updateProfile)
router.delete("/profile", authenticateToken, deleteProfile)

module.exports = router
