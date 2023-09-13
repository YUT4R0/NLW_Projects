import { FileVideo, Github, Upload, Wand2 } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Separator } from './components/ui/separator'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Developed with 💜 :3</span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>

      <main className='flex-1 p-6 flex gap-6'>
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 flex-1 gap-4">
            <Textarea className='resize-none p-4 leading-relaxed' placeholder='Include the prompt for the AI...' />
            <Textarea className='resize-none p-4 leading-relaxed' placeholder='AI-generated result...' readOnly />
          </div>
          <p className='text-sm text-muted-foreground'>
            Remember: You can use the <code className='text-violet-400'>{'{transcript}'}</code> variable in your prompt to add selected video transcript content.
          </p>
        </div>
        
        <aside className='w-80 space-y-6'>
          <form className='space-y-6'>
            <label  
              htmlFor="video"
              className='w-full
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
                hover:bg-secondary/25'
            >
              <FileVideo className='h-4 w-4'/>
              Set a MP4 video type 
            </label>
            <input type="file" name="" id="video" accept='video/mp4' className='sr-only' />

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
              <Textarea
                id='transcription_prompt'
                className='h-24 leading-relaxed resize-none'
                placeholder='Please make sure to list all of the keywords mentioned in the video and separate them with commas ( , ).'
              />
            </div>

            <Button type='submit' className='w-full'>
              Load video
              <Upload className='w-4 h-4 ml-2' />
            </Button>
          </form>

          <Separator />

          <form className='space-y-6'>
            <div className="space-y-2">
              <Label>Prompt type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='title'>YouTube Title</SelectItem>
                  <SelectItem value='description'>YouTube Description</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Model</Label>
              <Select defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className='block text-xs text-muted-foreground italic'>
                You will be able to customize this option soon...
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperature</Label>
              <Slider
                min={0}
                max={1}
                step={.1}
              />

              <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                The more intense the value, the greater the potential for creativity and mistakes. And vice versa.
              </span>
            </div>

            <Separator />

            <Button type='submit' className='w-full'>
              Execute
              <Wand2 className='ml-2 h-4 w-4'/>
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}

export default App
