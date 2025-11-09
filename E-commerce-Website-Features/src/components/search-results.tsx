"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

// Define types for your search results
interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  image?: string;
  price?: string;
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        // Replace this with your actual search API call
        // Example: const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        // const data = await response.json();
        
        // Mock search results for now
        const mockResults: SearchResult[] = [
          {
            id: "1",
            title: `Sample Product for "${query}"`,
            description: `This is a sample search result for your query: ${query}`,
            href: "/product/1",
            price: "$99.99"
          },
          {
            id: "2",
            title: `Another Result for "${query}"`,
            description: `Another sample search result matching: ${query}`,
            href: "/product/2",
            price: "$149.99"
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setResults(mockResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Start your search</h2>
        <p className="text-muted-foreground">
          Enter a search term to find products
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Searching for "{query}"...</p>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-muted-foreground">
          No results found for "{query}". Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
      </p>
      
      <div className="grid gap-4">
        {results.map((result) => (
          <Link 
            key={result.id} 
            href={result.href}
            className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 hover:text-gold transition-colors">
                  {result.title}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {result.description}
                </p>
              </div>
              {result.price && (
                <div className="text-right">
                  <p className="font-semibold text-gold">{result.price}</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}