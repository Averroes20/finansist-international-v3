import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const price = await prisma.serviceFee.createMany({
    data: [
      {
        code: 'IDR',
        sort: 1,
        fee: 1000_000
      },
      {
        code: 'IDR',
        sort: 2,
        fee: 1500_000
      },
      {
        code: 'IDR',
        sort: 3,
        fee: 2000_000
      },
      {
        code: 'IDR',
        sort: 4,
        fee: 2000_000
      },
      {
        code: 'IDR',
        sort: 5,
        fee: 2000_000
      },
      {
        code: 'IDR',
        sort: 6,
        fee: 2000_000
      },
      {
        code: 'IDR',
        sort: 7,
        fee: 0
      },
      {
        code: 'IDR',
        sort: 8,
        fee: 2000_000
      },
      {
        code: 'USD',
        sort: 1,
        fee: 100
      },
      {
        code: 'USD',
        sort: 2,
        fee: 150
      },
      {
        code: 'USD',
        sort: 3,
        fee: 2000
      },
      {
        code: 'USD',
        sort: 4,
        fee: 2010
      },
      {
        code: 'USD',
        sort: 5,
        fee: 2000
      },
      {
        code: 'USD',
        sort: 6,
        fee: 200
      },
      {
        code: 'USD',
        sort: 7,
        fee: 0
      },
      {
        code: 'USD',
        sort: 8,
        fee: 200
      },
    ]
  })

  const social = await prisma.linkSocialMedia.createMany({
    data: [
      { label: 'Profile Company', url: 'https://www.youtube.com/embed/Fo93nnxN8EA?si=jAb9GEe7ziWzw6Z5', active: true },
      { label: 'Twitter', url: 'https://www.instagram.com/', active: true },
      { label: 'Instagram', url: 'https://www.twitter.com/', active: true },
      { label: 'LinkedIn', url: 'https://www.youtube.com/', active: true },
      { label: 'YouTube', url: 'https://www.linkedin.com/', active: true },
      { label: 'Tiktok', url: 'https://www.tiktok.com/', active: true },
      { label: 'Facebook', url: 'https://www.whatsapp.com/', active: true },
      { label: 'Email', url: 'hello@finansistinternational.com', active: true },
      { label: 'Phone', url: '6281211114994', active: true },
    ]
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })