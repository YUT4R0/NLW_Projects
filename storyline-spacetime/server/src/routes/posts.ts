import { FastifyInstance } from 'fastify'

import { z } from 'zod'

import prisma from '../lib/prisma'

export default async function postsRoutes(app: FastifyInstance) {
  // will verify if all routes has access token before executing the app methods above
  app.addHook('preHandler', async (req) => {
    // this will let the app return only the posts from the registered user
    await req.jwtVerify()
  })

  // GET ALL POSTS
  app.get('/posts', async (req) => {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return posts.map((post) => {
      return {
        id: post.id,
        coverUrl: post.coverUrl,
        excerpt: post.content.substring(0, 100).concat('...'),
      }
    })
  })

  // GET SPECIFIC POST BY ID
  app.get('/posts/:id', async (req, reply) => {
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

    if (!post.isPublic && post.userId !== req.user.sub) {
      return reply.status(401).send()
    }

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
        userId: req.user.sub,
      },
    })

    return post
  })

  // PUT POST BY ID (UPDATE)
  app.put('/posts/:id', async (req, reply) => {
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

    let post = await prisma.post.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (post.userId !== req.user.sub) {
      return reply.status(401).send()
    }

    post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return post
  })

  // DELETE POST BY ID
  app.delete('/posts/:id', async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (post.userId !== req.user.sub) {
      return reply.status(401).send()
    }

    await prisma.post.delete({
      where: {
        id,
      },
    })
  })
}
