import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"
import { Target, Users, Award, Truck, Shield, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Curated Quality",
      description: "Every garment and accessory is handpicked to meet our premium quality standards.",
    },
    {
      icon: Users,
      title: "Style For All",
      description: "Fashion for men, women, and children. We believe everyone deserves to look and feel great.",
    },
    {
      icon: Award,
      title: "Trending Designs",
      description: "Stay ahead with the latest fashion trends curated by our expert styling team.",
    },
    {
      icon: Heart,
      title: "Sustainable Fashion",
      description: "Committed to eco-friendly materials and ethical manufacturing practices.",
    },
  ]

  const features = [
    "Free shipping on orders over $50",
    "30-day hassle-free returns and exchanges",
    "24/7 fashion customer support",
    "Secure payment processing",
    "Standard and express delivery options",
    "Quality guarantee on all garments",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton fallbackUrl="/" className="mb-4">
            Back to Home
          </BackButton>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-primary">E-Apparels</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are more than just an online store. We are your trusted fashion partner, curating the finest apparel,
            accessories, and footwear to help you express your unique style with confidence.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  To make fashion accessible, enjoyable, and empowering for everyone. We believe that great style
                  should not come at a premium, and everyone deserves access to quality apparel.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Since our founding, we have been committed to curating collections that blend timeless elegance with
                  contemporary trends, all backed by exceptional customer service.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <p className="text-muted-foreground mb-4">Happy Customers</p>
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <p className="text-muted-foreground mb-4">Orders Delivered</p>
                <div className="text-4xl font-bold text-primary mb-2">99.5%</div>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose E-Apparels?</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Get your orders delivered quickly with our reliable shipping partners nationwide.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Secure Shopping</h3>
                <p className="text-muted-foreground text-sm">
                  Shop with confidence knowing your data and payments are protected with industry-leading security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <Card className="mb-16">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              We are a passionate team of fashion enthusiasts, designers, and customer service experts dedicated to
              making your shopping experience exceptional.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Customer Service
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Product Curation
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Technology
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Logistics
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Marketing
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of satisfied customers and discover your next favorite product today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
