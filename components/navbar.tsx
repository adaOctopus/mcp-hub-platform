"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container flex justify-between items-center h-16">
          <div className="font-bold text-xl">MCP Hub</div>
          <div className="w-10 h-10"></div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex justify-between items-center h-16">
        <div className="font-bold text-xl">
          <span className="gradient-text">MCP Hub</span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#why" className="hover:text-primary transition-colors">
            Why MCP Hub
          </Link>
          <Link href="#who" className="hover:text-primary transition-colors">
            Who is it for
          </Link>
          {/* <Link href="#register" className="hover:text-primary transition-colors">
            Register
          </Link> */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container flex flex-col py-4 space-y-3">
            <Link
              href="#why"
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why MCP Hub
            </Link>
            <Link
              href="#who"
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Who is it for
            </Link>
            <Link
              href="#register"
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={toggleTheme} className="flex items-center gap-2">
                {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
