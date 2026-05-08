const jwt = require("jsonwebtoken");

const SECRET = "TDEPOSIT_SECRET_KEY";

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: "admin"
        },
        SECRET,
        { expiresIn: "2h" }
    );
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};