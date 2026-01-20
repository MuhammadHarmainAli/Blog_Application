require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const blog = require("./models/blog");
const connectDB = require("./config/db");
const checkAuth = require("./middlewares/authentication");
connectDB(process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT;
app.set("view engine", "ejs");

// Views directory set karo (default 'views')
app.set("views", path.join(__dirname, "views"));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(checkAuth);

app.get("/", async (req, res) => {
    const allBlog = await blog.find({})
    return res.render("home", { user: req.user, blogs: allBlog });
})

app.use("/", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})