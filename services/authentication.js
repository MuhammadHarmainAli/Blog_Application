require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (user) => {
    const token = jwt.sign({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    }, process.env.JWT_SECRET);

    return token;
}

const validateToken = (token) => {
    if(!token) throw new Error("No token provided!");

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
}

module.exports = { createToken, validateToken }