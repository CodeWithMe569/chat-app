const roomHandler = require("./handlers/roomHandler")
const messageHandler = require("./handlers/messageHandler")
const socketAuth = require("./auth")

module.exports = (io) => {

  // attach auth middleware
  io.use(socketAuth)

  io.on("connection", (socket) => {

    console.log("Authenticated user:", socket.user.id)

    roomHandler(socket)
    messageHandler(io, socket)

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id)
    })

  })

}
