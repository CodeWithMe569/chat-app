require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const roomRoutes = require("./routes/roomRoutes")

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rooms", roomRoutes)

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});