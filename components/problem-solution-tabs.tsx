"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, Server, Cpu, Zap, CreditCard, Code } from "lucide-react"

export default function ProblemSolutionTabs() {
  const [activeTab, setActiveTab] = useState<"entrepreneur" | "server-owner">("entrepreneur")

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Problems We Solve For You</h2>
          {/* <p className="text-xl text-muted-foreground max-w-2xl">
            MCP Hub addresses key challenges for both AI entrepreneurs and MCP server owners
          </p> */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">For AI Entrepreneurs</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">For MCP Server Owners</h3>
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
