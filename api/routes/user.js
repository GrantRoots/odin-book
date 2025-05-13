const userRouter = require("express").Router();
const userController = require("../controllers/user");

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.logIn);
userRouter.put("/", userController.updateProfile);

module.exports = userRouter;
