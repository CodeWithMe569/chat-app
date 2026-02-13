const Room = require("../models/Room")
const Message = require("../models/Message")

// Create Room
exports.createRoom = async (req, res) => {
  try {
    const userId = req.user.id
    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ err: "Room name is required" })
    }

    const room = await Room.create({
      name: name.trim(),
      members: [userId], // Automatically include creator as the only initial member
      createdBy: userId
    })

    return res.status(201).json(room)
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

// Join Room by ID
exports.joinRoom = async (req, res) => {
  try {
    const userId = req.user.id
    const { roomId } = req.body

    if (!roomId) {
      return res.status(400).json({ err: "roomId is required" })
    }

    const room = await Room.findById(roomId)

    if (!room) {
      return res.status(404).json({ err: "Room not found" })
    }

    const isAlreadyMember = room.members.some(
      (memberId) => memberId.toString() === userId
    )

    if (!isAlreadyMember) {
      room.members.push(userId)
      await room.save()
    }

    return res.status(200).json(room)
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}


// Get Rooms of Logged User
exports.getMyRooms = async (req, res) => {
  try {
    const userId = req.user.id

    const rooms = await Room.find({
      members: userId
    }).populate("members", "username")

    // For each room, compute unread messages for this user
    const roomsWithUnread = await Promise.all(
      rooms.map(async (room) => {
        const unreadCount = await Message.countDocuments({
          room: room._id,
          sender: { $ne: userId },
          read: false
        })

        return {
          ...room.toObject(),
          unreadCount
        }
      })
    )

    return res.json(roomsWithUnread)
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
