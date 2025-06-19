"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, Server, Cpu, Zap, CreditCard, Code, Play, Bot, Upload, DollarSign } from "lucide-react"

// Typing animation for search bar
const SearchTypingAnimation = () => {
  const [typedText, setTypedText] = useState("")
  const searchTerms = ["search for MCP servers"]
  const [currentTermIndex, setCurrentTermIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentTerm = searchTerms[currentTermIndex]

    if (isTyping) {
      if (typedText.length < currentTerm.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentTerm.slice(0, typedText.length + 1))
        }, 150)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (typedText.length > 0) {
        const timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setCurrentTermIndex((prev) => (prev + 1) % searchTerms.length)
          setIsTyping(true)
        }, 500)
        return () => clearTimeout(timeout)
      }
    }
  }, [typedText, currentTermIndex, isTyping, searchTerms])

  return (
    <div className="absolute left-3 top-2 text-sm text-foreground pointer-events-none">
      {typedText}
      <span className="animate-pulse">|</span>
    </div>
  )
}

// Cursor animation for clicking servers
const CursorAnimation = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 20, y: 20 })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Move cursor to different server positions
      const positions = [
        { x: 20, y: 20 }, // First server
        { x: 25, y: 52 }, // Second server
        { x: 30, y: 84 }, // Third server (selected)
        { x: 15, y: 116 }, // Fourth server
      ]

      setCursorPosition(positions[Math.floor(Date.now() / 2000) % positions.length])

      // Click animation
      setIsClicking(true)
      setTimeout(() => setIsClicking(false), 200)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute pointer-events-none transition-all duration-500 z-10"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: isClicking ? "scale(0.9)" : "scale(1)",
      }}
    >
      {/* Cursor pointer */}
      <div className="relative">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="drop-shadow-lg">
          <path d="M0 0L0 14L4 10L6 16L8 15L6 9L10 9L0 0Z" fill="#1F2937" stroke="#FFFFFF" strokeWidth="1" />
        </svg>

        {/* Click ripple effect */}
        {isClicking && (
          <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-primary rounded-full animate-ping"></div>
        )}
      </div>
    </div>
  )
}

