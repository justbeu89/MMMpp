import Image from "next/image";
import Link from "next/link";
import { ProductFilters } from "./product-filters";
import { ProductCard } from "@/components/product-card";

interface ShopPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

// Mock data
const products = [
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
  },
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
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    price: 159.99,
    imageSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    slug: "designer-sunglasses"
  },
  {
    id: "9",
    name: "Structured Blazer",
    price: 249.99,
    imageSrc: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800&auto=format&fit=crop",
    category: "Clothing",
    slug: "structured-blazer"
  },
  {
    id: "10",
    name: "Leather Wallet",
    price: 89.99,
    imageSrc: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    slug: "leather-wallet"
  },
  {
    id: "11",
    name: "Sterling Silver Necklace",
    price: 129.99,
    imageSrc: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
    category: "Jewelry",
    slug: "sterling-silver-necklace"
  },
  {
    id: "12",
    name: "Cashmere Scarf",
    price: 99.99,
    imageSrc: "https://images.unsplash.com/photo-1584736286279-75260ef38770?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    slug: "cashmere-scarf"
  }
];

const categories = [
  { id: "all", name: "All Categories" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
  { id: "bags", name: "Bags" },
  { id: "jewelry", name: "Jewelry" },
  { id: "footwear", name: "Footwear" }
];

const sortOptions = [
  { id: "newest", name: "Newest" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "name-asc", name: "Name: A to Z" },
  { id: "name-desc", name: "Name: Z to A" }
];

const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "0-100", name: "Under $100" },
  { id: "100-200", name: "100 - $200" },
  { id: "200-300", name: "200 - $300" },
  { id: "300+", name: "Over $300" }
];

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <>
      {/* Shop Banner */}
      <div className="relative h-[300px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Shop Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-serif mb-4">Our Collection</h1>
          <div className="flex gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Shop</span>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container py-12">
        <ProductFilters
          products={products}
          categories={categories}
          sortOptions={sortOptions}
          priceRanges={priceRanges}
        />
      </div>
    </>
  );
}
