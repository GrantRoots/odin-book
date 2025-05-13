const prisma = require("../prisma");

async function getUserChatrooms(id) {
  try {
    return await prisma.user.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        chatrooms: {
          include: {
            users: true,
            messages: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

async function findUserId(username) {
  try {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function createRoom(senderId, recipientId, message) {
  try {
    await prisma.chatroom.create({
      data: {
        users: {
          connect: [{ id: parseInt(senderId) }, { id: parseInt(recipientId) }],
        },
        messages: {
          create: {
            content: message,
            user: {
              connect: { id: parseInt(senderId) },
            },
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

async function sendMessage(message, roomId, userId) {
  try {
    await prisma.message.create({
      data: {
        content: message,
        userId: parseInt(userId),
        chatroomId: parseInt(roomId),
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getRoom(roomId) {
  try {
    return await prisma.chatroom.findUnique({
      where: {
        id: parseInt(roomId),
      },
      include: {
        users: true,
        messages: true,
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserChatrooms,
  findUserId,
  createRoom,
  sendMessage,
  getRoom,
};
