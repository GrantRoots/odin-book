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
    const allPosts = [...followingPosts, ...user.posts];
    // console.log(allPosts);
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
  getUserAndFollowingPosts,
  //   findUserId,
  createPost,
  //   sendMessage,
  //   getRoom,
};
