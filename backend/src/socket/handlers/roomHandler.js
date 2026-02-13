module.exports = (socket) => {

  socket.on("join_room", (roomId) => {
    socket.join(roomId)

    console.log(
      `Socket ${socket.id} joined ${roomId}`
    )
  })

}
