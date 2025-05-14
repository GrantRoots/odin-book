const postsRouter = require("express").Router();
const postsController = require("../controllers/posts");
const passport = require("passport");

postsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.getUsersPosts
);
postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.createPost
);
// postsRouter.get(
//   "/:postId",
//   passport.authenticate("jwt", { session: false }),
//   postsController.getPost
// );

module.exports = postsRouter;
