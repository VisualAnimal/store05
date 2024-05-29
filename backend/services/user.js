const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createUser(data) {
    const newUser = await prisma.user.create({
        data
    });
    // console.log(newUser);
    return newUser
}

async function deleteUsers() {
    await prisma.user.deleteMany()
}

async function getUsers() {
    const users = await prisma.user.findMany({
        include: {
            Product: true,
            _count: true
        }
    });

    // const updatedUsers = users.map(user => {
    //     const updatedFollowers = user.followers.map(follower => ({
    //         ...follower,
    //         followerId: follower.followerId * process.env.USER_ID_SECRET
    //     }));

    //     return {
    //         ...user,
    //         followers: updatedFollowers
    //     };
    // });

    // return updatedUsers;
    return users
}


async function getUser(id) {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            following: true
        }
    })
    // console.log(user);
    return user
}

async function getFollowedUsers(id) {
    const followedUsers = await prisma.user.findUnique({
        where: { id },
        select: {
            following: {
                select: {
                    followedUserId: true
                }
            }
        }
    });
    return followedUsers
}

module.exports = { createUser, getUser, getUsers, deleteUsers, getFollowedUsers }