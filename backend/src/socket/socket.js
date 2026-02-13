const roomHandler = require("./handlers/roomHandler")
const messageHandler = require("./handlers/messageHandler")

module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("Socket connected:", socket.id)

    roomHandler(socket)
    messageHandler(io, socket)

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id)
    })

  })

}
