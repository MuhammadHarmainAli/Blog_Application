const Blog = require("../models/blog")
const Comment = require("../models/comment")

const handleCreateBlogPage = (req, res) => {
    return res.render("addblog", { user: req.user });
}

const handleCreateBlog = async (req, res) => {
    if (!req.user) return res.redirect("/signin");

    const { title, body } = req.body;

    let coverImage = null;

    if (req.file) {
        coverImage = `/uploads/${req.file.filename}`
    }

    const blog = await Blog.create({
        blogTitle: title,
        coverImage,
        blogContent: body,
        createdBy: req.user._id
    })

    return res.redirect("/")
}

const handleReadBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    console.log(blog)
    return res.render("blog", { user: req.user, blog, comments });
}

const handleCreateComment = async (req, res) => {
    if(!req.user) return res.redirect("/signin");
    await Comment.create({
        content: req.body.content,
        blogId: req.params.id,
        createdBy: req.user._id
    })

    return res.redirect(`/blog/${req.params.id}`);
}

module.exports = { handleCreateBlogPage, handleCreateBlog, handleReadBlog, handleCreateComment }