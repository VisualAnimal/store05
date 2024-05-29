// follow.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function follow(id1, id2) {
    const follow = await prisma.follow.create({
        data: {
            followerId: id1,
            followedUserId: id2
        }
    })
    // console.log(follow);
    return follow
}

async function deleteFollow() {
    await prisma.follow.deleteMany()
}

async function updateFollowedUser(id, profit) {
    const followedUser = await prisma.follow.update({
        where: { id },
        data: { profit }
    })
    return followedUser
}

module.exports = { follow, deleteFollow, updateFollowedUser }