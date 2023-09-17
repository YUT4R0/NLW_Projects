import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { createTranscriptionRoute } from './routes/createTranscriptionRoute'
import { generateAiCompletionRoute } from './routes/generateAiCompletionRoute'
import { getAllPromptsRoute } from './routes/getAllPromptsRoute'
import { uploadVideoRoute } from './routes/uploadVideoRoute'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAiCompletionRoute)

app
.listen({ port: 3333 })
.then(() => console.log('HTTP Server running on port http://localhost:3333/'))