// Simple Click and Play UI component
const ClickAndPlayUI = () => {
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsClicked((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 flex flex-col items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border">
      {/* Server Card */}
      <div className="bg-card border rounded-lg p-4 mb-6 shadow-sm w-64">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm">Email Service</div>
              <div className="text-xs text-muted-foreground">by SendGrid</div>
            </div>
          </div>

          {/* Click and Play Button */}
          <button
            className={cn(
              "flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300",
              isClicked ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90",
            )}
          >
            {isClicked ? (
              <>
                <CheckCircle className="h-3 w-3" />
                <span>Integrated!</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>Click</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center space-x-2 text-sm">
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-colors duration-300",
            isClicked ? "bg-green-500" : "bg-primary",
          )}
        ></div>
        <span className="text-muted-foreground">
          {isClicked ? "Ready to use in your app" : "One click to integrate"}
        </span>
      </div>
    </div>
  )
}

// Enhanced AI Robot Icon with cursor animation
const AIRobotIcon = () => {
  const [isActivated, setIsActivated] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: -30, y: -30 })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Move cursor to the AI icon
      setCursorPosition({ x: 0, y: 0 })

      // Click animation
      setTimeout(() => {
        setIsClicking(true)
        setIsActivated(true)
      }, 500)

      // Reset click state
      setTimeout(() => {
        setIsClicking(false)
      }, 700)

      // Reset everything for next cycle
      setTimeout(() => {
        setIsActivated(false)
        setCursorPosition({ x: -30, y: -30 })
      }, 2500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border relative">
      <div className="relative">
        {/* Robot Icon using Lucide Bot + custom styling */}
        <div
          className={cn(
            "w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300",
            isActivated
              ? "bg-gradient-to-br from-green-500 to-green-600"
              : "bg-gradient-to-br from-blue-500 to-blue-600",
          )}
        >
          <Bot className="h-12 w-12 text-white" />
        </div>

        {/* Glowing effect */}
        <div
          className={cn(
            "absolute inset-0 w-24 h-24 rounded-2xl blur-xl transition-colors duration-300",
            isActivated ? "bg-green-400/30" : "bg-blue-400/30",
          )}
        ></div>

        {/* Status indicators */}
        <div
          className={cn(
            "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
            isActivated ? "bg-green-500" : "bg-green-500",
          )}
        >
          {isActivated ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          ) : (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </div>

        {/* Connection lines */}
        <div
          className={cn(
            "absolute top-1/2 -left-8 w-6 h-0.5 transition-colors duration-300",
            isActivated ? "bg-green-400" : "bg-blue-400",
          )}
        ></div>
        <div
          className={cn(
            "absolute top-1/2 -right-8 w-6 h-0.5 transition-colors duration-300",
            isActivated ? "bg-green-400" : "bg-blue-400",
          )}
        ></div>
        <div
          className={cn(
            "absolute -top-8 left-1/2 w-0.5 h-6 transition-colors duration-300",
            isActivated ? "bg-green-400" : "bg-blue-400",
          )}
        ></div>
        <div
          className={cn(
            "absolute -bottom-8 left-1/2 w-0.5 h-6 transition-colors duration-300",
            isActivated ? "bg-green-400" : "bg-blue-400",
          )}
        ></div>

        {/* Animated cursor */}
        <div
          className="absolute pointer-events-none transition-all duration-500 z-10"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: isClicking ? "scale(0.9)" : "scale(1)",
          }}
        >
          <div className="relative">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="drop-shadow-lg">
              <path d="M0 0L0 14L4 10L6 16L8 15L6 9L10 9L0 0Z" fill="#1F2937" stroke="#FFFFFF" strokeWidth="1" />
            </svg>

            {/* Click ripple effect */}
            {isClicking && (
              <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-green-500 rounded-full animate-ping"></div>
            )}
          </div>
        </div>

        {/* Success message when activated */}
        {isActivated && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-green-600 font-medium text-sm whitespace-nowrap">
            AI Connected!
          </div>
        )}
      </div>
    </div>
  )
}

// Enhanced Server Upload with Quality Check Animation
const ServerUploadVisualization = () => {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "checking" | "approved">("idle")
  const [cursorPosition, setCursorPosition] = useState({ x: -30, y: 60 })
  const [isClicking, setIsClicking] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    const cycle = setInterval(() => {
      // Reset everything
      setUploadState("idle")
      setUploadProgress(0)
      setCursorPosition({ x: -30, y: 60 })

      // Move cursor to upload button
      setTimeout(() => {
        setCursorPosition({ x: 0, y: 60 })
      }, 500)

      // Click upload
      setTimeout(() => {
        setIsClicking(true)
        setUploadState("uploading")
      }, 1000)

      // Reset click
      setTimeout(() => {
        setIsClicking(false)
      }, 1200)

      // Upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            setUploadState("checking")
            return 100
          }
          return prev + 10
        })
      }, 100)

      // Quality check
      setTimeout(() => {
        setUploadState("approved")
      }, 2500)

      // Reset for next cycle
      setTimeout(() => {
        setCursorPosition({ x: -30, y: 60 })
      }, 4000)
    }, 5000)

    return () => clearInterval(cycle)
  }, [])

  return (
    <div className="h-64 flex flex-col items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border relative">
      {/* Server Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-20 bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg mx-auto relative shadow-lg">
          {/* Server units */}
          <div className="absolute top-2 left-2 right-2 h-4 bg-blue-500 rounded-sm"></div>
          <div className="absolute top-8 left-2 right-2 h-4 bg-blue-500 rounded-sm"></div>
          <div className="absolute top-14 left-2 right-2 h-4 bg-blue-500 rounded-sm"></div>

          {/* Status lights */}
          <div
            className={cn(
              "absolute top-3 right-3 w-2 h-2 rounded-full transition-colors duration-300",
              uploadState === "approved" ? "bg-green-400" : "bg-gray-400",
            )}
          ></div>
          <div
            className={cn(
              "absolute top-9 right-3 w-2 h-2 rounded-full transition-colors duration-300",
              uploadState === "approved" ? "bg-green-400" : "bg-gray-400",
            )}
          ></div>
          <div
            className={cn(
              "absolute top-15 right-3 w-2 h-2 rounded-full transition-colors duration-300",
              uploadState === "approved" ? "bg-green-400" : "bg-gray-400",
            )}
          ></div>

          {/* Quality check badge */}
          {uploadState === "approved" && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground text-center mt-2">MCP Server</div>
      </div>

      {/* Upload Button */}
      <div className="relative">
        <button
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative",
            uploadState === "uploading" || uploadState === "checking"
              ? "bg-primary/20 border-4 border-primary"
              : uploadState === "approved"
                ? "bg-green-500"
                : "bg-primary",
          )}
        >
          {uploadState === "uploading" || uploadState === "checking" ? (
            <div className="relative">
              <svg
                className="w-8 h-8 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  style={{ strokeDasharray: `${uploadProgress * 0.628}, 62.8` }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
            </div>
          ) : uploadState === "approved" ? (
            <CheckCircle className="h-8 w-8 text-white" />
          ) : (
            <Upload className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Animated cursor */}
        <div
          className="absolute pointer-events-none transition-all duration-500 z-10"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: isClicking ? "scale(0.9)" : "scale(1)",
          }}
        >
          <div className="relative">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="drop-shadow-lg">
              <path d="M0 0L0 14L4 10L6 16L8 15L6 9L10 9L0 0Z" fill="#1F2937" stroke="#FFFFFF" strokeWidth="1" />
            </svg>

            {/* Click ripple effect */}
            {isClicking && (
              <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-primary rounded-full animate-ping"></div>
            )}
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="mt-4 text-center">
        <div className="text-sm font-medium">
          {uploadState === "idle" && "Ready to Upload"}
          {uploadState === "uploading" && "Uploading..."}
          {uploadState === "checking" && "Quality Check..."}
          {uploadState === "approved" && "Approved & Live!"}
        </div>
      </div>
    </div>
  )
}

