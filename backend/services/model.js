const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 创建model
async function createModel(data) {
    const res = await prisma.model.create({
        data
    });
    return res;
}

// 更新model
async function updateModel(id, data) {
    const res = await prisma.model.update({
        where: { id },
        data
    });
    return res;
}

module.exports = { createModel, updateModel };
