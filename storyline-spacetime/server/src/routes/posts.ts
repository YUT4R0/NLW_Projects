import { FastifyInstance } from 'fastify'

import prisma from '../lib/prisma'

export async function postsRoutes(app: FastifyInstance) {
  // list of all Posts
  app.get('/posts', async () => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return posts.map((post) => {
      return {
        id: post.id,
        coverUrl: post.coverUrl,
        excerpt: post.content.substring(0, 120).concat('...'),
      }
    })
  })
  // Specific Post details
  app.get('/posts/:id', async () => {})
  // Post creation
  app.post('/posts', async () => {})
  // Specific Post update
  app.put('/posts/:id', async () => {})
  // Specific Post delete
  app.delete('/posts/:id', async () => {})
}
