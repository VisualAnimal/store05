const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 创建容量
async function createCapacity(data) {
    const res = await prisma.capacity.create({
        data
    });
    return res;
}

// 更新容量
async function updateCapacity(id, data) {
    const res = await prisma.capacity.update({
        where: { id },
        data
    });
    return res;
}

module.exports = { createCapacity, updateCapacity };