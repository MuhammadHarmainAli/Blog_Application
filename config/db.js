const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("Database Connected!");
    } catch (error) {
        console.log("DB Error:", error.message);
    }
}

module.exports = connectDB;