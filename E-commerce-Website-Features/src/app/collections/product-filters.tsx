"use client";

import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageSrc: string;
  category: string;
  isNew?: boolean;
  slug: string;
}

interface Category {
  id: string;
  name: string;
}

interface SortOption {
  id: string;
  name: string;
}

interface PriceRange {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  products: Product[];
  categories: Category[];
  sortOptions: SortOption[];
  priceRanges: PriceRange[];
}

export function ProductFilters({
  products,
  categories,
  sortOptions,
  priceRanges
}: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    if (selectedCategory !== "all" && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (selectedPriceRange !== "all") {
      const price = product.price;
      if (selectedPriceRange === "0-100" && price >= 100) return false;
      if (selectedPriceRange === "100-200" && (price < 100 || price >= 200)) return false;
      if (selectedPriceRange === "200-300" && (price < 200 || price >= 300)) return false;
      if (selectedPriceRange === "300+" && price < 300) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "price-asc") return a.price - b.price;
    if (selectedSort === "price-desc") return b.price - a.price;
    if (selectedSort === "name-asc") return a.name.localeCompare(b.name);
    if (selectedSort === "name-desc") return b.name.localeCompare(a.name);
    return 0; // newest (default)
  });

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters - Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex md:hidden mb-4 items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter Products
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`mobile-category-${category.id}`}
                      name="mobile-category"
                      className="mr-2"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                    />
                    <label htmlFor={`mobile-category-${category.id}`} className="text-sm">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`mobile-price-${range.id}`}
                      name="mobile-price"
                      className="mr-2"
                      checked={selectedPriceRange === range.id}
                      onChange={() => setSelectedPriceRange(range.id)}
                    />
                    <label htmlFor={`mobile-price-${range.id}`} className="text-sm">
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Filters - Desktop */}
      <div className="hidden md:block w-1/4 space-y-8">
        <div>
          <h3 className="font-serif text-lg mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`text-sm cursor-pointer hover:text-primary transition ${
                  selectedCategory === category.id ? "font-medium text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-serif text-lg mb-4">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div
                key={range.id}
                className={`text-sm cursor-pointer hover:text-primary transition ${
                  selectedPriceRange === range.id ? "font-medium text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setSelectedPriceRange(range.id)}
              >
                {range.name}
              </div>
            ))}
          </div>
        </div>

        {(selectedCategory !== "all" || selectedPriceRange !== "all") && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Product Grid */}
      <div className="md:w-3/4">
        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground text-sm">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Sort by: {sortOptions.find(o => o.id === selectedSort)?.name}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => setSelectedSort(option.id)}
                  className={selectedSort === option.id ? "bg-muted" : ""}
                >
                  {option.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Products */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try changing your filters or check back later for new products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={`page-${pageNumber}`}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  className={currentPage === pageNumber ? "gold-bg" : ""}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
