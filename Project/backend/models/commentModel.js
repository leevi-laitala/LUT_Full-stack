const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: [true, "Please add a comment text"],
        },
        votes: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Comment", commentSchema);
