// func/capacity.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createCapacity(name,modelId) {
    const newUser = await prisma.capacity.create({
        data: {
            name,
            modelId
        }
    });
    // console.log(newUser);
    return newUser
}

async function deleteCapacity() {
    await prisma.capacity.deleteMany()
}

module.exports = { createCapacity, deleteCapacity }