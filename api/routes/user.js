const userRouter = require("express").Router();
const userController = require("../controllers/user");
const passport = require("passport");

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.logIn);

userRouter.get(
  "/requests",
  passport.authenticate("jwt", { session: false }),
  userController.getReqs
);
userRouter.post(
  "/requests/accept",
  passport.authenticate("jwt", { session: false }),
  userController.acceptReq
);
userRouter.post(
  "/requests/decline",
  passport.authenticate("jwt", { session: false }),
  userController.declineReq
);

userRouter.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.updateProfile
);

userRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getNotFollowing
);
userRouter.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

userRouter.post(
  "/follow",
  passport.authenticate("jwt", { session: false }),
  userController.sendFollowReq
);

module.exports = userRouter;
