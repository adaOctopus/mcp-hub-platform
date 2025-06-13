import { CheckCircle } from "lucide-react"

export default function WhoIsItFor() {
  return (
    <section id="who" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Who Is MCP Hub For?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Our platform serves two key audiences in the AI ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="rounded-xl border bg-card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-2xl font-bold mb-4">MCP Server Developers</h3>
            <p className="text-muted-foreground mb-6">
              Create and monetize specialized tools, data connectors, and services that extend AI capabilities
            </p>
            <ul className="space-y-3">
              {[
                "Monetize your specialized tools and APIs",
                "Reach a growing audience of AI builders",
                "Simple integration and deployment",
                "Built-in analytics and usage tracking",
                "Flexible pricing models",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-2xl font-bold mb-4">AI Solopreneurs & Startups</h3>
            <p className="text-muted-foreground mb-6">
              Discover and integrate powerful capabilities into your AI products without complex development
            </p>
            <ul className="space-y-3">
              {[
                "Instant access to hundreds of specialized tools",
                "No complex integration work required",
                "Pay-as-you-go pricing for most services",
                "Extend your AI product capabilities quickly",
                "Stay competitive with cutting-edge features",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
