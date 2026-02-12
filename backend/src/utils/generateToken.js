require("dotenv").config();

const jwt = require("jsonwebtoken");

function generateToken(user) {
    return jwt.sign(
        {id: user},
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

module.exports = generateToken;