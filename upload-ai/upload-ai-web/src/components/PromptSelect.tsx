import { api } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Prompt {
  id: string
  title: string
  template: string
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void
}

const PromptSelect: React.FC<PromptSelectProps> = ({ onPromptSelected }) => {
  const [Prompts, setPrompts] = useState<Prompt[] | null>(null);
  
  useEffect(() => {
    api
    .get('/prompts')
    .then(res => setPrompts(res.data))
  }, []);
  
  function handlePromptSelected(promptId: string) {
    const selectedPrompt = Prompts?.find(prompt => prompt.id === promptId)
    if (!selectedPrompt) return

    onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Select a prompt..." />
      </SelectTrigger>
      <SelectContent>
        {
          Prompts?.map(prompt => {
            return (
              <SelectItem key={prompt.id} value={prompt.id}>
                {prompt.title}
              </SelectItem>
            )
          })
        }
      </SelectContent>
    </Select>
  )
}

export default PromptSelect;