// Enhanced Money/Cashout Animation
const CashoutVisualization = () => {
  const [cashoutState, setCashoutState] = useState<"idle" | "processing" | "completed">("idle")
  const [cursorPosition, setCursorPosition] = useState({ x: -30, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [progressStep, setProgressStep] = useState(0)

  useEffect(() => {
    const cycle = setInterval(() => {
      // Reset everything
      setCashoutState("idle")
      setProgressStep(0)
      setCursorPosition({ x: -30, y: 0 })

      // Move cursor to money
      setTimeout(() => {
        setCursorPosition({ x: 0, y: 0 })
      }, 500)

      // Click to start cashout
      setTimeout(() => {
        setIsClicking(true)
        setCashoutState("processing")
      }, 1000)

      // Reset click
      setTimeout(() => {
        setIsClicking(false)
      }, 1200)

      // Progress steps
      setTimeout(() => setProgressStep(1), 1500)
      setTimeout(() => setProgressStep(2), 2000)
      setTimeout(() => setProgressStep(3), 2500)
      setTimeout(() => setCashoutState("completed"), 3000)

      // Reset for next cycle
      setTimeout(() => {
        setCursorPosition({ x: -30, y: 0 })
      }, 4500)
    }, 5500)

    return () => clearInterval(cycle)
  }, [])

  return (
    <div className="h-64 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border relative">
      {/* Money Stack */}
      <div className="relative mb-6">
        <div className="relative">
          {/* Dollar bills */}
          <div
            className={cn(
              "w-12 h-8 rounded-sm transform rotate-12 absolute transition-all duration-300",
              cashoutState === "completed" ? "bg-green-400" : "bg-green-500",
            )}
          ></div>
          <div
            className={cn(
              "w-12 h-8 rounded-sm transform -rotate-6 absolute left-2 transition-all duration-300",
              cashoutState === "completed" ? "bg-green-500" : "bg-green-600",
            )}
          ></div>
          <div
            className={cn(
              "w-12 h-8 rounded-sm transform rotate-3 absolute left-4 transition-all duration-300",
              cashoutState === "completed" ? "bg-green-300" : "bg-green-400",
            )}
          ></div>

          {/* Dollar sign */}
          <div className="relative z-10 w-16 h-10 flex items-center justify-center left-8">
            <DollarSign className="h-4 w-4 text-white font-bold" />
          </div>

          {/* Success checkmark */}
          {cashoutState === "completed" && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
          )}

          {/* Animated cursor */}
          <div
            className="absolute pointer-events-none transition-all duration-500 z-10"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: isClicking ? "scale(0.9)" : "scale(1)",
            }}
          >
            <div className="relative">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="drop-shadow-lg">
                <path d="M0 0L0 14L4 10L6 16L8 15L6 9L10 9L0 0Z" fill="#1F2937" stroke="#FFFFFF" strokeWidth="1" />
              </svg>

              {/* Click ripple effect */}
              {isClicking && (
                <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-green-500 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground text-center mt-2">Easy Payouts</div>
      </div>

      {/* Progress Flow */}
      <div className="flex items-center space-x-2 mb-4">
        <div
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            progressStep >= 1 ? "bg-green-500" : "bg-primary",
          )}
        ></div>
        <div
          className={cn("w-8 h-0.5 transition-all duration-300", progressStep >= 2 ? "bg-green-500" : "bg-primary/30")}
        ></div>
        <div
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            progressStep >= 2 ? "bg-green-500" : "bg-primary/30",
          )}
        ></div>
        <div
          className={cn("w-8 h-0.5 transition-all duration-300", progressStep >= 3 ? "bg-green-500" : "bg-primary/30")}
        ></div>
        <div
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            progressStep >= 3 ? "bg-green-500" : "bg-primary/30",
          )}
        ></div>
      </div>

      {/* Status text */}
      <div className="text-center">
        <div className="text-sm font-medium">
          {cashoutState === "idle" && "Ready to Cash Out"}
          {cashoutState === "processing" && "Processing Payment..."}
          {cashoutState === "completed" && "Payment Sent!"}
        </div>
      </div>
    </div>
  )
}

