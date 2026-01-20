const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    blogTitle: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    blogContent: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

module.exports = model("blog", blogSchema);