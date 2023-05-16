import fastify from 'fastify'

import { PrismaClient } from '@prisma/client'

const app = fastify()
const port = 3333
const prisma = new PrismaClient()

app.listen({ port }).then(() => {
  console.log(`Server listening on port http://localhost:${port}`)
})

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})
