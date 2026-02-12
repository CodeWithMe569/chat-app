const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.middleware")
const {
  sendMessage,
  getMessages
} = require("../controllers/messageController")

router.post("/message", auth, sendMessage)
router.get("/message/:roomId", auth, getMessages)

module.exports = router
