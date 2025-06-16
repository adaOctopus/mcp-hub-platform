import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Globe, Cpu, Lock, Coins, Rocket } from "lucide-react"

export default function WhyUseSection() {
  return (
    <section id="why" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Use MCP Hub</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The Model Context Protocol is revolutionizing how AI agents interact with external tools and data sources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader className="pb-2">
              <Cpu className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Superpowers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily add AI to your apps and scale your products without the hassle of running servers locally or coding yourself.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Database className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Standardized Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect once, access hundreds of tools. MCP standardizes how AI models interact with external systems.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Coins className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Monetization Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built-in infrastructure for developers to monetize their MCP servers and specialized tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Globe className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Universal Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Works with all major AI models and frameworks. Build once, deploy everywhere.
              </CardDescription>
            </CardContent>
          </Card>

          

          <Card>
            <CardHeader className="pb-2">
              <Lock className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Secure & Controlled</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Maintain control over your data and tools while providing secure access to AI models.
              </CardDescription>
            </CardContent>
          </Card>

          

          <Card>
            <CardHeader className="pb-2">
              <Rocket className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Future-Proof</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                As AI evolves, MCP adapts. Stay ahead with the latest protocol updates and features.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
