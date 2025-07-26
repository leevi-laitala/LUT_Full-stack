const express = require("express");
const router = express.Router();

const { createPost, getOwnPosts, getFeed, votePost, getPost } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getOwnPosts).post(protect, createPost);
router.route("/post/:id").put(protect, votePost).get(getPost);
router.route("/feed").get(getFeed);

module.exports = router;
