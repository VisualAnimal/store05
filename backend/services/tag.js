const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createTag = async (data) => {
    const result = await prisma.tag.create({
        data
    })
    return result
}

const getTag = async (data) => {
    const result = await prisma.tag.findMany()
    return result
}

module.exports = { createTag, getTag }