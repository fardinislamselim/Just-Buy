"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-[#FF5A0A] text-white pt-16 pb-12 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Column 1: Brand & Description (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-5">
            <Link href="/" className="inline-block" aria-label="JusBuy Home">
              <Image
                src="/logo-white.svg"
                alt="JusBuy"
                width={160}
                height={55}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/90 text-sm leading-relaxed max-w-sm">
              Shop The Latest Trends At Our E-Commerce Store. Enjoy Fast
              Shipping, Secure Payments, And 24/7 Customer Support. Discover
              Unbeatable Deals On Fashion, Electronics, Home Essentials, And
              More. Shop Now!
            </p>
          </div>

          {/* Column 2: Information Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Information
            </h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white hover:underline transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support (4 cols) */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Help & Support
            </h3>
            <div className="space-y-4 text-sm text-white/90">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <div className="flex flex-col space-y-0.5">
                  <p className="font-medium">
                    Email : <a href="mailto:youremail@gmail.com" className="hover:underline">youremail@gmail.com</a>
                  </p>
                  <p>
                    <a href="mailto:info@gmail.com" className="hover:underline">info@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <div className="flex flex-col space-y-0.5">
                  <p className="font-medium">
                    Phone : <a href="tel:+18887855555" className="hover:underline">(+1) [888] 785-5555</a>
                  </p>
                  <p>
                    <a href="tel:+18887855555" className="hover:underline">(+1) [888] 785-5555</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle copyright */}
        <div className="mt-14 pt-6 border-t border-white/20 text-center text-xs text-white/80">
          <p>© {new Date().getFullYear()} JusBuy. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;