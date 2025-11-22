import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        phone: '11999999999',
        role: 'admin',
      },
      {
        name: 'Jane Smith',
        phone: '11888888888',
        role: 'admin',
      },
    ],
  })
}

main()
  .then(() => {
    console.log('Seed completed!')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    return prisma.$disconnect()
  })
