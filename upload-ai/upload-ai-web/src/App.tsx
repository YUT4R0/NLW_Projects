import { useCompletion } from 'ai/react'
import { Github, Wand2 } from 'lucide-react'
import { useState } from 'react'
import PromptSelect from './components/PromptSelect'
import VideoInputForm from './components/VideoInputForm'
import { Button } from "./components/ui/button"
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Separator } from './components/ui/separator'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'

function App() {
  const [Temperature, setTemperature] = useState(0.5)
  const [VideoId, setVideoId] = useState<string | null>(null)
  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      VideoId,
      Temperature,
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
  
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
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Include the prompt for the AI...'
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              readOnly 
              className='resize-none p-4 leading-relaxed'
              placeholder='AI-generated result...'
              value={completion}
            />
          </div>
          <p className='text-sm text-muted-foreground'>
            Remember: You can use the <code className='text-violet-400'>{'{transcript}'}</code> variable in your prompt to add selected video transcript content.
          </p>
        </div>
        
        <aside className='w-80 space-y-6'>
          <VideoInputForm onVideoUploaded={setVideoId} />          

          <Separator />

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className="space-y-2">
              <Label>Prompt type</Label>
              <PromptSelect onPromptSelected={setInput} />
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
                step={0.1}
                value={[Temperature]}
                onValueChange={value => setTemperature(value[0])}
              />

              <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                The more intense the value, the greater the potential for creativity and mistakes. And vice versa.
              </span>
            </div>

            <Separator />

            <Button disabled={isLoading} type='submit' className='w-full'>
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
