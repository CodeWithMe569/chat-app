const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

app.use(express.json);
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT);