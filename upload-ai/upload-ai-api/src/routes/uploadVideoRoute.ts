import { fastifyMultipart } from '@fastify/multipart';
import { FastifyInstance } from "fastify";
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { prisma } from '../lib/prisma';

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
	app.register(fastifyMultipart, {
		limits: {
			fileSize: 1048576 * 100 //50mb
		}
	});
	app.post('/videos', async (req, res) => {
		const data = await req.file(); // example.mp3
		if (!data) return res.status(400).send({ error: 'Missing file input.' });

		const extension = path.extname(data.filename); // .mp3
		if (extension !== '.mp3') return res.status(400).send({ error: 'Invalid input type (accepts only mp3).' });

		const fileBaseName = path.basename(data.filename, extension); // example
		const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`; //example-10293948576.mp3

		const uploadDestination = path.resolve(__dirname, '../../temp', fileUploadName);

		await pump(data.file, fs.createWriteStream(uploadDestination));

		const video = await prisma.video.create({
			data: {
				name: data.filename,
				path: uploadDestination,
			}
		})

		return {
			video,
		}
	});
}
