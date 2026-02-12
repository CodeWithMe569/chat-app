const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.middleware")
const {
  createRoom,
  getMyRooms
} = require("../controllers/roomController")

router.post("/", auth, createRoom)
router.get("/", auth, getMyRooms)

module.exports = router
