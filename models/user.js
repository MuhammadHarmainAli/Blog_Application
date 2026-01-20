const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(16);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = model("user", userSchema);