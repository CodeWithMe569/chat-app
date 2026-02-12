const Message = require("../models/Message")

// Send Message
exports.sendMessage = async (req,res) => {
  try {
    const sender = req.user.id
    const { room, content } = req.body

    const message = await Message.create({
      sender,
      room,
      content
    })

    res.status(201).json(message)
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}


// Fetch Messages by Room
exports.getMessages = async (req,res) => {
  try {
    const { roomId } = req.params

    const messages = await Message.find({ room: roomId })
      .populate("sender", "username")
      .sort({ createdAt: 1 })

    res.json(messages)
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}
