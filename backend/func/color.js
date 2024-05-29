// func/color.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createColor(name, modelId) {
    const newUser = await prisma.color.create({
        data: {
            name,
            modelId
        }
    });
    // console.log(newUser);
    return newUser
}

async function deleteColor() {
    await prisma.color.deleteMany()
}

module.exports = { createColor, deleteColor }