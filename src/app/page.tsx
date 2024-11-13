"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, signOut, useSession } from "next-auth/react"


export default function LoginPage() {
  const {data:session} = useSession()
  return (
   <>
   {session ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900">Bienvenido {session.user?.name ? session.user.name :"pepe"}</h1>
      <Link href="/whatsapp/chat" className="text-2xl font-bold text-center text-gray-900">Ir a inicio</Link>
      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300"
      onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
      >
        Sign out
      </button>
    </div>
   ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-900">Iniciar Sesión</h1>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Correo Electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        
        >
          Iniciar Sesión
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500">
          Regístrate
        </Link>
      </p>
      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300"
      onClick={() => signIn('google')}
      >
        Iniciar Sesión con Google
      </button>
      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300"
      onClick={() => signIn('facebook')}
      >
        Iniciar Sesión con Facebook
      </button>
      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300"
      onClick={() => signIn('github')}
      >
        Iniciar Sesión con GitHub
      </button>
    </div>
  </div>
   )}     

   </>
  )
}