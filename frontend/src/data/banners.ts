/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

export interface BannerSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  buttonText?: string;
  link?: string;
  alt: string;
}

/**
 * Hero Banner configuration.
 *
 * TO REPLACE BANNER IMAGES:
 * Place your 2 banner image files inside:
 *   frontend/public/images/banners/hero-banner-1.jpg
 *   frontend/public/images/banners/hero-banner-2.jpg
 *
 * Or update the image paths below.
 */
export const heroBannerSlides: BannerSlide[] = [
  {
    id: "slide-1",
    image: "/images/banners/hero-banner-1.jpg",
    title: "SHOP ONLINE",
    subtitle: "Up to 10% off Voucher",
    badge: "Exclusive Deals",
    buttonText: "Shop Now",
    link: "#explore-products",
    alt: "JusBuy Shop Online Summer Collection",
  },
  {
    id: "slide-2",
    image: "/images/banners/hero-banner-2.jpg",
    title: "MEGA TECH SALE",
    subtitle: "Save up to 40% on Laptops & Accessories",
    badge: "Limited Time Offer",
    buttonText: "Explore Now",
    link: "#new-arrivals",
    alt: "JusBuy Mega Tech Sale",
  },
];
