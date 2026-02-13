const Message = require("../../models/Message")

module.exports = (io, socket) => {

  socket.on("send_message", async ({ room, content }) => {

    try {

      // Save to DB
      const message = await Message.create({
        sender: socket.user.id,
        room,
        content
      })

      // Broadcast saved message
      io.to(room).emit("receive_message", message)

    } catch (err) {
      console.error(err)
    }

  })

}
