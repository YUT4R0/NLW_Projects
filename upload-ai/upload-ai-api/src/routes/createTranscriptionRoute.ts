import { FastifyInstance } from "fastify";
import { z } from 'zod';

export async function createTranscriptionRoute(app: FastifyInstance) {
	app.post('/videos/:videoId/transcription', async (req) => {
		const paramsSchema = z.object({
			videoId: z.string().uuid()
		})

    const { videoId } = paramsSchema.parse(req.params)

		
	})
}