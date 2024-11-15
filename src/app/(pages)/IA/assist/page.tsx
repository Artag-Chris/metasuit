"use client"

import React, { useState } from 'react'
import { Send, Plus, Settings, Trash2, MessageCircle, Book, Smile, Meh, Frown } from 'lucide-react'
import { useThemeStore } from '@/store/ui/ThemeConfiguration'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Zustand store for the virtual assistant
interface AssistantState {
  conversations: { id: string; messages: { role: 'user' | 'assistant'; content: string }[] }[]
  currentConversationId: string | null
  assistantName: string
  assistantMood: 'happy' | 'neutral' | 'sad'
  addConversation: () => void
  addMessage: (role: 'user' | 'assistant', content: string) => void
  setCurrentConversation: (id: string) => void
  deleteConversation: (id: string) => void
  setAssistantName: (name: string) => void
  setAssistantMood: (mood: 'happy' | 'neutral' | 'sad') => void
}

const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      assistantName: 'AI Assistant',
      assistantMood: 'neutral',
      addConversation: () => {
        const newId = Date.now().toString()
        set((state) => ({
          conversations: [...state.conversations, { id: newId, messages: [] }],
          currentConversationId: newId,
        }))
      },
      addMessage: (role, content) => {
        set((state) => {
          const currentConversation = state.conversations.find(
            (c) => c.id === state.currentConversationId
          )
          if (!currentConversation) return state

          const updatedConversations = state.conversations.map((c) =>
            c.id === state.currentConversationId
              ? { ...c, messages: [...c.messages, { role, content }] }
              : c
          )

          return { conversations: updatedConversations }
        })
      },
      setCurrentConversation: (id) => set({ currentConversationId: id }),
      deleteConversation: (id) => {
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          currentConversationId:
            state.currentConversationId === id
              ? state.conversations.length > 1
                ? state.conversations.find((c) => c.id !== id)?.id || null
                : null
              : state.currentConversationId,
        }))
      },
      setAssistantName: (name) => set({ assistantName: name }),
      setAssistantMood: (mood) => set({ assistantMood: mood }),
    }),
    {
      name: 'assistant-storage',
    }
  )
)

export default function VirtualAssistant() {
  const { themes, currentThemeId } = useThemeStore()
  const currentTheme = themes.find((theme) => theme.id === currentThemeId) || themes[0]
  const {
    conversations,
    currentConversationId,
    assistantName,
    assistantMood,
    addConversation,
    addMessage,
    setCurrentConversation,
    deleteConversation,
    setAssistantName,
    setAssistantMood,
  } = useAssistantStore()

  const [userInput, setUserInput] = useState('')
  const [trainingInput, setTrainingInput] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleSendMessage = () => {
    if (userInput.trim()) {
      addMessage('user', userInput)
      setUserInput('')
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        addMessage('assistant', `Here's a response to: "${userInput}"`)
      }, 1000)
    }
  }

  const handleTrainAssistant = () => {
    if (trainingInput.trim()) {
      // Implement training logic here
      console.log('Training assistant with:', trainingInput)
      setTrainingInput('')
    }
  }

  const getMoodIcon = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy':
        return <Smile className="text-green-500" />
      case 'neutral':
        return <Meh className="text-yellow-500" />
      case 'sad':
        return <Frown className="text-red-500" />
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl" style={{ fontFamily: currentTheme.fontFamily, width: '100%', height: '100%', backgroundColor: 'white' }}>
      <h1 className="text-2xl font-bold mb-4" style={{ color: currentTheme.primary }}>
        Virtual Assistant Interface
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{assistantName}</span>
          {getMoodIcon(assistantMood)}
        </div>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assistant Settings</DialogTitle>
              <DialogDescription>Customize your virtual assistant here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  id="name"
                  value={assistantName}
                  onChange={(e) => setAssistantName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="mood" className="text-right">
                  Mood
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="col-span-3">
                      {getMoodIcon(assistantMood)}
                      <span className="ml-2">{assistantMood.charAt(0).toUpperCase() + assistantMood.slice(1)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={() => setAssistantMood('happy')}>
                      <Smile className="mr-2 h-4 w-4" />
                      <span>Happy</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAssistantMood('neutral')}>
                      <Meh className="mr-2 h-4 w-4" />
                      <span>Neutral</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAssistantMood('sad')}>
                      <Frown className="mr-2 h-4 w-4" />
                      <span>Sad</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="train">Train</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <div className="flex h-[600px]">
            <div className="w-1/4 pr-4 border-r" style={{ borderColor: currentTheme.primary }}>
              <Button onClick={addConversation} className="w-full mb-2">
                <Plus className="mr-2 h-4 w-4" /> New Chat
              </Button>
              <ScrollArea className="h-[540px]">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-2 mb-2 rounded cursor-pointer ${
                      conv.id === currentConversationId ? 'bg-primary text-primary-foreground' : ''
                    }`}
                    onClick={() => setCurrentConversation(conv.id)}
                    style={
                      conv.id === currentConversationId
                        ? { backgroundColor: currentTheme.primary, color: currentTheme.background }
                        : {}
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">
                        {conv.messages[0]?.content.substring(0, 20) || 'New Conversation'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteConversation(conv.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="w-3/4 pl-4 flex flex-col">
              <ScrollArea className="flex-grow mb-4 p-4 border rounded" style={{ borderColor: currentTheme.primary }}>
                <AnimatePresence>
                  {currentConversationId &&
                    conversations
                      .find((c) => c.id === currentConversationId)
                      ?.messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`mb-4 p-2 rounded ${
                            message.role === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-secondary'
                          }`}
                          style={
                            message.role === 'user'
                              ? { backgroundColor: currentTheme.primary, color: currentTheme.background }
                              : { backgroundColor: currentTheme.secondary, color: currentTheme.text }
                          }
                        >
                          {message.content}
                        </motion.div>
                      ))}
                </AnimatePresence>
              </ScrollArea>
              <div className="flex">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="train">
          <div className="space-y-4">
            <Textarea
              value={trainingInput}
              onChange={(e) => setTrainingInput(e.target.value)}
              placeholder="Enter new knowledge or instructions for the assistant..."
              className="min-h-[200px]"
            />
            <Button onClick={handleTrainAssistant}>
              <Book className="mr-2 h-4 w-4" /> Train Assistant
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}