"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Container } from "./Container";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
}

export function Navbar({ cartCount = 0, wishlistCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Smooth scroll to explore section or search feedback
      const section = document.getElementById("explore-products");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200/80 transition-shadow">
      <Container>
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Brand Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="JusBuy Home">
              <Image
                src="/logo.svg"
                alt="JusBuy"
                width={150}
                height={50}
                priority
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-10 text-[15px] font-normal text-neutral-800">
            <Link
              href="/"
              className="text-neutral-900 font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF5A0A]"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#FF5A0A] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="hover:text-[#FF5A0A] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Action Icons & Search Bar */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Bar (Desktop & Tablet) */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-56 lg:w-64 pl-4 pr-10 py-2 text-xs sm:text-sm bg-[#F5F6F8] text-neutral-800 placeholder:text-neutral-400 rounded-md border border-transparent focus:outline-none focus:border-[#FF5A0A]/40 focus:bg-white transition-all"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 text-neutral-600 hover:text-[#FF5A0A] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Wishlist Icon */}
            <Link
              href="#wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-neutral-800 hover:text-[#FF5A0A] transition-colors rounded-full hover:bg-neutral-100"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF5A0A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Item Count Badge */}
            <Link
              href="#cart"
              aria-label="Shopping Cart"
              className="relative p-2 text-neutral-800 hover:text-[#FF5A0A] transition-colors rounded-full hover:bg-neutral-100"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF5A0A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile Icon */}
            <Link
              href="/login"
              aria-label="Account Login"
              className="p-2 text-neutral-800 hover:text-[#FF5A0A] transition-colors rounded-full hover:bg-neutral-100"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-800 hover:text-[#FF5A0A] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible only on very small screens) */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full pl-4 pr-10 py-2 text-xs bg-[#F5F6F8] text-neutral-800 placeholder:text-neutral-400 rounded-md border border-neutral-200 focus:outline-none focus:border-[#FF5A0A]"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-3 top-2.5 text-neutral-600"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100 flex flex-col space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-[#FF5A0A] bg-orange-50/60 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-neutral-700 hover:text-[#FF5A0A] hover:bg-neutral-50 rounded-md transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-neutral-700 hover:text-[#FF5A0A] hover:bg-neutral-50 rounded-md transition-colors"
            >
              About
            </Link>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-3">
              <span className="text-sm text-neutral-500">Account Access</span>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#FF5A0A] hover:underline"
              >
                Sign In / Register
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Navbar;
