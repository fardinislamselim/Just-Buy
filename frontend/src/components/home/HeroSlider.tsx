"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroBannerSlides, type BannerSlide } from "@/data/banners";

interface HeroSliderProps {
  slides?: BannerSlide[];
  autoSlideInterval?: number;
}

export function HeroSlider({
  slides = heroBannerSlides,
  autoSlideInterval = 5000,
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatic sliding with pause on hover
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides, autoSlideInterval, handleNext]);

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className="relative flex-1 w-full pt-6 pb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promotional Banners"
    >
      {/* Outer Banner Frame */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[390px] rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-sm">
        {/* Slide Tracks */}
        <div
          className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id || index}
              className="relative w-full h-full flex-shrink-0"
              aria-hidden={currentSlide !== index}
            >
              <Link
                href={slide.link || "#"}
                className="block relative w-full h-full"
                tabIndex={currentSlide === index ? 0 : -1}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover object-center w-full h-full select-none"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Previous Navigation Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Navigation Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots Pagination Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === index
                  ? "w-6 sm:w-7 h-2 sm:h-2.5 bg-[#FF5A0A]"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSlider;
