"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Minus, Plus, Share2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  features?: string[];
  colors?: string[];
  sizes?: string[];
  dimensions?: string;
  availability: boolean;
  isNew?: boolean;
  slug: string;
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Increase/decrease quantity
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const increaseQuantity = () => setQuantity(prev => prev + 1);

  // Add to cart handler
  const addToCart = () => {
    console.log("Added to cart:", {
      product: product.id,
      quantity,
      color: selectedColor,
      size: selectedSize
    });
    // TODO: Implement actual cart functionality
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <>
      {/* Product images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden bg-muted rounded-md">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 z-10 text-xs bg-black text-white px-2 py-1">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-2 right-2 z-10 text-xs gold-bg text-white px-2 py-1">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Thumbnail images */}
        <div className="flex gap-2">
          {product.images.map((image, index) => (
            <button
              key={`image-${product.id}-${index}`}
              className={`relative w-20 h-20 overflow-hidden rounded-md border-2 ${
                selectedImage === index ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div>
        <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-medium gold-text">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            product.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {product.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="text-muted-foreground mb-6">{product.description}</p>

        <Separator className="my-6" />

        {/* Color selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color: <span className="text-muted-foreground">{selectedColor}</span></h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`h-10 px-3 rounded-md border ${
                    selectedColor === color ? "border-primary" : "border-input"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Size: <span className="text-muted-foreground">{selectedSize}</span></h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`h-10 w-10 rounded-md border ${
                    selectedSize === size ? "border-primary" : "border-input"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Quantity:</h3>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-md rounded-r-none"
              onClick={decreaseQuantity}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="h-10 w-14 flex items-center justify-center border-y border-input">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-r-md rounded-l-none"
              onClick={increaseQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Button className="gold-bg hover:gold-bg/90 flex-1 gap-2" size="lg" onClick={addToCart}>
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={`gap-2 ${isWishlisted ? "text-red-500" : ""}`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>

        {/* Product features */}
        {product.features && (
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Features:</h3>
            <ul className="space-y-1 list-disc list-inside text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={`feature-${product.id}-${index}`}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional details */}
        <div className="text-sm text-muted-foreground">
          {product.dimensions && (
            <p className="mb-1">Dimensions: {product.dimensions}</p>
          )}
          <p className="mb-1">SKU: {product.id.padStart(6, '0')}</p>
          <p>Category: {product.category}</p>
        </div>
      </div>
    </>
  );
}
