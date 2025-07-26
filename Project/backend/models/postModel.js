const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: [true, "Please add a post body"],
        },
        votes: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        activity: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Post", postSchema);
