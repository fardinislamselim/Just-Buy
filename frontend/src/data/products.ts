/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import type { Product } from "@/types";

/**
 * Products for the "New Arrival" section (4 cards)
 */
export const newArrivalsProducts: Product[] = [
  {
    _id: "660c201e8b4e2a1b9c3d4f01",
    id: "na-1",
    name: "The North Coat",
    description: "Premium cold-weather insulated coat with weatherproof outer shell.",
    category: "Woman's Fashion",
    brand: "The North Face",
    price: 260,
    stockQuantity: 25,
    sizes: ["S", "M", "L", "XL"],
    images: [
      {
        publicId: "products/the-north-coat",
        url: "/images/products/the-north-coat.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/the-north-coat.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e99",
      fullName: "North Outfitters Ltd",
      email: "seller@northoutfitters.com",
      role: "seller",
    },
    rating: 5,
    reviewCount: 65,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f02",
    id: "na-2",
    name: "Gucci Duffle Bag",
    description: "Luxury designer travel duffle bag with iconic signature pattern.",
    category: "Fashion Accessories",
    brand: "Gucci",
    price: 960,
    stockQuantity: 10,
    sizes: ["M", "L"],
    images: [
      {
        publicId: "products/gucci-duffle-bag",
        url: "/images/products/gucci-duffle-bag.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/gucci-duffle-bag.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e98",
      fullName: "Luxury Brands Co",
      email: "luxury@brands.com",
      role: "seller",
    },
    rating: 5,
    reviewCount: 65,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f03",
    id: "na-3",
    name: "RGB Liquid CPU Cooler",
    description: "All-in-one high-performance liquid CPU cooler with customizable RGB lighting.",
    category: "Electronics",
    brand: "Cooler Master",
    price: 160,
    stockQuantity: 40,
    images: [
      {
        publicId: "products/rgb-liquid-cpu-cooler",
        url: "/images/products/rgb-liquid-cpu-cooler.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/rgb-liquid-cpu-cooler.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e97",
      fullName: "TechHub Electronics",
      email: "techhub@electronics.com",
      role: "seller",
    },
    rating: 5,
    reviewCount: 65,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f04",
    id: "na-4",
    name: "Small Bookshelf",
    description: "Modern minimalist wooden bookshelf and side table crafted from solid oak.",
    category: "Home & Lifestyle",
    brand: "Nordic Living",
    price: 360,
    stockQuantity: 15,
    images: [
      {
        publicId: "products/small-bookshelf",
        url: "/images/products/small-bookshelf.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/small-bookshelf.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e96",
      fullName: "Nordic Living Ltd",
      email: "info@nordicliving.com",
      role: "seller",
    },
    rating: 5,
    reviewCount: 65,
  },
];

/**
 * Products for the "Explore Our Products" section (8 cards, 4x2 grid)
 */
export const exploreProducts: Product[] = [
  {
    _id: "660c201e8b4e2a1b9c3d4f05",
    id: "ep-1",
    name: "Breed Dry Dog Food",
    description: "Nutritious balanced dry dog food tailored for all life stages.",
    category: "Groceries & Pets",
    brand: "Pedigree",
    price: 100,
    stockQuantity: 50,
    images: [
      {
        publicId: "products/breed-dry-dog-food",
        url: "/images/products/breed-dry-dog-food.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/breed-dry-dog-food.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e95",
      fullName: "PetCare Supplies",
      email: "sales@petcare.com",
      role: "seller",
    },
    rating: 3,
    reviewCount: 35,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f06",
    id: "ep-2",
    name: "CANON EOS DSLR Camera",
    description: "High-resolution digital SLR camera with versatile 18-55mm zoom lens.",
    category: "Electronics",
    brand: "Canon",
    price: 360,
    stockQuantity: 18,
    images: [
      {
        publicId: "products/canon-eos-dslr-camera",
        url: "/images/products/canon-eos-dslr-camera.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/canon-eos-dslr-camera.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e97",
      fullName: "TechHub Electronics",
      email: "techhub@electronics.com",
      role: "seller",
    },
    rating: 4,
    reviewCount: 95,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f07",
    id: "ep-3",
    name: "ASUS FHD Gaming Laptop",
    description: "High-performance gaming laptop with ultra-fast refresh rate and dedicated GPU.",
    category: "Electronics",
    brand: "ASUS",
    price: 700,
    stockQuantity: 12,
    images: [
      {
        publicId: "products/asus-fhd-gaming-laptop",
        url: "/images/products/asus-fhd-gaming-laptop.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/asus-fhd-gaming-laptop.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e97",
      fullName: "TechHub Electronics",
      email: "techhub@electronics.com",
      role: "seller",
    },
    rating: 5,
    reviewCount: 325,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f08",
    id: "ep-4",
    name: "Curology Product Set",
    description: "Custom dermatological skincare system for radiant, clear skin.",
    category: "Health & Beauty",
    brand: "Curology",
    price: 500,
    stockQuantity: 30,
    images: [
      {
        publicId: "products/curology-product-set",
        url: "/images/products/curology-product-set.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/curology-product-set.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e94",
      fullName: "Beauty Care Essentials",
      email: "care@beautyessentials.com",
      role: "seller",
    },
    rating: 4,
    reviewCount: 145,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f09",
    id: "ep-5",
    name: "Kids Electric Car",
    description: "12V rechargeable electric ride-on sports car with parental remote control.",
    category: "Baby's & Toys",
    brand: "ToyZone",
    price: 960,
    stockQuantity: 8,
    isNew: true,
    images: [
      {
        publicId: "products/kids-electric-car",
        url: "/images/products/kids-electric-car.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/kids-electric-car.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e93",
      fullName: "ToyZone Direct",
      email: "support@toyzone.com",
      role: "seller",
    },
    rating: 5,
    reviewCount: 65,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f10",
    id: "ep-6",
    name: "Jr. Zoom Soccer Cleats",
    description: "Lightweight high-traction firm ground soccer cleats engineered for agility.",
    category: "Sports & Outdoor",
    brand: "Nike",
    price: 1160,
    stockQuantity: 20,
    sizes: ["M", "L", "XL"],
    images: [
      {
        publicId: "products/jr-zoom-soccer-cleats",
        url: "/images/products/jr-zoom-soccer-cleats.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/jr-zoom-soccer-cleats.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e92",
      fullName: "Athletic Gear Pro",
      email: "gear@athleticpro.com",
      role: "seller",
    },
    rating: 5,
    reviewCount: 35,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f11",
    id: "ep-7",
    name: "GP11 Shooter USB Gamepad",
    description: "Ergonomic wired USB game controller with dual vibration feedback.",
    category: "Electronics",
    brand: "GamePro",
    price: 660,
    stockQuantity: 35,
    isNew: true,
    images: [
      {
        publicId: "products/gp11-shooter-usb-gamepad",
        url: "/images/products/gp11-shooter-usb-gamepad.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/gp11-shooter-usb-gamepad.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e97",
      fullName: "TechHub Electronics",
      email: "techhub@electronics.com",
      role: "seller",
    },
    rating: 4.5,
    reviewCount: 55,
  },
  {
    _id: "660c201e8b4e2a1b9c3d4f12",
    id: "ep-8",
    name: "Quilted Satin Jacket",
    description: "Classic quilted satin bomber jacket featuring ribbed collar and snug cuffs.",
    category: "Woman's Fashion",
    brand: "Zara",
    price: 660,
    stockQuantity: 14,
    sizes: ["S", "M", "L"],
    images: [
      {
        publicId: "products/quilted-satin-jacket",
        url: "/images/products/quilted-satin-jacket.svg",
        width: 400,
        height: 400,
      },
    ],
    image: "/images/products/quilted-satin-jacket.svg",
    seller: {
      _id: "660c1f2e8b4e2a1b9c3d4e99",
      fullName: "North Outfitters Ltd",
      email: "seller@northoutfitters.com",
      role: "seller",
    },
    rating: 4.5,
    reviewCount: 55,
  },
];

/**
 * All combined products for search / filter utility
 */
export const allProducts: Product[] = [
  ...newArrivalsProducts,
  ...exploreProducts,
];
