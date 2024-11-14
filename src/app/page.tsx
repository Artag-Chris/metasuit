"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { Button ,Input,Label } from "@/components"
import { signIn, signOut, useSession } from "next-auth/react"
import { useThemeStore } from '@/store'

export default function LoginPage() {
  const { data: session } = useSession()
  const { themes, currentThemeId, checkAndUpdateVersion } = useThemeStore()
  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0]

  useEffect(() => {
    checkAndUpdateVersion()
  }, [checkAndUpdateVersion])

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(to right, ${currentTheme.primary}, ${currentTheme.secondary})`,
    fontFamily: currentTheme.fontFamily,
  }

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '24rem',
    padding: `${currentTheme.spacing.large}px`,
    backgroundColor: currentTheme.background,
    borderRadius: `${currentTheme.borderRadius}px`,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  }

  const headingStyle: React.CSSProperties = {
    fontSize: `${currentTheme.fontSize.large}px`,
    fontWeight: 'bold',
    textAlign: 'center',
    color: currentTheme.text,
    marginBottom: `${currentTheme.spacing.medium}px`,
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: `${currentTheme.spacing.small}px`,
    border: `1px solid ${currentTheme.text}`,
    borderRadius: `${currentTheme.borderRadius}px`,
    marginBottom: `${currentTheme.spacing.small}px`,
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: `${currentTheme.spacing.small}px`,
    backgroundColor: currentTheme.primary,
    color: currentTheme.background,
    border: 'none',
    borderRadius: `${currentTheme.borderRadius}px`,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }

  const linkStyle: React.CSSProperties = {
    color: currentTheme.primary,
    textDecoration: 'none',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyle}>
      {session ? (
        <div style={cardStyle}>
          <h1 style={headingStyle}>Bienvenido {session.user?.name || "Usuario"}</h1>
          <Link href="/whatsapp/chat" style={{...linkStyle, display: 'block', textAlign: 'center', marginBottom: `${currentTheme.spacing.medium}px`}}>
            Ir a inicio
          </Link>
          <button
            style={buttonStyle}
            onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div style={cardStyle}>
          <h1 style={headingStyle}>Iniciar Sesión</h1>
          <form>
            <div style={{marginBottom: `${currentTheme.spacing.medium}px`}}>
              <Label htmlFor="email" style={{color: currentTheme.text, fontSize: `${currentTheme.fontSize.small}px`}}>
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                style={inputStyle}
                required
              />
            </div>
            <div style={{marginBottom: `${currentTheme.spacing.medium}px`}}>
              <Label htmlFor="password" style={{color: currentTheme.text, fontSize: `${currentTheme.fontSize.small}px`}}>
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                style={inputStyle}
                required
              />
            </div>
            <Button type="submit" style={buttonStyle}>
              Iniciar Sesión
            </Button>
          </form>
          <p style={{textAlign: 'center', fontSize: `${currentTheme.fontSize.small}px`, color: currentTheme.text, margin: `${currentTheme.spacing.medium}px 0`}}>
            ¿No tienes una cuenta?{" "}
            <Link href="/register" style={linkStyle}>
              Regístrate
            </Link>
          </p>
          <button
            style={{...buttonStyle, backgroundColor: currentTheme.secondary, marginBottom: `${currentTheme.spacing.small}px`}}
            onClick={() => signIn('google')}
          >
            Iniciar Sesión con Google
          </button>
          <button
            style={{...buttonStyle, backgroundColor: currentTheme.secondary, marginBottom: `${currentTheme.spacing.small}px`}}
            onClick={() => signIn('facebook')}
          >
            Iniciar Sesión con Facebook
          </button>
          <button
            style={{...buttonStyle, backgroundColor: currentTheme.secondary}}
            onClick={() => signIn('github')}
          >
            Iniciar Sesión con GitHub
          </button>
        </div>
      )}
    </div>
  )
}