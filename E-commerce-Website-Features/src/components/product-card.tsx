"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageSrc: string;
  category: string;
  isNew?: boolean;
  slug: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageSrc,
  category,
  isNew = false,
  slug,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const discount = originalPrice
   ? Math.round(((originalPrice - price) / originalPrice) * 100)
   : 0;
  
  const handleClick = () => {
   router.push(`/product/${slug}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="group border-0 bg-transparent overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 relative">
        {isNew && (
          <span className="absolute top-2 left-2 z-10 text-xs bg-black text-white px-2 py-1">
            NEW
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-2 right-2 z-10 text-xs gold-bg text-white px-2 py-1">
            {discount}% OFF
          </span>
        )}

        {/* Make the image clickable */}
        <Link href={`/product/${slug}`} className="block">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
            <Image
              src={imageSrc}
              alt={name}
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full object-cover"
            />
          </AspectRatio>
        </Link>

        {/* Hover Buttons */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity",
            isHovered && "opacity-100"
          )}
        >
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white/90"
              onClick={() => {
                console.log("Added to cart:", id);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="bg-white text-black hover:bg-white/90 border-none"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")}
              />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start p-3 space-y-1.5">
        <Link
          href={`/product/${slug}`}
          className="text-xs text-muted-foreground tracking-wider uppercase hover:text-foreground"
        >
          {category}
        </Link>
        <Link
          href={`/product/${slug}`}
          className="font-medium leading-none hover:underline"
        >
          {name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-semibold gold-text">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
