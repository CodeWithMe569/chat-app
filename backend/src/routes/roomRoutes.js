const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.middleware")
const {
  createRoom,
  getMyRooms,
  joinRoom
} = require("../controllers/roomController")

router.post("/", auth, createRoom)
router.get("/", auth, getMyRooms)
router.post("/join", auth, joinRoom)

module.exports = router
