import { Github } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Separator } from './components/ui/separator'
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
          <form action=""></form>
        </aside>
      </main>
    </div>
  )
}

export default App
