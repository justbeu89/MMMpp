"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  ChevronUp
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribing:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="border-t dark-bg text-white/90">
      <div className="container p-8 md:p-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl tracking-widest gold-text logo">KULTR</h3>
            <p className="text-sm text-white/70">
              Discover exquisite luxury items for the discerning individual.
              KULTR offers premium clothing, accessories, and more.
            </p>
            <div className="flex gap-4">
              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8860B] transition"
              >
                <InstagramIcon size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8860B] transition"
              >
                <FacebookIcon size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8860B] transition"
              >
                <TwitterIcon size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://youtube.com/kultr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8860B] transition"
              >
                <YoutubeIcon size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Navigation</h4>
            <nav className="grid grid-cols-2 gap-2">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  {item.title}
                </Link>
              ))}
              <Link href="/about" className="text-sm text-white/70 hover:text-white transition">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-white/70 hover:text-white transition">
                Contact
              </Link>
              <Link href="/faq" className="text-sm text-white/70 hover:text-white transition">
                FAQs
              </Link>
              <Link href="/returns" className="text-sm text-white/70 hover:text-white transition">
                Returns
              </Link>
            </nav>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Join Our Newsletter</h4>
            <p className="text-sm text-white/70 mb-4">
              Subscribe to receive updates, exclusive offers, and more.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button type="submit" className="gold-bg hover:gold-bg/90">
                Join
              </Button>
            </form>
          </div>
        </div>

        <Separator className="bg-white/10 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} KULTR. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/60">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-white transition">Shipping Info</Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="border rounded-full hover:text-[#B8860B] hover:border-[#B8860B]"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronUp size={16} />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
