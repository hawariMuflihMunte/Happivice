"use client"

import { useState } from "react"
import { GoogleSignIn } from "@/components/google-sign-in"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

const services = [
  {
    id: 1,
    title: "Custom Website Development",
    description: "Professional responsive websites built with modern technologies like React, Next.js, and TypeScript.",
    category: "Technology",
    rating: 4.9,
    reviews: 127,
    price: "$2,500 - $15,000",
    provider: {
      name: "Alex Thompson",
      avatar: "/developer-working.png",
      verified: true,
      completedProjects: 89,
    },
    tags: ["React", "Next.js", "TypeScript", "Responsive Design"],
    deliveryTime: "2-4 weeks",
  },
  {
    id: 2,
    title: "Brand Identity & Logo Design",
    description: "Complete brand identity packages including logo design, color palettes, and brand guidelines.",
    category: "Creative",
    rating: 4.8,
    reviews: 203,
    price: "$800 - $3,500",
    provider: {
      name: "Sarah Martinez",
      avatar: "/diverse-designers-brainstorming.png",
      verified: true,
      completedProjects: 156,
    },
    tags: ["Logo Design", "Branding", "Adobe Creative Suite", "Brand Guidelines"],
    deliveryTime: "1-2 weeks",
  },
  {
    id: 3,
    title: "SEO & Digital Marketing Strategy",
    description: "Comprehensive SEO audits and digital marketing strategies to boost your online presence.",
    category: "Marketing",
    rating: 4.7,
    reviews: 89,
    price: "$1,200 - $5,000",
    provider: {
      name: "Michael Chen",
      avatar: "/marketer.png",
      verified: true,
      completedProjects: 67,
    },
    tags: ["SEO", "Google Ads", "Content Marketing", "Analytics"],
    deliveryTime: "1-3 weeks",
  },
  {
    id: 4,
    title: "Technical Content Writing",
    description: "High-quality technical documentation, blog posts, and copywriting for tech companies.",
    category: "Writing",
    rating: 4.9,
    reviews: 145,
    price: "$50 - $200/hour",
    provider: {
      name: "Emily Rodriguez",
      avatar: "/writer-at-desk.png",
      verified: true,
      completedProjects: 234,
    },
    tags: ["Technical Writing", "Blog Posts", "Documentation", "Copywriting"],
    deliveryTime: "3-7 days",
  },
  {
    id: 5,
    title: "Business Strategy Consulting",
    description: "Strategic business advice and growth planning for startups and established companies.",
    category: "Business",
    rating: 4.8,
    reviews: 76,
    price: "$150 - $300/hour",
    provider: {
      name: "David Kim",
      avatar: "/consultant-meeting.png",
      verified: true,
      completedProjects: 45,
    },
    tags: ["Strategy", "Business Planning", "Growth Hacking", "Market Analysis"],
    deliveryTime: "1-2 weeks",
  },
  {
    id: 6,
    title: "Video Production & Editing",
    description: "Professional video production, editing, and post-production services for all types of content.",
    category: "Creative",
    rating: 4.6,
    reviews: 92,
    price: "$1,000 - $8,000",
    provider: {
      name: "Jessica Park",
      avatar: "/videographer.jpg",
      verified: true,
      completedProjects: 78,
    },
    tags: ["Video Editing", "Motion Graphics", "Color Grading", "Sound Design"],
    deliveryTime: "1-3 weeks",
  },
]

const categories = ["All", "Technology", "Creative", "Marketing", "Writing", "Business"]

export default function ServicesPage() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("rating")

  const filteredServices = services
    .filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        case "price":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">Happivice</span>
            </Link>
            <GoogleSignIn />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Browse Services</h1>
            <p className="text-muted-foreground">Discover amazing services from verified providers</p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search services, skills, or providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredServices.length} of {services.length} services
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-200 border-border bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      {service.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-muted-foreground">({service.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="text-card-foreground text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-card-foreground/80 line-clamp-2">
                    {service.description}
                  </CardDescription>

                  {/* Provider Info */}
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <img
                      src={service.provider.avatar || "/placeholder.svg"}
                      alt={service.provider.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{service.provider.name}</span>
                        {service.provider.verified && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {service.provider.completedProjects} completed projects
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {service.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {service.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Price and Delivery */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="font-semibold text-foreground">{service.price}</p>
                      <p className="text-xs text-muted-foreground">Delivery: {service.deliveryTime}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Contact Provider</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No services found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
