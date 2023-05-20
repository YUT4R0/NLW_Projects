import fastify from 'fastify'

import cors from '@fastify/cors'

import { postsRoutes } from './routes/posts'

const app = fastify()
const port = 3333

app.listen({ port }).then(() => {
  console.log(`Server listening on port http://localhost:${port}`)
})

app.register(postsRoutes)

app.register(cors, {
  origin: true, // every fron-end url request has access
})
