const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createTagCategory = async (data) => {
    const result = await prisma.tagCategory.create({
        data
    })
    return result
}

const getTagCategory = async () => {
    const result = await prisma.tagCategory.findMany({
        include:{
            tags: true
        }
    })
    return result
}

module.exports = { createTagCategory, getTagCategory }