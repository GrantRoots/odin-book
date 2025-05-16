const db = require("../queries/posts");
const { body, validationResult } = require("express-validator");

async function getUserAndFollowingPosts(req, res, next) {
  try {
    const data = await db.getUserAndFollowingPosts(req.query.id);
    return res.json({
      success: true,
      posts: data,
    });
  } catch (error) {
    next(error);
  }
}

const validatePost = [
  body("content").trim().notEmpty().isLength({ max: 1000 }),
];

const createPost = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).json({
        message: "Send Failed Invalid Details",
        details: errors.array(),
      });
    }
    try {
      await db.createPost(req.body.content, req.body.userId);
      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
];

async function likePost(req, res, next) {
  try {
    await db.likePost(req.body.postId);
    return res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
}

async function getPost(req, res, next) {
  try {
    const post = await db.getPost(req.params.postId);
    return res.json({
      success: true,
      post: post,
    });
  } catch (error) {
    next(error);
  }
}

const validateComment = [
  body("comment").trim().notEmpty().isLength({ max: 255 }),
];

const postComment = [
  validateComment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).json({
        message: "Send Failed Invalid Details",
        details: errors.array(),
      });
    }
    try {
      await db.postComment(req.body.comment, req.body.postId, req.body.userId);
      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  getUserAndFollowingPosts,
  createPost,
  likePost,
  getPost,
  postComment,
};
