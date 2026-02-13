const Room = require("../models/Room")

// Create Room
exports.createRoom = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, members } = req.body

    // Ensure creator included
    const uniqueMembers = [...new Set([userId, ...members])]

    const room = await Room.create({
      name,
      members: uniqueMembers,
      createdBy: userId
    })

    return res.status(201).json(room)
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

    return res.json(rooms)
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
