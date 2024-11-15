"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Upload, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useThemeStore } from '@/store/ui/ThemeConfiguration'

// Placeholder function for AI interaction
async function analyzeImage(image: File, question: string): Promise<string> {
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
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)

  const { themes, currentThemeId, checkAndUpdateVersion } = useThemeStore()
  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0]

  useEffect(() => {
    checkAndUpdateVersion()
  }, [checkAndUpdateVersion])

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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = (event.clientX - left) / width * 100
      const y = (event.clientY - top) / height * 100
      setZoomPosition({ x, y })
    }
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    fontFamily: currentTheme.fontFamily,
    fontSize: `${currentTheme.fontSize.medium}px`,
    padding: `${currentTheme.spacing.large}px`,
    display: 'flex',
    flexDirection: 'column',
  }

  const headingStyle: React.CSSProperties = {
    fontSize: `${currentTheme.fontSize.large}px`,
    fontWeight: 'bold',
    color: currentTheme.primary,
    marginBottom: `${currentTheme.spacing.medium}px`,
  }

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: `${currentTheme.spacing.medium}px`,
  }

  const labelStyle: React.CSSProperties = {
    color: currentTheme.text,
    fontSize: `${currentTheme.fontSize.small}px`,
    fontWeight: 'bold',
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    border: `1px solid ${currentTheme.primary}`,
    borderRadius: `${currentTheme.borderRadius}px`,
    padding: `${currentTheme.spacing.small}px`,
    fontSize: `${currentTheme.fontSize.medium}px`,
  }

  const buttonStyle: React.CSSProperties = {
    backgroundColor: currentTheme.primary,
    color: currentTheme.background,
    border: 'none',
    borderRadius: `${currentTheme.borderRadius}px`,
    padding: `${currentTheme.spacing.small}px ${currentTheme.spacing.medium}px`,
    fontSize: `${currentTheme.fontSize.medium}px`,
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Analizador de Imágenes con IA</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <Label htmlFor="image-upload" style={labelStyle}>Subir Imagen</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: `${currentTheme.spacing.small}px` }}>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <Button
              type="button"
              onClick={() => document.getElementById('image-upload')?.click()}
              style={buttonStyle}
            >
              <Upload style={{ marginRight: '8px' }} /> Seleccionar Imagen
            </Button>
            {imagePreview && (
              <div style={{ width: '64px', height: '64px', position: 'relative' }}>
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: `${currentTheme.borderRadius}px` }}
                />
              </div>
            )}
          </div>
        </div>

        {imagePreview && (
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '400px', 
              overflow: 'hidden',
              borderRadius: `${currentTheme.borderRadius}px`,
            }}
            onMouseMove={handleMouseMove}
          >
            <img
              ref={imageRef}
              src={imagePreview}
              alt="Imagen completa"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
              }}
            />
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${imagePreview})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: '300%',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            />
          </div>
        )}

        <div>
          <Label htmlFor="question" style={labelStyle}>Pregunta sobre la imagen</Label>
          <Textarea
            id="question"
            placeholder="Haz una pregunta sobre la imagen..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ ...inputStyle, minHeight: '100px' }}
          />
        </div>

        <Button type="submit" disabled={!selectedImage || !question || isLoading} style={buttonStyle}>
          {isLoading ? 'Analizando...' : 'Analizar Imagen'}
          <Send style={{ marginLeft: '8px' }} />
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent style={{
          backgroundColor: currentTheme.background,
          color: currentTheme.text,
          borderRadius: `${currentTheme.borderRadius}px`,
          padding: `${currentTheme.spacing.large}px`,
        }}>
          <DialogHeader>
            <DialogTitle style={{ color: currentTheme.primary, fontSize: `${currentTheme.fontSize.large}px` }}>Respuesta de la IA</DialogTitle>
            <DialogDescription style={{ color: currentTheme.text, fontSize: `${currentTheme.fontSize.medium}px` }}>
              Análisis de la imagen basado en tu pregunta.
            </DialogDescription>
          </DialogHeader>
          <div style={{ display: 'grid', gap: `${currentTheme.spacing.medium}px`, padding: `${currentTheme.spacing.medium}px 0` }}>
            {imagePreview && (
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <img
                  src={imagePreview}
                  alt="Imagen analizada"
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
            )}
            <p style={{ fontSize: `${currentTheme.fontSize.small}px`, color: currentTheme.text }}>{aiResponse}</p>
          </div>
          <Button onClick={() => setIsDialogOpen(false)} style={buttonStyle}>Cerrar</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}