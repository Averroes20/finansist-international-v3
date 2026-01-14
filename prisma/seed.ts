import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      name: 'Admin',
      email: 'admin2@mail.com',
      password: 'admin1',
      role: 'admin',
    },
    {
      name: 'User Editor',
      email: 'editor@mail.com',
      password: 'editor123',
      role: 'editor',
    },
  ]

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
      },
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    })
  }

  console.log('✅ User seed completed')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
