import Link from "next/link"
import { ArrowRight, Code, Zap, Layers } from "lucide-react"

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm mb-4">
              <span className="text-primary font-medium">Model Context Protocol</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              The <span className="gradient-text">Marketplace</span> for MCP Servers
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect AI agents to powerful MCP servers. Monetize your MCP servers or discover new capabilities for your
              AI products.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* GET EARLY ACCESS - Solid purple/blue color */}
            <Link
              href="#register"
              className="inline-flex items-center justify-center h-11 rounded-md px-8 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            {/* LEARN MORE - Grey-ish button */}
            <Link
              href="#why"
              className="inline-flex items-center justify-center h-11 rounded-md px-8 text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div className="relative w-full max-w-5xl mt-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl rounded-3xl -z-10"></div>
            <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-background/50 animate-float">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Develop</h3>
                  <p className="text-sm text-muted-foreground">Create and monetize your MCP servers</p>
                </div>
                <div
                  className="flex flex-col items-center text-center p-4 rounded-lg border bg-background/50 animate-float"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Connect</h3>
                  <p className="text-sm text-muted-foreground">Instantly integrate with any AI agent</p>
                </div>
                <div
                  className="flex flex-col items-center text-center p-4 rounded-lg border bg-background/50 animate-float"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Layers className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Scale</h3>
                  <p className="text-sm text-muted-foreground">Grow your AI business with powerful tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
