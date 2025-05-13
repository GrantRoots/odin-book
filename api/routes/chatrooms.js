const chatroomsRouter = require("express").Router();
const chatroomsController = require("../controllers/chatrooms");
const passport = require("passport");

chatroomsRouter.post("/", chatroomsController.showChatrooms);
chatroomsRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  chatroomsController.createRoom
);
chatroomsRouter.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  chatroomsController.sendMessage
);
chatroomsRouter.get(
  "/:roomId",
  passport.authenticate("jwt", { session: false }),
  chatroomsController.getRoom
);

module.exports = chatroomsRouter;
