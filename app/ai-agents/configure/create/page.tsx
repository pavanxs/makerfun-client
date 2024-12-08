'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import WorkflowBuilder from "@/components/workflow"


export default function BotCreatorForm() {
    const { toast } = useToast()
  const [formData, setFormData] = useState({
    Username: '',
    botkey: '',
    System: '',
    Behavior: '',
    RulesAndActions: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/save-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save bot')
      }
      
      toast({
        title: "Success!",
        description: "Bot configuration has been saved.",
      })

      // Clear form after successful submission
      setFormData({
        Username: '',
        botkey: '',
        System: '',
        Behavior: '',
        RulesAndActions: ''
      })

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save bot configuration.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container flex flex-row mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            AI Bot Creator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="Username" className="text-sm font-medium">
                  Bot Username
                </label>
                <Input
                  id="Username"
                  name="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  placeholder="Enter bot username"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="botkey" className="text-sm font-medium">
                  Bot Key
                </label>
                <Input
                  id="botkey"
                  name="botkey"
                  value={formData.botkey}
                  onChange={handleChange}
                  placeholder="Enter bot key"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="System" className="text-sm font-medium">
                System Prompt
              </label>
              <Textarea
                id="System"
                name="System"
                value={formData.System}
                onChange={handleChange}
                placeholder="Enter system prompt"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="Behavior" className="text-sm font-medium">
                Behavior Prompt
              </label>
              <Textarea
                id="Behavior"
                name="Behavior"
                value={formData.Behavior}
                onChange={handleChange}
                placeholder="Enter behavior prompt"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="RulesAndActions" className="text-sm font-medium">
                Rules and Actions
              </label>
              <Textarea
                id="RulesAndActions"
                name="RulesAndActions"
                value={formData.RulesAndActions}
                onChange={handleChange}
                placeholder="Enter rules and actions"
                className="min-h-[100px]"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create Bot
            </Button>
          </form>
        </CardContent>
      </Card>
      <WorkflowBuilder />
    </div>
  )
}