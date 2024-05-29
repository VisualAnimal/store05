const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 创建brand
async function createBrand(data) {
    const res = prisma.brand.create({
        data
    })
    return res
}

// 更新brand
async function updateBrand(id, data) {
    const res = await prisma.brand.update({
        where: { id },
        data
    })
    return res
}

module.exports = { createBrand, updateBrand }