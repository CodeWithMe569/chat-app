require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const roomRoutes = require("./routes/roomRoutes")

const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.set("io", io);

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rooms", roomRoutes)

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    // join a room
    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
    });
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});