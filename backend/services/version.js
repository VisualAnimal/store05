const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 创建版本
async function createVersion(data) {
    const res = await prisma.version.create({
        data
    });
    return res;
}

// 更新版本
async function updateVersion(id, data) {
    const res = await prisma.version.update({
        where: { id },
        data
    });
    return res;
}

module.exports = { createVersion, updateVersion };
