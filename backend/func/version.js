// func/version.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createVersion(name,modelId) {
    const newUser = await prisma.version.create({
        data: {
            name,
            modelId
        }
    });
    // console.log(newUser);
    return newUser
}

async function deleteVersion() {
    await prisma.version.deleteMany()
}

module.exports = { createVersion, deleteVersion }