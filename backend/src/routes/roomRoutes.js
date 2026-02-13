const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.middleware")
const {
  createRoom,
  getMyRooms,
  joinRoom,
  leaveRoom,
  deleteRoom
} = require("../controllers/roomController")

router.post("/", auth, createRoom)
router.get("/", auth, getMyRooms)
router.post("/join", auth, joinRoom)
router.post("/leave", auth, leaveRoom)
router.delete("/:id", auth, deleteRoom)

module.exports = router
