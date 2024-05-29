// func/brand.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createBrand(name) {
    const newUser = await prisma.brand.create({
        data: {
            name
        }
    });
    // console.log(newUser);
    return newUser
}

async function deleteBrand() {
    await prisma.brand.deleteMany()
}

module.exports = { createBrand, deleteBrand }