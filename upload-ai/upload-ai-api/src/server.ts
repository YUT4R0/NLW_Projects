import { fastify } from 'fastify'
import { createTranscriptionRoute } from './routes/createTranscriptionRoute'
import { getAllPromptsRoute } from './routes/getAllPromptsRoute'
import { uploadVideoRoute } from './routes/uploadVideoRoute.1'

const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)

app
.listen({ port: 3333 })
.then(() => console.log('HTTP Server running on port http://localhost:3333/'))