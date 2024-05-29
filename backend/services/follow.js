const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFollows = async (id) => {
    const data = await prisma.follow.findMany({
        where: {
            followerId: id
        },
        include:{
            followedUser: true,
        }
    })
    return data
}

// 创建关注
async function createFollow(data) {
    const follow = await prisma.follow.create({
        data
    });

    return follow;
}

// 更新关注
async function updateFollow(id, data) {
    const updatedFollow = await prisma.follow.update({
        where: { id },
        data
    });

    return updatedFollow;
}

// 取消关注
async function deleteFollow(id) {
    const result = await prisma.follow.delete({
        where: {
            id
        }
    });

    return result;
}



module.exports = { createFollow, updateFollow, deleteFollow ,getFollows};
