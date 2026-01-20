const { Router } = require("express");

const { handleSigninPage, handleSigninUser, handleSignupPage, handleSignupUser, handleSignoutUser } = require("../controllers/user");

const router = Router();

router.get("/signin", handleSigninPage);

router.post("/signin", handleSigninUser);

router.get("/signup", handleSignupPage);

router.post("/signup", handleSignupUser);

router.get("/signout", handleSignoutUser);

module.exports = router