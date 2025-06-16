"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Zap, DollarSign, Bot, Globe, ChevronLeft, ChevronRight } from "lucide-react"

const successStories = [
  {
    name: "Sarah Chen",
    title: "AI Email Assistant Founder",
    avatar: "/placeholder.svg?height=60&width=60",
    company: "MailGenius AI",
    achievement: "Connected to 47 AI agents",
    revenue: "$2.3M ARR",
    description: "Built an email automation MCP server that now powers AI assistants across 12 different platforms.",
    metrics: {
      agents: 47,
      users: "125K+",
      growth: "+340%",
    },
    tags: ["Email", "Automation", "Enterprise"],
  },
  {
    name: "Marcus Rodriguez",
    title: "Data Analytics Pioneer",
    avatar: "/placeholder.svg?height=60&width=60",
    company: "DataFlow MCP",
    achievement: "Integrated with 23 AI platforms",
    revenue: "$890K ARR",
    description: "Created a real-time analytics MCP server that helps AI agents make data-driven decisions instantly.",
    metrics: {
      agents: 23,
      users: "89K+",
      growth: "+280%",
    },
    tags: ["Analytics", "Real-time", "B2B"],
  },
  {
    name: "Elena Kowalski",
    title: "Payment Systems Expert",
    avatar: "/placeholder.svg?height=60&width=60",
    company: "PayMCP Solutions",
    achievement: "Powers 31 AI commerce bots",
    revenue: "$1.7M ARR",
    description:
      "Developed a secure payment processing MCP server that enables AI agents to handle transactions seamlessly.",
    metrics: {
      agents: 31,
      users: "200K+",
      growth: "+420%",
    },
    tags: ["Payments", "Security", "E-commerce"],
  },
  {
    name: "David Kim",
    title: "Content Generation Mogul",
    avatar: "/placeholder.svg?height=60&width=60",
    company: "ContentAI Hub",
    achievement: "Serves 52 AI writing tools",
    revenue: "$3.1M ARR",
    description:
      "Built a content generation MCP server that provides specialized writing capabilities to AI assistants worldwide.",
    metrics: {
      agents: 52,
      users: "300K+",
      growth: "+510%",
    },
    tags: ["Content", "Writing", "Creative"],
  },
  {
    name: "Priya Sharma",
    title: "Customer Support Innovator",
    avatar: "/placeholder.svg?height=60&width=60",
    company: "SupportMCP Pro",
    achievement: "Integrated with 38 AI chatbots",
    revenue: "$1.4M ARR",
    description:
      "Created a customer support MCP server that gives AI agents access to advanced ticketing and CRM systems.",
    metrics: {
      agents: 38,
      users: "180K+",
      growth: "+380%",
    },
    tags: ["Support", "CRM", "SaaS"],
  },
  {
    name: "Alex Thompson",
    title: "File Management Architect",
    avatar: "/placeholder.svg?height=60&width=60",
    company: "FileMCP Systems",
    achievement: "Connected to 29 AI platforms",
    revenue: "$750K ARR",
    description:
      "Developed a file management MCP server that allows AI agents to organize, search, and manipulate documents intelligently.",
    metrics: {
      agents: 29,
      users: "95K+",
      growth: "+290%",
    },
    tags: ["Files", "Storage", "Productivity"],
  },
]

const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    // Extract number from value string
    const numericValue = Number.parseInt(value.replace(/[^\d]/g, ""))
    const hasK = value.includes("K")
    const hasM = value.includes("M")
    const hasPlus = value.includes("+")
    const hasPercent = value.includes("%")

    let counter = 0
    const increment = Math.ceil(numericValue / 30) // Animate over ~30 frames

    const timer = setInterval(() => {
      counter += increment
      if (counter >= numericValue) {
        counter = numericValue
        clearInterval(timer)
      }

      let formattedValue = counter.toString()
      if (hasK) formattedValue += "K"
      if (hasM) formattedValue += "M"
      if (hasPlus) formattedValue += "+"
      if (hasPercent) formattedValue = "+" + formattedValue + "%"

      setDisplayValue(formattedValue)
    }, 50)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

const SuccessCard = ({ story }: { story: (typeof successStories)[0] }) => {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
      {/* Gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -mr-16 -mt-16"></div>

      <CardContent className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={story.avatar || "/placeholder.svg"}
            alt={story.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg">{story.name}</h3>
            <p className="text-sm text-muted-foreground">{story.title}</p>
            <p className="text-sm font-medium text-primary">{story.company}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              <AnimatedCounter value={story.revenue.replace("$", "").replace(" ARR", "")} />
              <span className="text-sm text-muted-foreground ml-1">ARR</span>
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="mb-4">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border-primary/30"
          >
            <Bot className="w-3 h-3 mr-1" />
            {story.achievement}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{story.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-primary mr-1" />
            </div>
            <div className="font-bold text-lg">
              <AnimatedCounter value={story.metrics.agents.toString()} />
            </div>
            <div className="text-xs text-muted-foreground">AI Agents</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-secondary mr-1" />
            </div>
            <div className="font-bold text-lg">
              <AnimatedCounter value={story.metrics.users} />
            </div>
            <div className="text-xs text-muted-foreground">Users</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            </div>
            <div className="font-bold text-lg text-green-600">
              <AnimatedCounter value={story.metrics.growth} />
            </div>
            <div className="text-xs text-muted-foreground">Growth</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {story.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DigitalEmpiresSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3) // lg: 3 cards
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2) // md: 2 cards
      } else {
        setCardsPerView(1) // sm: 1 card
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  const maxSlides = Math.max(0, successStories.length - cardsPerView)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1))
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [maxSlides])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-2px' }}>
            This is where <span className="gradient-text">digital empires</span> are built
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the entrepreneurs who used MCP Servers and AI agents to build their own digital empires.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={maxSlides === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-primary w-8" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={maxSlides === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
              }}
            >
              {successStories.map((story, index) => (
                <div key={story.name} className="flex-shrink-0 px-4" style={{ width: `${100 / cardsPerView}%` }}>
                  <SuccessCard story={story} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">
                <AnimatedCounter value="247" />
              </div>
              <div className="text-sm text-muted-foreground">Total AI Agents Connected</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">
                $<AnimatedCounter value="10" />
                M+
              </div>
              <div className="text-sm text-muted-foreground">Combined ARR Generated</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl font-bold mb-1">
                <AnimatedCounter value="989" />
                K+
              </div>
              <div className="text-sm text-muted-foreground">End Users Served</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold mb-1">
                <AnimatedCounter value="370" />%
              </div>
              <div className="text-sm text-muted-foreground">Average Growth Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
