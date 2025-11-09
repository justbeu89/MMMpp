"use client";

import * as React from "react";
import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Cart } from "@/components/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      isScrolled ? "bg-white/80 backdrop-blur-md border-b" : "bg-transparent"
    }`}>
      <div className="container px-4 sm:px-8 flex h-16 items-center justify-between">
        {/* Left side: menu + logo */}
        <div className="flex items-center gap-6 md:gap-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="flex flex-col gap-4 mt-8">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo desktop */}
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <span className="logo text-2xl tracking-widest gold-text">KULTR</span>
          </Link>

          {/* Logo mobile */}
          <Link href="/" className="flex md:hidden items-center space-x-2">
            <span className="logo text-xl tracking-widest gold-text">KULTR</span>
          </Link>
        </div>

        {/* Center nav for large screens */}
        <nav className="hidden md:flex gap-6">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right side: search, user, cart */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}
            className="relative w-64 hidden sm:block"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-input bg-cream px-10 py-2 text-sm text-dark placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition"
            />
          </form>

          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          <Cart />
        </div>
      </div>
    </header>
  );
}