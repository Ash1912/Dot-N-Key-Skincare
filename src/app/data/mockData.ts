// Mock data for the e-commerce application

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  skinType: string[];
  rating: number;
  reviews: number;
  images: string[];
  stock: number;
  ingredients: string[];
  howToUse: string;
  benefits: string[];
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  rating: number;
  comment: string;
  location: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
  expiryDate: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Serums",
    slug: "serums",
    image: "/images/serum.jpeg",
    productCount: 15,
  },
  {
    id: "2",
    name: "Moisturizers",
    slug: "moisturizers",
    image: "/images/moisturizer.jpeg",
    productCount: 12,
  },
  {
    id: "3",
    name: "Face Masks",
    slug: "face-masks",
    image: "/images/face-mask.jpeg",
    productCount: 10,
  },
  {
    id: "4",
    name: "Cleansers",
    slug: "cleansers",
    image: "/images/cleanser.jpeg",
    productCount: 8,
  },
  {
    id: "5",
    name: "Sunscreen",
    slug: "sunscreen",
    image: "/images/sunscreen.jpeg",
    productCount: 6,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "10% Vitamin C + E Face Serum with 5% Niacinamide",
    slug: "vitamin-c-e-face-serum-niacinamide",
    description:
      "Brightening serum with Vitamin C & Niacinamide to reduce dark spots and boost glow.",
    price: 599,
    originalPrice: 799,
    discount: 25,
    category: "serums",
    skinType: ["all", "dull"],
    rating: 4.8,
    reviews: 1245,
    images: ["/images/serum.jpeg"],
    stock: 150,
    ingredients: [
      "Vitamin C 10%",
      "Vitamin E",
      "Niacinamide 5%",
      "Ferulic Acid",
      "Hyaluronic Acid",
    ],
    howToUse:
      "Apply 2–3 drops on clean face. Use in morning. Follow with sunscreen.",
    benefits: [
      "Brightens skin",
      "Reduces dark spots",
      "Evens tone",
      "Antioxidant protection",
    ],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "2",
    name: "Strawberry Bright 10% Niacinamide Face Serum",
    slug: "strawberry-niacinamide-serum",
    description:
      "Niacinamide serum that controls oil and improves skin texture.",
    price: 599,
    originalPrice: 799,
    discount: 25,
    category: "serums",
    skinType: ["oily", "combination"],
    rating: 4.7,
    reviews: 900,
    images: ["/images/serum1.jpeg"],
    stock: 150,
    ingredients: [
      "Niacinamide 10%",
      "Strawberry Extract",
      "Zinc",
      "Hyaluronic Acid",
    ],
    howToUse: "Apply on clean skin before moisturizer.",
    benefits: ["Controls oil", "Reduces pores", "Smooth skin", "Brightens"],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "3",
    name: "Cica + 10% Niacinamide Face Serum for Oily Skin",
    slug: "cica-niacinamide-serum",
    description: "Serum for oily skin that reduces acne and controls sebum.",
    price: 599,
    originalPrice: 799,
    discount: 25,
    category: "serums",
    skinType: ["oily", "acne"],
    rating: 4.7,
    reviews: 850,
    images: ["/images/serum2.jpeg"],
    stock: 150,
    ingredients: ["Niacinamide", "Centella", "Zinc", "Tea Tree"],
    howToUse: "Apply twice daily after cleansing.",
    benefits: [
      "Controls oil",
      "Reduces acne",
      "Soothes skin",
      "Tightens pores",
    ],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "4",
    name: "Hyaluronic & Ceramides Hydrating Face Serum",
    slug: "hyaluronic-ceramide-serum",
    description: "Deep hydration serum with Hyaluronic Acid & Ceramides.",
    price: 599,
    originalPrice: 799,
    discount: 25,
    category: "serums",
    skinType: ["dry", "normal"],
    rating: 4.8,
    reviews: 700,
    images: ["/images/serum3.jpeg"],
    stock: 150,
    ingredients: ["Hyaluronic Acid", "Ceramides", "Squalane", "Glycerin"],
    howToUse: "Apply on damp skin before moisturizer.",
    benefits: [
      "Deep hydration",
      "Plumps skin",
      "Repairs barrier",
      "Smooth texture",
    ],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "5",
    name: "Watermelon & 10% Glycolic Serum",
    slug: "watermelon-glycolic-serum",
    description: "Exfoliating serum with Glycolic Acid for glowing skin.",
    price: 599,
    originalPrice: 799,
    discount: 25,
    category: "serums",
    skinType: ["dull", "combination"],
    rating: 4.6,
    reviews: 600,
    images: ["/images/serum4.jpeg"],
    stock: 150,
    ingredients: [
      "Glycolic Acid",
      "Watermelon Extract",
      "AHA",
      "Hyaluronic Acid",
    ],
    howToUse: "Use at night only. Apply small amount.",
    benefits: [
      "Removes dead skin",
      "Brightens",
      "Smooth skin",
      "Improves texture",
    ],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "6",
    name: "72HR Hydrating Gel Moisturizer + Probiotics",
    slug: "72hr-hydrating-moisturizer",
    description: "Lightweight gel moisturizer for long lasting hydration.",
    price: 395,
    originalPrice: 495,
    discount: 20,
    category: "moisturizers",
    skinType: ["dry", "normal", "combination"],
    rating: 4.7,
    reviews: 892,
    images: ["/images/moisturizer.jpeg"],
    stock: 200,
    ingredients: ["Hyaluronic Acid", "Ceramides", "Probiotics", "Squalane"],
    howToUse: "Apply morning & night on clean skin.",
    benefits: ["Long hydration", "Soft skin", "Barrier repair", "Lightweight"],
    isBestSeller: true,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "7",
    name: "Cica + Niacinamide Oil Free Moisturizer",
    slug: "cica-niacinamide-moisturizer",
    description: "Oil free moisturizer for oily skin.",
    price: 395,
    originalPrice: 495,
    discount: 20,
    category: "moisturizers",
    skinType: ["oily", "acne"],
    rating: 4.6,
    reviews: 700,
    images: ["/images/moisturizer1.jpeg"],
    stock: 200,
    ingredients: ["Niacinamide", "Cica", "Hyaluronic Acid"],
    howToUse: "Apply twice daily.",
    benefits: ["Oil control", "Hydrates", "Soothes", "Non greasy"],
    isBestSeller: true,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "8",
    name: "Vitamin C + E Moisturizer for Glowing Skin",
    slug: "vitamin-c-moisturizer",
    description: "Glow boosting moisturizer with Vitamin C.",
    price: 395,
    originalPrice: 495,
    discount: 20,
    category: "moisturizers",
    skinType: ["all", "dull"],
    rating: 4.7,
    reviews: 600,
    images: ["/images/moisturizer2.jpeg"],
    stock: 200,
    ingredients: ["Vitamin C", "Vitamin E", "Hyaluronic Acid"],
    howToUse: "Apply after serum.",
    benefits: ["Brightens", "Hydrates", "Soft skin"],
    isBestSeller: true,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "9",
    name: "Cica + Salicylic Acid Face Wash",
    slug: "salicylic-facewash",
    description: "Face wash for acne & oily skin.",
    price: 549,
    originalPrice: 699,
    discount: 21,
    category: "cleansers",
    skinType: ["oily", "acne"],
    rating: 4.5,
    reviews: 2134,
    images: ["/images/cleanser.jpeg"],
    stock: 250,
    ingredients: ["Salicylic Acid", "Tea Tree", "Cica", "Aloe"],
    howToUse: "Use twice daily.",
    benefits: ["Deep clean", "Acne control", "Oil control"],
    isBestSeller: true,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "10",
    name: "Barrier Repair Gentle Face Wash",
    slug: "barrier-facewash",
    description: "Gentle hydrating cleanser.",
    price: 549,
    originalPrice: 699,
    discount: 21,
    category: "cleansers",
    skinType: ["dry", "normal"],
    rating: 4.5,
    reviews: 1000,
    images: ["/images/cleanser1.jpeg"],
    stock: 250,
    ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
    howToUse: "Use twice daily.",
    benefits: ["Gentle clean", "Hydrates", "No dryness"],
    isBestSeller: true,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "11",
    name: "Vitamin C + E Gel Face Wash for Glowing Skin",
    slug: "vitamin-c-facewash",
    description:
      "Brightening gel face wash with Vitamin C to remove dirt and boost glow.",
    price: 549,
    originalPrice: 699,
    discount: 21,
    category: "cleansers",
    skinType: ["all", "dull"],
    rating: 4.6,
    reviews: 1200,
    images: ["/images/cleanser2.jpeg"],
    stock: 250,
    ingredients: ["Vitamin C", "Vitamin E", "Glycerin", "Aloe Vera"],
    howToUse: "Apply on wet face, massage gently, rinse.",
    benefits: [
      "Brightens skin",
      "Removes dirt",
      "Gentle cleanse",
      "Fresh glow",
    ],
    isBestSeller: true,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "12",
    name: "Watermelon Cooling Sunscreen SPF 50+ PA++++",
    slug: "watermelon-sunscreen",
    description: "Cooling sunscreen with SPF 50+ for daily protection.",
    price: 799,
    originalPrice: 999,
    discount: 20,
    category: "sunscreen",
    skinType: ["all", "oily", "combination"],
    rating: 4.8,
    reviews: 1823,
    images: ["/images/sunscreen.jpeg"],
    stock: 300,
    ingredients: [
      "Zinc Oxide",
      "Titanium Dioxide",
      "Watermelon Extract",
      "Vitamin E",
    ],
    howToUse: "Apply before sun exposure.",
    benefits: [
      "SPF 50 protection",
      "No white cast",
      "Lightweight",
      "Cooling effect",
    ],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "13",
    name: "Barrier Repair Sunscreen SPF 50+ PA++++",
    slug: "barrier-sunscreen",
    description: "Hydrating sunscreen that protects and repairs skin barrier.",
    price: 799,
    originalPrice: 999,
    discount: 20,
    category: "sunscreen",
    skinType: ["dry", "normal", "all"],
    rating: 4.8,
    reviews: 1500,
    images: ["/images/sunscreen1.jpeg"],
    stock: 300,
    ingredients: ["Zinc Oxide", "Ceramides", "Niacinamide", "Vitamin E"],
    howToUse: "Apply every morning.",
    benefits: ["UV protection", "Barrier repair", "Hydrating", "No white cast"],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "14",
    name: "Vitamin C + E Sunscreen SPF 50+ PA++++",
    slug: "vitamin-c-sunscreen",
    description: "Glow boosting sunscreen with SPF 50.",
    price: 799,
    originalPrice: 999,
    discount: 20,
    category: "sunscreen",
    skinType: ["all", "dull"],
    rating: 4.7,
    reviews: 1400,
    images: ["/images/sunscreen2.jpeg"],
    stock: 300,
    ingredients: ["Zinc Oxide", "Vitamin C", "Vitamin E", "Hyaluronic Acid"],
    howToUse: "Apply before sun exposure.",
    benefits: ["Sun protection", "Brightens", "Hydrates", "No white cast"],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "15",
    name: "Cica + Niacinamide Sunscreen SPF 50+ PA++++",
    slug: "cica-sunscreen",
    description: "Sunscreen for oily skin with oil control.",
    price: 799,
    originalPrice: 999,
    discount: 20,
    category: "sunscreen",
    skinType: ["oily", "acne"],
    rating: 4.7,
    reviews: 1200,
    images: ["/images/sunscreen3.jpeg"],
    stock: 300,
    ingredients: ["Zinc Oxide", "Niacinamide", "Cica", "Vitamin E"],
    howToUse: "Apply every 2 hours.",
    benefits: ["Oil control", "SPF protection", "No white cast", "Soothing"],
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
  },

  {
    id: "16",
    name: "Glow Reviving Mask with Vitamin C",
    slug: "vitamin-c-mask",
    description: "Clay mask to brighten and detox skin.",
    price: 699,
    originalPrice: 899,
    discount: 22,
    category: "face-masks",
    skinType: ["all", "dull"],
    rating: 4.6,
    reviews: 987,
    images: ["/images/face-mask.jpeg"],
    stock: 140,
    ingredients: ["Kaolin Clay", "Vitamin C", "Turmeric", "Papaya"],
    howToUse: "Apply for 10 min then wash.",
    benefits: ["Brightens", "Detox", "Clean pores", "Glow"],
    isBestSeller: false,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "17",
    name: "Lip Plumping Mask with Vitamin C + E",
    slug: "lip-mask",
    description: "Lip mask for soft and plump lips.",
    price: 699,
    originalPrice: 899,
    discount: 22,
    category: "face-masks",
    skinType: ["all"],
    rating: 4.5,
    reviews: 500,
    images: ["/images/face-mask1.jpeg"],
    stock: 140,
    ingredients: ["Vitamin C", "Vitamin E", "Shea Butter", "Hyaluronic Acid"],
    howToUse: "Apply on lips before sleep.",
    benefits: ["Soft lips", "Hydrates", "Plumps", "Smooth"],
    isBestSeller: false,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "18",
    name: "Mango Detan Clay Mask",
    slug: "mango-detan-mask",
    description: "Detan mask to remove dullness.",
    price: 699,
    originalPrice: 899,
    discount: 22,
    category: "face-masks",
    skinType: ["all", "dull"],
    rating: 4.6,
    reviews: 600,
    images: ["/images/face-mask2.jpeg"],
    stock: 140,
    ingredients: ["Kaolin Clay", "Mango Extract", "Turmeric", "Vitamin C"],
    howToUse: "Use twice weekly.",
    benefits: ["Detan", "Brightens", "Smooth", "Glow"],
    isBestSeller: false,
    isFeatured: false,
    isNew: false,
  },

  {
    id: "19",
    name: "Cica & Salicylic French Green Clay Mask",
    slug: "cica-clay-mask",
    description: "Clay mask for oily and acne skin.",
    price: 699,
    originalPrice: 899,
    discount: 22,
    category: "face-masks",
    skinType: ["oily", "acne"],
    rating: 4.6,
    reviews: 700,
    images: ["/images/face-mask3.jpeg"],
    stock: 140,
    ingredients: ["Green Clay", "Salicylic Acid", "Cica", "Tea Tree"],
    howToUse: "Apply 10 minutes then wash.",
    benefits: ["Oil control", "Acne care", "Clean pores", "Smooth skin"],
    isBestSeller: false,
    isFeatured: false,
    isNew: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1664106487244-13e13a4b07af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwdGVzdGltb25pYWwlMjB3b21hbnxlbnwxfHx8fDE3NzM4OTc0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    comment:
      "The Vitamin C serum transformed my skin! My dark spots have faded significantly and my skin glows like never before. Absolutely worth every penny!",
    location: "Mumbai, India",
  },
  {
    id: "2",
    name: "Priya Sharma",
    image:
      "https://images.unsplash.com/photo-1696025487682-9916beeb73e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFwcGx5aW5nJTIwc2VydW0lMjBmYWNlfGVufDF8fHx8MTc3MzkyMDk0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    comment:
      "Best skincare brand in India! The hyaluronic moisturizer keeps my skin hydrated all day. Fast delivery and amazing packaging too.",
    location: "Delhi, India",
  },
  {
    id: "3",
    name: "Ananya Reddy",
    image:
      "https://images.unsplash.com/photo-1664106487244-13e13a4b07af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwdGVzdGltb25pYWwlMjB3b21hbnxlbnwxfHx8fDE3NzM4OTc0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    comment:
      "Love the niacinamide serum! My pores are visibly smaller and my oily skin is finally under control. Highly recommend this brand!",
    location: "Bangalore, India",
  },
];

