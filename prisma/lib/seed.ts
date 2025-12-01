import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed completed!");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
