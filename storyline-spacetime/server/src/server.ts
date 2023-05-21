import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { resolve } from 'node:path'

import AuthRoutes from './routes/auth'
import postsRoutes from './routes/posts'
import { uploadRoutes } from './routes/upload'

const app = fastify()
const port = 3333

app
  .listen({
    port,
    host: '0.0.0.0', // mobile host for web browsers
  })
  .then(() => {
    console.log(`Server listening on port http://localhost:${port}`)
  })

// CORS settings: every fron-end url request has access
app.register(cors, {
  origin: true,
})

// secret is a way to diff "jwt generated by this backent" by "others jwt of others backends" (it's like a cryptograph)
app.register(jwt, {
  secret: 'soyoulikekissingboysdontyou',
})

// multipart form data handler
app.register(multipart)

// static makes the path folders public on http
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

// Routes
app.register(postsRoutes)
app.register(AuthRoutes)
app.register(uploadRoutes)
