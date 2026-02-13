module.exports = (io, socket) => {

  socket.on("send_message", ({ room, message }) => {

    io.to(room).emit("receive_message", message)

  })

}
