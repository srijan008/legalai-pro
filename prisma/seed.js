const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash("admin123", 10)

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      passwordHash: password
    }
  })

  console.log("Seed user created!")
}

main().finally(() => prisma.$disconnect())
