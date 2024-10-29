"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="block py-2 px-4 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
      {children}
    </Link>
  </li>
)

const NavDropdown = ({ title, items }: { title: string; items: { href: string; label: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-10">
          {items.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.label}
            </NavItem>
          ))}
        </ul>
      )}
    </li>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-800 dark:text-white">
              Logo
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <NavItem href="/">Inicio</NavItem>
              <NavDropdown
                title="Servicios"
                items={[
                  { href: "/servicios/web", label: "Desarrollo Web" },
                  { href: "/servicios/app", label: "Desarrollo de Apps" },
                  { href: "/servicios/ai", label: "IA y Machine Learning" },
                ]}
              />
              <NavItem href="/about">Acerca de</NavItem>
              <NavItem href="/contact">Contacto</NavItem>
            </ul>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem href="/">Inicio</NavItem>
            <NavDropdown
              title="Servicios"
              items={[
                { href: "/servicios/web", label: "Desarrollo Web" },
                { href: "/servicios/app", label: "Desarrollo de Apps" },
                { href: "/servicios/ai", label: "IA y Machine Learning" },
              ]}
            />
            <NavItem href="/about">Acerca de</NavItem>
            <NavItem href="/contact">Contacto</NavItem>
          </ul>
        </div>
      )}
    </nav>
  )
}