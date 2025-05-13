const db = require("../queries/chatrooms");
const { body, validationResult } = require("express-validator");

async function showChatrooms(req, res, next) {
  try {
    const data = await db.getUserChatrooms(req.body.userId);
    res.json(data[0].chatrooms);
  } catch (error) {
    next(error);
  }
}

const validateSend = [
  body("recipientUsername").trim().notEmpty().escape(),
  body("message").trim().notEmpty().isLength({ max: 1000 }).escape(),
];

const createRoom = [
  validateSend,
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
      const recipient = await db.findUserId(req.body.recipientUsername);
      if (!recipient) {
        return res.json({
          success: false,
          message: "User doesn't exist",
        });
      }
      const recipientId = recipient.id;
      const sendersRooms = await db.getUserChatrooms(req.body.userId);
      const exists = sendersRooms[0].chatrooms.some((room) =>
        room.users.some((user) => user.id === recipientId)
      );
      if (exists) {
        return res.json({
          success: false,
          message: "Room already exists",
        });
      }

      await db.createRoom(req.body.userId, recipientId, req.body.message);
      return res.json({
        success: true,
        message: "Room created",
      });
    } catch (error) {
      next(error);
    }
  },
];

const validateMessage = [
  body("message").trim().notEmpty().isLength({ max: 1000 }).escape(),
];

const sendMessage = [
  validateMessage,
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
      await db.sendMessage(req.body.message, req.body.roomId, req.body.userId);
      return res.json({
        success: true,
        message: "Room created",
      });
    } catch (error) {
      next(error);
    }
  },
];

async function getRoom(req, res, next) {
  try {
    const room = await db.getRoom(req.params.roomId);
    if (!room) {
      return res.json({
        success: false,
        message: "Room failed to fetch, try again",
      });
    }
    return res.json({
      success: true,
      room: room,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showChatrooms,
  createRoom,
  sendMessage,
  getRoom,
};
