"use client"

import { useState } from 'react'
import { Upload, Send, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

// Placeholder function for AI interaction
async function analyzeImage(image: File, question: string): Promise<string> {
  // This is where you'd integrate with your AI service
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Aquí está la respuesta de la IA sobre la imagen "${image.name}" a la pregunta: "${question}"`)
    }, 2000)
  })
}

export default function AIImageAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [question, setQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedImage && question) {
      setIsLoading(true)
      try {
        const response = await analyzeImage(selectedImage, question)
        setAiResponse(response)
        setIsDialogOpen(true)
      } catch (error) {
        console.error('Error analyzing image:', error)
        setAiResponse('Hubo un error al analizar la imagen. Por favor, inténtalo de nuevo.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Analizador de Imágenes con IA</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-upload">Subir Imagen</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Seleccionar Imagen
            </Button>
            {imagePreview && (
              <div className="relative w-16 h-16">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="object-cover w-full h-full rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="question">Pregunta sobre la imagen</Label>
          <Textarea
            id="question"
            placeholder="Haz una pregunta sobre la imagen..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" disabled={!selectedImage || !question || isLoading}>
          {isLoading ? 'Analizando...' : 'Analizar Imagen'}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Respuesta de la IA</DialogTitle>
            <DialogDescription>
              Análisis de la imagen basado en tu pregunta.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {imagePreview && (
              <div className="relative w-full h-48">
                <img
                  src={imagePreview}
                  alt="Imagen analizada"
                  className="object-contain w-full h-full"
                />
              </div>
            )}
            <p className="text-sm text-gray-500">{aiResponse}</p>
          </div>
          <Button onClick={() => setIsDialogOpen(false)}>Cerrar</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}