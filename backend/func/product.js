// func/product.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createProduct(data) {
    const product = await prisma.product.create({
        data: data
    })
    return product
}

async function deleteProduct() {
    await prisma.product.deleteMany()
}

async function getProducts() {
    const products = await prisma.product.findMany({
        include: {
            Brand: true,
            Model: true,
            Capacity: true,
            Color: true,
            Version: true
        }
    })
    return products
}

async function getFollowedUsersProducts(id) {
    // 获取当前用户关注的所有用户的 ID
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

    const followedUserIds = followedUsers.following.map(follow => follow.followedUserId);

    // 分页查询关注用户的产品
    const products = await prisma.product.findMany({
        where: {
            userId: { in: followedUserIds }
        },
        orderBy: {
            updateAt: 'desc'
        }
        // skip: (page - 1) * pageSize,
        // take: pageSize
    });

    return products;
}

async function getFollowedUsersProductsWithProfit(id) {
    // 获取当前用户关注的所有用户的 ID 和利润值
    const followedUsers = await prisma.user.findUnique({
        where: { id },
        select: {
            following: {
                select: {
                    followedUserId: true,
                    profit: true // 假设你在模型中有一个 profit 字段
                }
            }
        }
    });

    const followedUserIds = followedUsers.following.map(follow => follow.followedUserId);

    // 分页查询关注用户的产品
    const products = await prisma.product.findMany({
        where: {
            userId: { in: followedUserIds }
        },
        orderBy:{
            updateAt: 'desc'
        },
        // skip: (page - 1) * pageSize,
        // take: pageSize
    });

    // 将产品和利润值结合起来
    const productsWithProfit = products.map(product => {
        const user = followedUsers.following.find(follow => follow.followedUserId === product.userId);
        return {
            ...product,
            profit: user ? user.profit : null
        };
    });

    return productsWithProfit;
}

async function updateProduct(id,data) {
    const product = await prisma.product.update({
        where:{id},
        data
    })
    return product
}

module.exports = { updateProduct, createProduct, deleteProduct, getProducts, getFollowedUsersProducts, getFollowedUsersProductsWithProfit }