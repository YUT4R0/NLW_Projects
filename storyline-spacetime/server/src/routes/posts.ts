import { FastifyInstance } from 'fastify'

import { z } from 'zod'

import prisma from '../lib/prisma'

export async function postsRoutes(app: FastifyInstance) {
  // GET ALL POSTS
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

  // GET SPECIFIC POST BY ID
  app.get('/posts/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    // req.params is always an object
    // passing the req.params to the paramsSchema
    const { id } = paramsSchema.parse(req.params)

    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return post
  })

  // POST A POST
  app.post('/posts', async (req) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(req.body)

    const post = await prisma.post.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '3cbd9d77-5d94-43f9-b5b5-46c3910903f3',
      },
    })

    return post
  })

  // PUT POST BY ID (UPDATE)
  app.put('/posts/:id', async (req) => {
    // params validation
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    // content that will be updated
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return updatedPost
  })

  // DELETE POST BY ID
  app.delete('/posts/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    await prisma.post.delete({
      where: {
        id,
      },
    })
  })
}
