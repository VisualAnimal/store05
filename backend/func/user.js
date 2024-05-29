// index.js
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
    const users = await prisma.user.findMany()
    // console.log(users);
    return users
}

async function getUser(id) {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            followers: true,
            following: {
                include: {
                    followedUser: {
                        include: {
                            Product: {
                                take: 1
                            }
                        }
                    }
                }
            }
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