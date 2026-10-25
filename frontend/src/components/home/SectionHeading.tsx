"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge: string;
  title: string;
  rightElement?: React.ReactNode;
  showNavigation?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  rightElement,
  showNavigation = false,
  onPrev,
  onNext,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col space-y-4 mb-8 sm:mb-10", className)}>
      {/* Category / Subtitle Badge with Orange Bar */}
      <div className="flex items-center space-x-3.5">
        <span className="w-4 h-8 sm:w-5 sm:h-9 bg-[#FF5A0A] rounded-sm inline-block flex-shrink-0" />
        <span className="text-sm sm:text-base font-semibold text-[#FF5A0A]">
          {badge}
        </span>
      </div>

      {/* Main Title Row with Controls / Right Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-neutral-900 tracking-tight">
          {title}
        </h2>

        {/* Right Action buttons */}
        {rightElement ? (
          <div>{rightElement}</div>
        ) : showNavigation ? (
          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous items"
              className="w-10 h-10 rounded-full bg-[#F5F6F8] hover:bg-[#FF5A0A] text-neutral-800 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next items"
              className="w-10 h-10 rounded-full bg-[#F5F6F8] hover:bg-[#FF5A0A] text-neutral-800 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-2xs"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SectionHeading;
