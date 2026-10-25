"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState } from "react";
import Image from "next/image";
import { Star, MessageSquarePlus, Check } from "lucide-react";
import type { ProductReview } from "@/types";
import { sampleProductReviews } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  initialReviews?: ProductReview[];
}

export function ProductReviews({ initialReviews = sampleProductReviews }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [showAll, setShowAll] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      rating: newRating,
      date: "Just now",
      comment: newComment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setNewAuthor("");
    setNewComment("");
    setIsWritingReview(false);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const renderStars = (rating: number, interactive = false, onSelect?: (r: number) => void) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      const isFilled = index < Math.floor(rating);
      return (
        <button
          key={index}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onSelect && onSelect(starValue)}
          className={cn(
            "p-0.5",
            interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default",
          )}
          aria-label={`${starValue} star`}
        >
          <Star
            className={cn(
              "w-3.5 h-3.5 sm:w-4 sm:h-4",
              isFilled
                ? "fill-brand-orange text-brand-orange"
                : "fill-neutral-200 text-neutral-200",
            )}
          />
        </button>
      );
    });
  };

  return (
    <section id="reviews" className="py-8 sm:py-10 border-t border-neutral-200/90" aria-labelledby="product-reviews-heading">
      {/* Header Row: Orange Tab + Right Action */}
      <div className="flex items-center justify-between mb-8">
        <span
          id="product-reviews-heading"
          className="inline-block bg-brand-orange text-white text-xs sm:text-sm font-semibold px-7 py-2.5 rounded-xs tracking-wide shadow-xs"
        >
          Ratings & Reviews
        </span>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setIsWritingReview(!isWritingReview)}
            className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-brand-orange flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-brand-orange hover:underline text-xs sm:text-sm font-medium cursor-pointer"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      </div>

      {/* Submission Success Toast */}
      {submittedMessage && (
        <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-md flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Thank you! Your review has been published.</span>
        </div>
      )}

      {/* Write Review Drawer / Form */}
      {isWritingReview && (
        <form
          onSubmit={handleSubmitReview}
          className="mb-8 p-5 sm:p-6 bg-neutral-50 rounded-lg border border-neutral-200/80 space-y-4 max-w-2xl"
        >
          <h4 className="text-sm font-semibold text-neutral-900">Add Your Customer Review</h4>

          {/* Rating Stars Selection */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-neutral-600">Your Rating:</span>
            <div className="flex items-center space-x-1">
              {renderStars(newRating, true, setNewRating)}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="reviewer-name" className="block text-xs font-medium text-neutral-700 mb-1">
              Your Name
            </label>
            <input
              id="reviewer-name"
              type="text"
              required
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="e.g. Dianne Russell"
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange bg-white"
            />
          </div>

          {/* Comment Field */}
          <div>
            <label htmlFor="reviewer-comment" className="block text-xs font-medium text-neutral-700 mb-1">
              Review Content
            </label>
            <textarea
              id="reviewer-comment"
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share details about the quality, fit, or performance..."
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange bg-white resize-y"
            />
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <button
              type="submit"
              className="bg-brand-orange hover:bg-[#e04e08] text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-md transition-colors cursor-pointer"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setIsWritingReview(false)}
              className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 px-3 py-2 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List Matching Reference Screenshot */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <div key={review.id || index} className="space-y-3 pb-6 border-b border-neutral-200/80 last:border-0 last:pb-0">
            {/* Reviewer Header: Avatar + Name + Orange "Just now" */}
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300/60">
                <Image
                  src={
                    review.avatar ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
                  }
                  alt={review.author}
                  fill
                  sizes="40px"
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-bold text-neutral-900">
                  {review.author}
                </span>
                <span className="text-xs font-semibold text-brand-orange">
                  {review.date || "Just now"}
                </span>
              </div>
            </div>

            {/* Stars Row */}
            <div className="flex items-center space-x-0.5">
              {renderStars(review.rating)}
            </div>

            {/* Review Text */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-4xl">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductReviews;
