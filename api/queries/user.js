const prisma = require("../prisma");

async function signUp(username, hashedPassword, firstName, lastName, author) {
  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      author: author,
    },
  });
}

async function updateProfile(newUsername, oldUsername) {
  await prisma.user.update({
    where: {
      username: oldUsername,
    },
    data: {
      username: newUsername,
    },
  });
}

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function sendFollowReq(followId, senderId) {
  followId = parseInt(followId);

  const user = await prisma.user.findUnique({
    where: {
      id: followId,
    },
    select: {
      followRequests: true,
    },
  });

  if (user.followRequests.includes(senderId)) {
    return false;
  }

  await prisma.user.update({
    where: {
      id: followId,
    },
    data: {
      followRequests: [...user.followRequests, senderId],
    },
  });
  return true;
}

async function getReqs(id) {
  try {
    return await prisma.user.findUnique({
      where: {},
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signUp,
  updateProfile,
  getAllUsers,
  sendFollowReq,
};
