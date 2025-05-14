const prisma = require("../prisma");
const { all } = require("../routes/posts");

async function getPostsById(id) {
  id = parseInt(id);
  try {
    //get all users posts
    const usersPosts = await prisma.post.findMany({
      where: {
        userId: id,
      },
    });

    //find following posts
    const following = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        following: true,
      },
    });
    const allFollowingPosts = following.following.map(async (follow) => {
      let posts = await prisma.user.findMany({
        where: {
          id: follow,
        },
        include: {
          posts: true,
        },
      });
      return posts.posts;
    });

    //combine both and sort by date/time
    const allPosts = usersPosts.concat(allFollowingPosts);
    // const sortedPosts = allPosts.sort;
  } catch (error) {
    throw error;
  }
}

// async function findUserId(username) {
//   try {
//     return await prisma.user.findUnique({
//       where: {
//         username: username,
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// }

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

// async function sendMessage(message, roomId, userId) {
//   try {
//     await prisma.message.create({
//       data: {
//         content: message,
//         userId: parseInt(userId),
//         chatroomId: parseInt(roomId),
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// async function getRoom(roomId) {
//   try {
//     return await prisma.chatroom.findUnique({
//       where: {
//         id: parseInt(roomId),
//       },
//       include: {
//         users: true,
//         messages: true,
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  getPostsById,
  //   findUserId,
  createPost,
  //   sendMessage,
  //   getRoom,
};
