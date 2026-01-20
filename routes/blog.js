const express = require("express");
const { handleCreateBlogPage, handleCreateBlog, handleReadBlog, handleCreateComment } = require("../controllers/blog");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get("/", handleCreateBlogPage);

router.post("/create", upload.single("coverImage"), handleCreateBlog);

router.get("/:id", handleReadBlog)

router.post("/comment/:id", handleCreateComment)

module.exports = router;