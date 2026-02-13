const jwt = require("jsonwebtoken")

module.exports = (socket, next) => {

  const token = socket.handshake.auth.token

  if (!token) {
    return next(new Error("No token"))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    socket.user = decoded   // ⭐ attach identity

    next()

  } catch {
    next(new Error("Invalid token"))
  }
}
