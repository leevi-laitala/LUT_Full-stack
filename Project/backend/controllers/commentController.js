const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// @desc    Create comment 
// @route   POST /api/comment/:id
// @access  Public
const createComment = asyncHandler(async (req, res) => {
    if (!req.body?.text) {
        res.status(400);
        throw new Error("Please add a text field");
    }

    // If not user defined, allow anonymous post
    const user = (req.user.name) ? req.user.name : "Anonymous";

    const comment = await Comment.create({
        parent: req.params.id,
        user: user,
        text: req.body.text,
        votes: 0,
    });

    const joo = await Post.findByIdAndUpdate(req.params.id, { activity: Date.now() }, { new: true });
    console.log(joo);

    res.status(200).send(comment);
});

// @desc    Get post comments
// @route   GET /api/comment/:id
// @access  Public
const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ parent: req.params.id });

    res.status(200).send(comments);
});

// @desc    Upvote or downvote comment
// @route   PUT /api/comment/:id
// @access  Public
const voteComment = asyncHandler(async (req, res) => {
    if (!req.body?.vote) {
        res.status(400);
        throw new Error("Must contain vote");
    }

    let updatedComment;

    if (req.body.vote === "upvote") {
        updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $inc: {"votes": 1} }, { new: true });
    } else {
        updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $inc: {"votes": -1} }, { new: true });
    }

    res.status(200).send(updatedComment);
});

module.exports = {
    createComment, getComments, voteComment,
};
