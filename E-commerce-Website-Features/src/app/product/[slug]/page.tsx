import Image from "next/image";
import Link from "next/link";
import { ProductDetails } from "./product-details";
import { ProductCard } from "@/components/product-card";

interface ProductPageProps {
  params: {
    slug: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

// Mock products database
const products = [
  {
    id: "1",
    name: "Leather Crossbody Bag",
    price: 149.99,
    description:
      "Crafted from premium Italian leather, this crossbody bag features multiple compartments, a detachable shoulder strap, and a sophisticated design that effortlessly transitions from day to night.",
    images: [
      "/WhatsApp Image 2025-06-25 at 20.36.39_b64ca759.jpg",
      "/WhatsApp Image 2025-06-25 at 20.36.41_1d12105c.jpg",
      "/WhatsApp Image 2025-06-25 at 20.36.40_b1bd0b6c.jpg",
      "/WhatsApp Image 2025-06-25 at 20.36.41_2dc9cbea.jpg",
    ],
    category: "Bags",
    features: [
      "Premium full-grain leather",
      "Interior zipped compartment",
      "Adjustable shoulder strap",
      "Gold-toned hardware",
      "Dust bag included",
    ],
    colors: ["Black", "Brown", "Tan"],
    dimensions: '9" x 6" x 3"',
    availability: true,
    slug: "leather-crossbody-bag",
  },
  {
    id: "2",
    name: "Cashmere Sweater",
    price: 199.99,
    originalPrice: 249.99,
    description:
      "Luxuriously soft cashmere sweater crafted for exceptional comfort and warmth. Features a relaxed silhouette and ribbed details at the cuffs and hem for a refined look that pairs effortlessly with your favorite pieces.",
    images: [
      "/WhatsApp Image 2025-06-25 at 20.39.49_01f9cca5.jpg",
      "/WhatsApp Image 2025-06-25 at 20.39.50_1fef44ef.jpg",
      "/WhatsApp Image 2025-06-25 at 20.39.50_e8a64690.jpg",
    ],
    category: "Clothing",
    features: [
      "100% pure cashmere",
      "Ethically sourced",
      "Crew neckline",
      "Ribbed cuffs and hem",
      "Dry clean only",
    ],
    colors: ["Ivory", "Navy", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    availability: true,
    isNew: true,
    slug: "cashmere-sweater",
  },
  {
    id: "3",
    name: "Gold Statement Earrings",
    price: 89.99,
    description:
      "Luxuriously soft cashmere sweater crafted for exceptional comfort and warmth. Features a relaxed silhouette and ribbed details at the cuffs and hem for a refined look that pairs effortlessly with your favorite pieces.",
    images: [
      "/WhatsApp Image 2025-06-25 at 20.39.49_01f9cca5.jpg",
      "/WhatsApp Image 2025-06-25 at 20.39.50_1fef44ef.jpg",
      "/WhatsApp Image 2025-06-25 at 20.39.50_e8a64690.jpg",
    ],
    category: "Clothing",
    features: [
      "100% pure cashmere",
      "Ethically sourced",
      "Crew neckline",
      "Ribbed cuffs and hem",
      "Dry clean only",
    ],
    colors: ["Ivory", "Navy", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    availability: true,
    isNew: true,
    slug: "cashmere-sweater",
  },
];

// Related products
const relatedProducts = [
  {
    id: "3",
    name: "Gold Statement Earrings",
    price: 89.99,
    imageSrc:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    category: "Jewelry",
    slug: "gold-statement-earrings",
  },
  {
    id: "4",
    name: "Silk Scarf",
    price: 79.99,
    originalPrice: 99.99,
    imageSrc:
      "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    slug: "silk-scarf",
  },
  {
    id: "6",
    name: "Evening Clutch",
    price: 129.99,
    imageSrc:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113c0d?q=80&w=800&auto=format&fit=crop",
    category: "Bags",
    isNew: true,
    slug: "evening-clutch",
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    price: 159.99,
    imageSrc:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    slug: "designer-sunglasses",
  },
];

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
        <p className="mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8 text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop/${product.category.toLowerCase()}`}
          className="hover:text-foreground"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back to Shop button for mobile */}
      <div className="mb-6 md:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Shop
        </Link>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductDetails product={product} />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((related) => (
            <ProductCard key={related.id} {...related} />
          ))}
        </div>
      </div>
    </div>
  );
}