export const coupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME20",
    discount: 20,
    type: "percentage",
    minOrder: 999,
    expiryDate: "2026-12-31",
    description: "Get 20% off on orders above ₹999",
  },
  {
    id: "2",
    code: "FIRST500",
    discount: 500,
    type: "fixed",
    minOrder: 2000,
    expiryDate: "2026-12-31",
    description: "Flat ₹500 off on orders above ₹2000",
  },
  {
    id: "3",
    code: "GLOW30",
    discount: 30,
    type: "percentage",
    minOrder: 1499,
    expiryDate: "2026-12-31",
    description: "Get 30% off on orders above ₹1499",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "Neha Kapoor",
    userImage:
      "https://images.unsplash.com/photo-1664106487244-13e13a4b07af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwdGVzdGltb25pYWwlMjB3b21hbnxlbnwxfHx8fDE3NzM4OTc0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    comment:
      "This serum is amazing! My skin looks brighter and more even-toned after just 2 weeks. The texture is lightweight and absorbs quickly. Will definitely repurchase!",
    date: "2026-03-10",
    verified: true,
  },
  {
    id: "2",
    productId: "1",
    userName: "Ritu Singh",
    userImage:
      "https://images.unsplash.com/photo-1696025487682-9916beeb73e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFwcGx5aW5nJTIwc2VydW0lMjBmYWNlfGVufDF8fHx8MTc3MzkyMDk0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4,
    comment:
      "Great product! Noticed improvement in my dark spots. The only thing is it can be a bit sticky in humid weather, but overall very satisfied.",
    date: "2026-03-05",
    verified: true,
  },
  {
    id: "3",
    productId: "2",
    userName: "Simran Patel",
    userImage:
      "https://images.unsplash.com/photo-1664106487244-13e13a4b07af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwdGVzdGltb25pYWwlMjB3b21hbnxlbnwxfHx8fDE3NzM4OTc0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    comment:
      "Perfect moisturizer for my dry skin! It keeps my skin hydrated without feeling heavy. Love the packaging too.",
    date: "2026-03-12",
    verified: true,
  },
];

export const banners = [
  {
    id: "1",
    title: "Glow Naturally",
    subtitle: "Science-Backed Skincare",
    description: "Up to 30% off on all serums",
    image:
      "/images/header1.jpeg",
    cta: "Shop Now",
    link: "/products",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "SunScreen",
    description: "Anti-aging power now available",
    image:
      "/images/header2.jpeg",
    cta: "",
    link: "",
  },
  {
    id: "3",
    title: "Best Sellers",
    subtitle: "Customer Favorites",
    description: "Free shipping on orders above ₹999",
    image:
      "/images/header3.jpeg",
    cta: "Shop Best Sellers",
    link: "/products?filter=bestseller",
  },
];
