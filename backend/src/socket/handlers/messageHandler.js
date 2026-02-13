const Message = require("../../models/Message")

module.exports = (io, socket) => {

  socket.on("send_message", (message) => {

    try {
      // Just broadcast the message to all clients in the room
      // The message was already saved by the API before this event
      io.to(message.room).emit("receive_message", message)
    } catch (err) {
      console.error(err)
    }

  })

}
