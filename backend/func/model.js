// func/model.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createModel(name,brandId) {
    const newUser = await prisma.model.create({
        data: {
            name,
            brandId
        }
    });
    // console.log(newUser);
    return newUser
}

async function deleteModel() {
    await prisma.model.deleteMany()
}

module.exports = { createModel, deleteModel }