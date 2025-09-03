import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  service: {
    id: number
    title: string
    description: string
    category: string
    rating: number
    reviews: number
    price: string
    provider: {
      name: string
      avatar: string
      verified: boolean
      completedProjects: number
    }
    tags: string[]
    deliveryTime: string
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-border bg-card">
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
        <CardDescription className="text-card-foreground/80 line-clamp-2">{service.description}</CardDescription>

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
            <p className="text-xs text-muted-foreground">{service.provider.completedProjects} completed projects</p>
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
  )
}
