import { fastify } from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'main path'
})

app
.listen({ port: 3333 })
.then(() => console.log('HTTP Server running on port http://localhost:3333/'))