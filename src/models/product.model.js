import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
module.exports = {
    getProducts: async function () {
        // let result = await prisma.products.findMany();
    },
}