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

module.exports = { signUp, updateProfile };
