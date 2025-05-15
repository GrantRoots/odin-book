const prisma = require("../prisma");

async function getUserAndFollowingPosts(id) {
  id = parseInt(id);
  try {
    //get all users posts
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });

    //find following posts
    const followingPosts = await Promise.all(
      user.following.map(async (follow) => {
        const followData = await prisma.user.findUnique({
          where: {
            id: parseInt(follow),
          },
          include: {
            posts: true,
          },
        });
        return followData.posts;
      })
    );

    //combine both and sort by date/time
    const allPosts = [...followingPosts.flat(), ...user.posts];
    const sortedPosts = allPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sortedPosts;
  } catch (error) {
    throw error;
  }
}

async function createPost(content, id) {
  id = parseInt(id);
  try {
    await prisma.post.create({
      data: {
        content: content,
        userId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserAndFollowingPosts,
  createPost,
};
