import { io } from "socket.io-client"

let socket

export function connectSocket() {

  const token = localStorage.getItem("token")

  socket = io("http://localhost:9000", {
    auth: { token }
  })

  return socket
}

export function getSocket() {
  return socket
}

export function disconnectSocket() {
  if (socket) socket.disconnect()
}
