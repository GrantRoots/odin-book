const db = require("../queries/posts");
const { body, validationResult } = require("express-validator");

async function getUsersPosts(req, res, next) {
  try {
    const data = await db.getPostsById(req.query.id);
    return res.json({
      success: true,
      posts: data,
    });
  } catch (error) {
    next(error);
  }
}

const validatePost = [
  body("content").trim().notEmpty().isLength({ max: 1000 }).escape(),
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

// const validateMessage = [
//   body("message").trim().notEmpty().isLength({ max: 1000 }).escape(),
// ];

// const sendMessage = [
//   validateMessage,
//   async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.error(errors);
//       return res.status(400).json({
//         message: "Send Failed Invalid Details",
//         details: errors.array(),
//       });
//     }
//     try {
//       await db.sendMessage(req.body.message, req.body.roomId, req.body.userId);
//       return res.json({
//         success: true,
//         message: "Room created",
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// ];

// async function getRoom(req, res, next) {
//   try {
//     const room = await db.getRoom(req.params.roomId);
//     if (!room) {
//       return res.json({
//         success: false,
//         message: "Room failed to fetch, try again",
//       });
//     }
//     return res.json({
//       success: true,
//       room: room,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  getUsersPosts,
  createPost,
  //   sendMessage,
  //   getRoom,
};
