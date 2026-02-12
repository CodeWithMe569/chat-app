require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection failed");
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;