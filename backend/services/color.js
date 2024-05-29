const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 创建颜色
async function createColor(data) {
    const res = await prisma.color.create({
        data
    });
    return res;
}

// 更新颜色
async function updateColor(id, data) {
    const res = await prisma.color.update({
        where: { id },
        data
    });
    return res;
}

module.exports = { createColor, updateColor };
