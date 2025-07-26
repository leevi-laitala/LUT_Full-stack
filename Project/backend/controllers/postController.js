const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

// @desc    Create post 
// @route   POST /api/posts
// @access  Public
const createPost = asyncHandler(async (req, res) => {
    if (!req.body?.text) {
        res.status(400);
        throw new Error("Please add a text field");
    }

    // If not user defined, allow anonymous post
    const user = (req.user.name) ? req.user.name : "Anonymous";

    // If title is not set, create one from the body
    const title = (req.body.title) ? req.body.title : req.body.text.slice(0, 10) + "...";

    const post = await Post.create({
        user: user,
        title: title,
        text: req.body.text,
        votes: 0,
    });

    res.status(200).send(post);
});

// @desc    Get own posts
// @route   GET /api/posts
// @access  Public
const getOwnPosts = asyncHandler(async (req, res) => {
    if (!req.user.id) {
        res.status(400);
        throw new Error("Must be logged in to see own posts");
    }

    const posts = await Post.find({ user: req.user.name });

    res.status(200).send(posts);
});

// @desc    Get feed
// @route   GET /api/posts/feed
// @access  Public
const getFeed = asyncHandler(async (req, res) => {
    const posts = await Post.find().limit(10).sort({ activity: -1 });
    //const posts = await Post.find().limit(10).sort({ activity: 1 });

    res.status(200).send(posts);
});

// @desc    Get post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    //const posts = await Post.find().limit(10).sort({ activity: 1 });

    res.status(200).send(post);
});

// @desc    Upvote or downvote posts
// @route   PUT /api/posts/:id
// @access  Public
const votePost = asyncHandler(async (req, res) => {
    if (!req.body?.vote) {
        res.status(400);
        throw new Error("Must contain vote");
    }

    let updatedPost;

    if (req.body.vote === "upvote") {
        updatedPost = await Post.findByIdAndUpdate(req.params.id, { $inc: {"votes": 1} }, { new: true });
    } else {
        updatedPost = await Post.findByIdAndUpdate(req.params.id, { $inc: {"votes": -1} }, { new: true });
    }

    await Post.findByIdAndUpdate(req.params.id, { activity: Date.now() }, { new: true });

    res.status(200).send(updatedPost);
});

module.exports = {
    createPost, getOwnPosts, getFeed, votePost, getPost,
};
