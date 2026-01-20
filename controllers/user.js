const User = require("../models/user");
const { createToken } = require("../services/authentication");

const handleSigninPage = (req, res) => {
    return res.render("signin");
}
const handleSigninUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.redirect("/signup");

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.send("Incorrect password");

    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });
    
    return res.redirect("/");
}
const handleSignupPage = (req, res) => {
    return res.render("signup");
}
const handleSignupUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    const user = await User.create({ fullName, email, password });

    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/");
}

const handleSignoutUser = (req, res) => {
    res.clearCookie("token").redirect("/");
}

module.exports = { handleSigninPage, handleSigninUser, handleSignupPage, handleSignupUser, handleSignoutUser }