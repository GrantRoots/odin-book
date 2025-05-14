const userRouter = require("express").Router();
const userController = require("../controllers/user");

userRouter.put("/", userController.updateProfile);
userRouter.get("/", userController.getAllUsers);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.logIn);
userRouter.post(
  "/follow",
  passport.authenticate("jwt", { session: false }),
  userController.sendFollowReq
);
userRouter.get(
  "/requests",
  passport.authenticate("jwt", { session: false }),
  userController.getReqs
);

module.exports = userRouter;
