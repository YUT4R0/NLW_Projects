import { OpenAIStream, streamToResponse } from 'ai';
import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { openai } from "../lib/openai";
import { prisma } from "../lib/prisma";

export async function generateAiCompletionRoute(app: FastifyInstance) {
	app.post('/ai/complete', async (req, res) => {
		const bodySchema = z.object({
			prompt: z.string(),
      videoId: z.string().uuid(),
      temperature: z.number().min(0).max(1).default(0.5),
		})
    const { prompt, temperature, videoId } = bodySchema.parse(req.body)
		
    const video = await prisma.video.findUniqueOrThrow({
			where: {
				id: videoId,
			}
		})
    if (!video.transcription) return res.status(400).send({ error: 'Video transcription was not generated yet.' })

    const promptMessage = prompt.replace('{transcription}', video.transcription)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        { role: 'user', content: promptMessage }
      ],
      stream: true,
		})
    
    const stream = OpenAIStream(response)

    // let netlify access node internal response 
    streamToResponse(stream, res.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }
    })
	})
}