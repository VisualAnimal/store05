const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAttribute() {
    try {
        const res = await prisma.brand.findMany({
            include: {
                Model: {
                    include: {
                        Capacity: true,
                        Color: true,
                        Version: true
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.error('Error fetching attributes:', error);
        throw new Error('Failed to fetch attributes');
    }
}

module.exports = { getAttribute };
