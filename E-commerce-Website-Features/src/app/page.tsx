import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

const featuredProducts = [
  {
    id: "1",
    name: "Leather Crossbody Bag",
    price: 149.99,
    imageSrc: "/WhatsApp Image 2025-06-25 at 20.36.40_b1bd0b6c.jpg",
    category: "Bags",
    slug: "leather-crossbody-bag"
  },
  {
    id: "2",
    name: "Cashmere Sweater",
    price: 199.99,
    originalPrice: 249.99,
    imageSrc: "/WhatsApp Image 2025-06-25 at 20.39.50_1fef44ef.jpg",
    category: "Clothing",
    isNew: true,
    slug: "cashmere-sweater"
  },
  {
    id: "3",
    name: "Gold Statement Earrings",
    price: 89.99,
    imageSrc: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    category: "Jewelry",
    slug: "gold-statement-earrings"
  },
  {
    id: "4",
    name: "Silk Scarf",
    price: 79.99,
    originalPrice: 99.99,
    imageSrc: "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    slug: "silk-scarf"
  }
];

const newArrivals = [
  {
    id: "5",
    name: "Premium Leather Boots",
    price: 299.99,
    imageSrc: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
    category: "Footwear",
    isNew: true,
    slug: "premium-leather-boots"
  },
  {
    id: "6",
    name: "Evening Clutch",
    price: 129.99,
    imageSrc: "https://images.unsplash.com/photo-1566150905458-1bf1fc113c0d?q=80&w=800&auto=format&fit=crop",
    category: "Bags",
    isNew: true,
    slug: "evening-clutch"
  },
  {
    id: "7",
    name: "Silk Blouse",
    price: 149.99,
    imageSrc: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?q=80&w=800&auto=format&fit=crop",
    category: "Clothing",
    isNew: true,
    slug: "silk-blouse"
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Hero image"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-serif text-4xl md:text-6xl mb-4 tracking-wide">Elegance Redefined</h1>
          <p className="max-w-lg text-lg md:text-xl mb-8">Experience the pinnacle of luxury with our premium collection.</p>
          <div className="flex gap-4">
            <Button className="gold-bg hover:gold-bg/90" size="lg" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button className="gold-bg hover:gold-bg/90" size="lg" asChild>
              <Link href="/collections">Explore Collections</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="py-16 container">
        <h2 className="text-3xl font-serif text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["/shop/women", "/shop/men", "/accessories"].map((href, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg group h-[400px]">
              <Image
                src={["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop"][i]}
                alt={["Women's Collection", "Men's Collection", "Accessories Collection"][i]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-white">
                <h3 className="text-2xl font-serif mb-2">{["Women", "Men", "Accessories"][i]}</h3>
                <Button className="gold-bg hover:gold-bg/90 mt-4" size="lg" asChild>
                  <Link href={href}>Shop Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-serif">Featured Products</h2>
            <Link href="/shop" className="flex items-center text-sm font-medium hover:text-primary transition">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional banner */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-black/5 z-0" />
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Season's Finest Collection</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Discover our handpicked selection of the most exquisite pieces from this season's collection.
            </p>
            <Button className="gold-bg hover:gold-bg/90 w-fit" size="lg" asChild>
              <Link href="/collections/seasonal">Explore Collection</Link>
            </Button>
          </div>
          <div className="relative h-[400px] md:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1470&auto=format&fit=crop"
              alt="Season's Collection"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-16 cream-bg">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-serif">New Arrivals</h2>
            <Link href="/new-arrivals" className="flex items-center text-sm font-medium hover:text-primary transition">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 cream-bg">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-serif mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md border border-input"
              required
            />
            <Button className="gold-bg hover:gold-bg/90" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
