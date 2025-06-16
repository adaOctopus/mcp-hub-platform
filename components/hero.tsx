import Link from "next/link"
import HeroGlobe from "./hero-globe"

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
            {/* <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">
              <span className="text-primary font-medium">Model Context Protocol</span>
            </div> */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              <span className="gradient-text">Supercharge</span> your apps with AI Agents.
            </h1>
            <p className="text-xl text-muted-foreground">
              The easiest way to integrate & monetize MCP servers without writing any code. Connect your apps to any AI Agent incredibly fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* GET EARLY ACCESS - Solid purple/blue color */}
              <Link
                href="#register"
                className="inline-flex items-center justify-center h-11 rounded-md px-8 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Get Early Access
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>

              {/* LEARN MORE - Grey-ish button */}
              <Link
                href="#why"
                className="inline-flex items-center justify-center h-11 rounded-md px-8 text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* 3D Globe Visualization */}
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-3xl -z-10"></div>
              <div className="bg-card/50 backdrop-blur-sm border rounded-xl shadow-lg overflow-hidden p-4">
                <div className="relative">
                  <HeroGlobe />

                  {/* Legend overlay */}
                  <div className="absolute top-2 left-2 bg-background/70 backdrop-blur-sm p-2 rounded-lg border border-border/50 shadow-sm">
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>Users</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>AI Agents</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>MCP Servers</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search bar overlay */}
                {/* <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6">
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Search MCP servers..."
                      className="w-full h-10 pl-4 pr-10 rounded-md border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="absolute right-3 top-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-muted-foreground"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div> */}

                {/* Stats overlay */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm font-medium">15,473 Indexed</span>
                </div>
              </div>
            </div>

            {/* Feature highlights below the illustration */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center text-center p-3 rounded-lg border bg-card">
                <div className="text-primary font-semibold mb-1">Discover</div>
                <p className="text-xs text-muted-foreground">Discover MCP servers</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg border bg-card">
                <div className="text-primary font-semibold mb-1">Connect</div>
                <p className="text-xs text-muted-foreground">Instant AI integration</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg border bg-card">
                <div className="text-primary font-semibold mb-1">Monetize</div>
                <p className="text-xs text-muted-foreground">Your AI app or your MCP server</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
