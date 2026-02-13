const Room = require("../../models/Room")

module.exports = (socket) => {

  socket.on("join_room", async (roomId) => {

    try {

      const room = await Room.findById(roomId)

      if (!room) {
        return socket.emit("error_msg", "Room not found")
      }

      // ⭐ membership check
      const isMember = room.members.some(
        id => id.toString() === socket.user.id
      )

      if (!isMember) {
        return socket.emit(
          "error_msg",
          "Not authorized for this room"
        )
      }

      socket.join(roomId)

      socket.emit("joined_room", roomId)

      console.log(
        `User ${socket.user.id} joined ${roomId}`
      )

    } catch (err) {
      console.error(err)
    }

  })

}
