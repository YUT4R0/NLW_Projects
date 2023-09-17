import { api } from '@/lib/axios';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { FileVideo, Upload } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Converting...',
  generating: 'Transcripting...',
  uploading: 'Uploading...',
  success: 'Success!',
}

interface VideoInputFormProps {
  onVideoUploaded: (id: string) => void
}

const VideoInputForm: React.FC<VideoInputFormProps> = ({ onVideoUploaded }) => {
	const [VideoFile, setVideoFile] = useState<File | null>(null);
  const [Status, setStatus] = useState<Status>('waiting');
  
	const promptInputRef = useRef<HTMLTextAreaElement>(null)

	function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
		const { files } = event.currentTarget
		if (!files) {return}

		const selectedFile = files[0]
		setVideoFile(selectedFile)
	}

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await getFFmpeg()
    // create input.mp4 on ffmpeg container machine passing video file
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))
    //ffmpeg instructions sequence execution to convert input.mp4 to output.mp3 and store it on ffmpeg machine
    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])
    // read output.mp3
    const data = await ffmpeg.readFile('output.mp3')
    // create a native js file type based on a blob of output.mp3
    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg'
    })

    return audioFile
  }

	async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const prompt = promptInputRef.current?.value
		if (!VideoFile) {
      return
    }

    setStatus('converting')

    const audioFile = await convertVideoToAudio(VideoFile)
    const data = new FormData()
    data.append('file', audioFile)

    setStatus('uploading')

    const res = await api.post('/videos', data)
    const videoId = res.data.video.id

    setStatus('generating')
    // generate transcription
    await api.post(`/videos/${videoId}/transcription`, {
      prompt
    })

    setStatus('success')

    onVideoUploaded(videoId)
	}

	const previewURL = useMemo(() => {
		if (!VideoFile) return null

		return URL.createObjectURL(VideoFile)
	}, [VideoFile]);
	
  return (
    <form onSubmit={handleUploadVideo} className='space-y-6'>
      <label  
        htmlFor="video"
        className='
					relative
					w-full
          border
          flex
          rounded-md
          aspect-video
          cursor-pointer
          border-dashed
          flex-col
          gap-2
          text-sm
          items-center
          justify-center
          text-muted-foreground
          transition
          hover:bg-secondary/25
					'
      >
         {
					previewURL
					? (
						<video src={previewURL} controls={false} className='pointer-events-none absolute inset-0'/>
					)
					: (
						<>
							<FileVideo className='h-4 w-4'/>
        			Set a MP4 video type
						</>
					)
				 }
      </label>
      <input
				onChange={handleFileSelected}
				type="file"
				id="video"
				accept='video/mp4'
				className='sr-only'
			/>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
        <Textarea
					ref={promptInputRef}
          disabled={Status !== 'waiting'}
          id='transcription_prompt'
          className='h-24 leading-relaxed resize-none'
          placeholder='Please make sure to list all of the keywords mentioned in the video and separate them with commas ( , ).'
        />
      </div>

      <Button
        data-success={Status === 'success'}
        disabled={Status !== 'waiting'}
        type='submit'
        className='w-full data-[success=true]:bg-emerald-400'
      >
        {
          Status === 'waiting'
          ? (
            <>
              Load video
              <Upload className='w-4 h-4 ml-2' />
            </>
          )
          : statusMessages[Status]
        }
      </Button>
    </form>
  )
}

export default VideoInputForm;