export default function ProblemSolutionTabs() {
  const [activeTab, setActiveTab] = useState<"entrepreneur" | "server-owner">("entrepreneur")

  return (
    <section id="how" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold" style={{letterSpacing: '-1px'}}><span className="gradient-text" >AI Agents & MCP</span> Integration Made Easy</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We solve key problems for AI entrepreneurs and MCP server owners.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border p-1 bg-card">
            <button
              onClick={() => setActiveTab("entrepreneur")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none",
                activeTab === "entrepreneur"
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              AI Entrepreneur
            </button>
            <button
              onClick={() => setActiveTab("server-owner")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none",
                activeTab === "server-owner"
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              MCP Server Owner
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {/* AI Entrepreneur Tab */}
          <div
            className={cn(
              "transition-all duration-300 transform",
              activeTab === "entrepreneur" ? "opacity-100 translate-y-0" : "opacity-0 absolute -translate-y-8",
            )}
          >
            {activeTab === "entrepreneur" && (
              <>
                {/* Problem/Solution Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4" style={{letterSpacing: '-1px'}}>For AI Entrepreneurs</h3>
                    <p className="text-muted-foreground mb-6">
                      Integrate powerful AI capabilities without the technical overhead or infrastructure management
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">No Local Servers Required</span>
                          <p className="text-sm text-muted-foreground">
                            Access powerful AI capabilities without running any servers locally
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Zero Coding Needed</span>
                          <p className="text-sm text-muted-foreground">
                            Integrate advanced AI features with simple API calls, no complex coding required
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Instant Integration</span>
                          <p className="text-sm text-muted-foreground">
                            Get up and running in minutes instead of weeks with our standardized protocols
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 bg-card rounded-xl border p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                        <Cpu className="h-10 w-10 text-primary" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Simplified AI Integration</h4>
                      <p className="text-muted-foreground">
                        Focus on building your product, not on managing complex AI infrastructure
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center p-3 rounded-lg border bg-background/50">
                          <Zap className="h-6 w-6 text-secondary mb-2" />
                          <span className="text-sm font-medium">Instant Access</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded-lg border bg-background/50">
                          <Code className="h-6 w-6 text-secondary mb-2" />
                          <span className="text-sm font-medium">Simple APIs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1: Browse Servers */}
                  <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <div className="h-48 bg-muted/30 rounded-lg mb-4 relative overflow-hidden border-2 border-muted/50">
                        {/* Browser-like header */}
                        <div className="h-8 bg-muted/50 border-b border-muted/30 flex items-center px-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                        </div>

                        {/* Search bar with typing animation */}
                        <div className="p-3 border-b border-muted/30">
                          <div className="relative">
                            <input
                              type="text"
                              className="w-full h-8 px-3 pr-8 rounded border bg-background/50 text-sm"
                              placeholder=""
                              readOnly
                            />
                            <SearchTypingAnimation />
                            <div className="absolute right-2 top-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-muted-foreground"
                              >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* MCP Server list */}
                        <div className="p-3 space-y-2 h-32 overflow-hidden relative">
                          {[
                            { name: "Weather API", color: "bg-blue-500" },
                            { name: "Database Connector", color: "bg-green-500" },
                            { name: "Email Service", color: "bg-purple-500", selected: true },
                            { name: "File Storage", color: "bg-orange-500" },
                            { name: "Payment Gateway", color: "bg-red-500" },
                            { name: "Analytics Tool", color: "bg-cyan-500" },
                          ].map((server, i) => (
                            <div
                              key={i}
                              className={cn(
                                "h-8 rounded flex items-center px-3 transition-all duration-300 cursor-pointer relative",
                                server.selected
                                  ? "bg-primary/20 border border-primary/50 shadow-lg"
                                  : "bg-muted/50 hover:bg-muted/70",
                              )}
                            >
                              <div className={cn("w-4 h-4 rounded mr-3", server.color)}></div>
                              <div className="flex-1 h-2 bg-muted rounded"></div>
                              {server.selected && <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>}
                            </div>
                          ))}

                          {/* Animated cursor */}
                          <CursorAnimation />
                        </div>

                        {/* Scroll indicator */}
                        <div className="absolute right-2 top-16 bottom-2 w-1 bg-muted/30 rounded-full">
                          <div className="w-full h-8 bg-primary rounded-full animate-bounce"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Click & Play */}
                  <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <ClickAndPlayUI />
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold mt-4">
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: AI Ready */}
                  <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <AIRobotIcon />
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mt-4">
                            3
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MCP Server Owner Tab */}
          <div
            className={cn(
              "transition-all duration-300 transform",
              activeTab === "server-owner" ? "opacity-100 translate-y-0" : "opacity-0 absolute -translate-y-8",
            )}
          >
            {activeTab === "server-owner" && (
              <>
                {/* Problem/Solution Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4" style={{letterSpacing: '-1px'}}>For MCP Server Owners</h3>
                    <p className="text-muted-foreground mb-6">
                      Monetize your specialized AI tools and services without the hassle of building business
                      infrastructure
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Fast Quality Verification</span>
                          <p className="text-sm text-muted-foreground">
                            Get your MCP server verified and listed quickly with our streamlined quality check process
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Built-in Payment Processing</span>
                          <p className="text-sm text-muted-foreground">
                            Monetize your services without implementing complex payment systems
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Instant Market Access</span>
                          <p className="text-sm text-muted-foreground">
                            Reach thousands of AI entrepreneurs looking for exactly what you offer
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 bg-card rounded-xl border p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                        <Server className="h-10 w-10 text-secondary" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Effortless Monetization</h4>
                      <p className="text-muted-foreground">
                        Focus on building great AI tools, we handle the business side
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center p-3 rounded-lg border bg-background/50">
                          <CreditCard className="h-6 w-6 text-primary mb-2" />
                          <span className="text-sm font-medium">Easy Payments</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded-lg border bg-background/50">
                          <Zap className="h-6 w-6 text-primary mb-2" />
                          <span className="text-sm font-medium">Quick Onboarding</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Submit Server */}
                  <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <ServerUploadVisualization />
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mt-4">
                            1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Easy Cashout */}
                  <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <CashoutVisualization />
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold mt-4">
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
