const { PrismaClient } = require('@prisma/client');
const { getUser } = require('./user');
const prisma = new PrismaClient()

// 创建产品
async function createProduct(data) {
    const modifiedData = {
        ...data,
        userId: data.userId / process.env.USER_ID_SECRET// 将 userId 设置为指定的值
    };
    // console.log(modifiedData);
    const res = await prisma.product.create({
        data: modifiedData
    })
    return res
}

// 更新产品
async function updateProduct(id, data) {
    const res = await prisma.product.update({
        where: { id },
        data
    })
    return res
}

// 获取所有产品
async function getAllProducts() {
    const products = await prisma.product.findMany({
        include: {
            Brand: true,
            Model: true,
            Capacity: true,
            Color: true,
            Version: true
        }
    });
    return products;
}

// 查询产品，根据关注的商户查询
async function getFollowedUserProducts(userId) {
    userId /= process.env.USER_ID_SECRET
    // 获取用户关注的商户id
    const userInfo = await getUser(userId)
    console.log(userInfo)
    const followedUserIds = userInfo.following.map(entry => entry.followedUserId);

    // 根据商户id在产品表中查询产品
    const products = await prisma.product.findMany({
        where: {
            userId: { in: followedUserIds }
        },
        orderBy: {
            updateAt: 'desc'
        },
        include: {
            Brand: true,
            Model: true,
            Capacity: true,
            Color: true,
            Version: true,
        }
    });

    // 利润
    const productsWithProfit = products.map(product => {
        const user = userInfo.following.find(follow => follow.followedUserId === product.userId)
        return {
            ...product,
            profit: user ? user.profit : null
        }
    })
    return productsWithProfit;
}

module.exports = { createProduct, updateProduct, getFollowedUserProducts, getAllProducts };
