import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MCP Hub | Model Context Protocol Marketplace",
  description:
    "Connect AI agents to powerful MCP servers. Monetize your MCP servers or discover new capabilities for your AI products.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="mcp-theme">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
