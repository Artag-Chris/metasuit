'use client'

import { useState, useEffect } from 'react'
import { useThemeStore, Theme } from '@/store/ui/ThemeConfiguration'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ThemeConfigurator() {
  const { themes, currentThemeId, addTheme, updateTheme, setCurrentTheme, resetTheme } = useThemeStore()
  const [localTheme, setLocalTheme] = useState<Theme>(themes.find(t => t.id === currentThemeId) || themes[0])

  useEffect(() => {
    setLocalTheme(themes.find(t => t.id === currentThemeId) || themes[0])
  }, [currentThemeId, themes])

  const handleColorChange = (key: keyof Pick<Theme, 'primary' | 'secondary' | 'background' | 'text'>, value: string) => {
    setLocalTheme({ ...localTheme, [key]: value })
  }

  const handleBorderRadiusChange = (value: number) => {
    setLocalTheme({ ...localTheme, borderRadius: value })
  }

  const handleFontChange = (value: string) => {
    setLocalTheme({ ...localTheme, fontFamily: value })
  }

  const handleFontSizeChange = (key: keyof Theme['fontSize'], value: number) => {
    setLocalTheme({ ...localTheme, fontSize: { ...localTheme.fontSize, [key]: value } })
  }

  const handleSpacingChange = (key: keyof Theme['spacing'], value: number) => {
    setLocalTheme({ ...localTheme, spacing: { ...localTheme.spacing, [key]: value } })
  }

  const saveTheme = () => {
    updateTheme(localTheme.id, localTheme)
  }

  const createNewTheme = () => {
    const newTheme: Theme = {
      ...localTheme,
      id: `custom-${Date.now()}`,
      name: `Custom Theme ${themes.length + 1}`,
    }
    addTheme(newTheme)
    setCurrentTheme(newTheme.id)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configuración de Tema</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Selección de Tema</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={currentThemeId} onValueChange={setCurrentTheme}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar tema" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={createNewTheme} className="ml-2">Crear Nuevo Tema</Button>
          <Button onClick={() => resetTheme(currentThemeId)} className="ml-2">Restablecer Tema</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Colores</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {(['primary', 'secondary', 'background', 'text'] as const).map((colorKey) => (
            <div key={colorKey}>
              <Label htmlFor={colorKey}>{colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={colorKey}
                    variant="outline"
                    className="w-[200px] justify-start text-left font-normal"
                    style={{ backgroundColor: localTheme[colorKey] }}
                  >
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: localTheme[colorKey] }} />
                    {localTheme[colorKey]}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Seleccionar color</h4>
                      <Input
                        type="color"
                        value={localTheme[colorKey]}
                        onChange={(e) => handleColorChange(colorKey, e.target.value)}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Bordes</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="borderRadius">Radio de bordes</Label>
          <Slider
            id="borderRadius"
            min={0}
            max={20}
            step={1}
            value={[localTheme.borderRadius]}
            onValueChange={(value) => handleBorderRadiusChange(value[0])}
            className="w-[60%]"
          />
          <span className="ml-2">{localTheme.borderRadius}px</span>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Tipografía</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="fontFamily">Fuente</Label>
          <Select value={localTheme.fontFamily} onValueChange={handleFontChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar fuente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial, sans-serif">Arial</SelectItem>
              <SelectItem value="Helvetica, sans-serif">Helvetica</SelectItem>
              <SelectItem value="Georgia, serif">Georgia</SelectItem>
              <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
              <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Tamaños de Fuente</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <div key={size}>
              <Label htmlFor={`fontSize-${size}`}>{size.charAt(0).toUpperCase() + size.slice(1)}</Label>
              <Slider
                id={`fontSize-${size}`}
                min={8}
                max={32}
                step={1}
                value={[localTheme.fontSize[size]]}
                onValueChange={(value) => handleFontSizeChange(size, value[0])}
                className="w-[90%]"
              />
              <span className="ml-2">{localTheme.fontSize[size]}px</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Espaciado</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <div key={size}>
              <Label htmlFor={`spacing-${size}`}>{size.charAt(0).toUpperCase() + size.slice(1)}</Label>
              <Slider
                id={`spacing-${size}`}
                min={4}
                max={48}
                step={1}
                value={[localTheme.spacing[size]]}
                onValueChange={(value) => handleSpacingChange(size, value[0])}
                className="w-[90%]"
              />
              <span className="ml-2">{localTheme.spacing[size]}px</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Vista Previa</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{
            backgroundColor: localTheme.background,
            color: localTheme.text,
            fontFamily: localTheme.fontFamily,
            padding: localTheme.spacing.medium,
            borderRadius: localTheme.borderRadius,
          }}>
            <h2 style={{ fontSize: localTheme.fontSize.large, marginBottom: localTheme.spacing.small }}>Título de Ejemplo</h2>
            <p style={{ fontSize: localTheme.fontSize.medium, marginBottom: localTheme.spacing.medium }}>
              Este es un párrafo de ejemplo para mostrar cómo se ven los diferentes estilos aplicados.
            </p>
            <button style={{
              backgroundColor: localTheme.primary,
              color: localTheme.background,
              padding: `${localTheme.spacing.small}px ${localTheme.spacing.medium}px`,
              borderRadius: localTheme.borderRadius,
              fontSize: localTheme.fontSize.small,
              border: 'none',
            }}>
              Botón de Ejemplo
            </button>
          </div>
        </CardContent>
      </Card>

      <Button onClick={saveTheme} className="mt-4">
        Guardar Tema
      </Button>
    </div>
  )
}