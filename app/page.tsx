import { GoogleSignIn } from "@/components/google-sign-in"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">Happivice</span>
          </div>
          <GoogleSignIn />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Discover Amazing Services
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Connect with trusted service providers and unlock a world of possibilities. Sign in with Google to get
            started and browse our curated collection of services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GoogleSignIn />
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Services</h2>
            <p className="text-muted-foreground text-lg">Explore our most requested services from verified providers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Web Development",
                description: "Custom websites and web applications built by expert developers",
                category: "Technology",
                rating: "4.9",
                providers: "150+",
              },
              {
                title: "Graphic Design",
                description: "Professional logos, branding, and visual design services",
                category: "Creative",
                rating: "4.8",
                providers: "200+",
              },
              {
                title: "Digital Marketing",
                description: "SEO, social media, and online advertising campaigns",
                category: "Marketing",
                rating: "4.7",
                providers: "120+",
              },
              {
                title: "Content Writing",
                description: "High-quality articles, blogs, and copywriting services",
                category: "Writing",
                rating: "4.9",
                providers: "180+",
              },
              {
                title: "Business Consulting",
                description: "Strategic advice and business development guidance",
                category: "Business",
                rating: "4.8",
                providers: "90+",
              },
              {
                title: "Video Production",
                description: "Professional video editing and production services",
                category: "Creative",
                rating: "4.6",
                providers: "75+",
              },
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      {service.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span className="text-yellow-500">★</span>
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-card-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-card-foreground/80">{service.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{service.providers} providers</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/services">View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/services">Browse All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied customers who found their perfect service match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                content:
                  "Found an amazing web developer through Happivice. The process was seamless and the results exceeded my expectations!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Marketing Director",
                content:
                  "The quality of service providers on this platform is outstanding. Highly recommend for any business needs.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Startup Founder",
                content:
                  "Saved me weeks of searching. The Google sign-in made it so easy to get started and find exactly what I needed.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-muted border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join our community today and discover the perfect service for your needs. It only takes a few seconds to
            sign up with Google.
          </p>
          <GoogleSignIn />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">H</span>
                </div>
                <span className="font-bold text-foreground">Happivice</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your trusted platform for discovering and connecting with amazing service providers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Writing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">© 2024 Happivice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
