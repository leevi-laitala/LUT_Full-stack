const express = require("express");
const router = express.Router();

const { createComment, getComments, voteComment } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(getComments).post(protect, createComment).put(protect, voteComment);

module.exports = router;
