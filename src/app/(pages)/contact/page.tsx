"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/ui/ThemeConfiguration'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const employees = [
  { name: 'John Doe', role: 'CEO', image: '/placeholder.svg?height=100&width=100' },
  { name: 'Jane Smith', role: 'CTO', image: '/placeholder.svg?height=100&width=100' },
  { name: 'Mike Johnson', role: 'Lead Developer', image: '/placeholder.svg?height=100&width=100' },
  { name: 'Sarah Brown', role: 'Designer', image: '/placeholder.svg?height=100&width=100' },
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
]

export default function ContactPage() {
  const { themes, currentThemeId } = useThemeStore()
  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0]

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: currentTheme.background, color: currentTheme.text, fontFamily: currentTheme.fontFamily }}>
      <h1 className="text-4xl font-bold mb-8" style={{ color: currentTheme.primary }}>Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: currentTheme.secondary }}>Get in Touch</h2>
          <div className="space-y-4">
            <p className="flex items-center">
              <Mail className="mr-2" /> info@example.com
            </p>
            <p className="flex items-center">
              <Phone className="mr-2" /> +1 (123) 456-7890
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2" /> 123 Tech Street, Silicon Valley, CA 94000
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4" style={{ color: currentTheme.secondary }}>Follow Us</h2>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <link.icon size={24} style={{ color: currentTheme.primary }} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: currentTheme.secondary }}>Send us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded"
              style={{ backgroundColor: currentTheme.background, color: currentTheme.text, border: `1px solid ${currentTheme.primary}` }}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded"
              style={{ backgroundColor: currentTheme.background, color: currentTheme.text, border: `1px solid ${currentTheme.primary}` }}
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-2 rounded"
              style={{ backgroundColor: currentTheme.background, color: currentTheme.text, border: `1px solid ${currentTheme.primary}` }}
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 rounded font-semibold"
              style={{ backgroundColor: currentTheme.primary, color: currentTheme.background }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-6" style={{ color: currentTheme.secondary }}>Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {employees.map((employee, index) => (
          <motion.div
            key={employee.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundColor: currentTheme.background }}
          >
            <motion.img
              src={employee.image}
              alt={employee.name}
              className="w-full h-40 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="p-4">
              <h3 className="font-semibold" style={{ color: currentTheme.primary }}>{employee.name}</h3>
              <p style={{ color: currentTheme.text }}>{employee.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}