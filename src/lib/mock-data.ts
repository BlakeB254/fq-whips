// Mock data for Fast Quick Whipz demo

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  type: "sedan" | "suv" | "truck" | "luxury" | "electric";
  pricePerDay: number;
  discountedPrice: number; // Price when booking 3+ days
  weeklyPrice: number; // Price per day for 7+ days
  images: string[];
  features: string[];
  location: string;
  host: Host;
  rating: number;
  reviews: number;
  available: boolean;
  instantBook: boolean;
  description: string;
  mileageIncluded: number; // Miles per day included
  fuelPolicy: "full-to-full" | "same-to-same";
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  responseTime: string;
  responseRate: number;
  verified: boolean;
  joinedYear: number;
  trips: number;
}

export interface Booking {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  createdAt: string;
  renter?: string; // Name of the person renting (for provider view)
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  type: "customer" | "provider";
  verified: boolean;
  phone?: string;
  joinedDate: string;
}

// Demo credentials
export const DEMO_CREDENTIALS = {
  customer: {
    email: "demo.customer@fqwhipz.com",
    password: "demo123",
  },
  provider: {
    email: "demo.provider@fqwhipz.com",
    password: "demo123",
  },
};

// Mock hosts
export const hosts: Host[] = [
  {
    id: "host-1",
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    rating: 4.9,
    responseTime: "within an hour",
    responseRate: 98,
    verified: true,
    joinedYear: 2022,
    trips: 156,
  },
  {
    id: "host-2",
    name: "Sarah Mitchell",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 4.8,
    responseTime: "within an hour",
    responseRate: 95,
    verified: true,
    joinedYear: 2021,
    trips: 234,
  },
  {
    id: "host-3",
    name: "David Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5.0,
    responseTime: "within minutes",
    responseRate: 100,
    verified: true,
    joinedYear: 2023,
    trips: 89,
  },
  {
    id: "host-4",
    name: "Emily Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    rating: 4.7,
    responseTime: "within a few hours",
    responseRate: 92,
    verified: true,
    joinedYear: 2022,
    trips: 178,
  },
];

// Mock vehicles - Fast Quick Whipz fleet (10 vehicles)
export const vehicles: Vehicle[] = [
  // User's actual fleet vehicles
  {
    id: "v-1",
    make: "Ford",
    model: "Fusion",
    year: 2019,
    type: "sedan",
    pricePerDay: 45,
    discountedPrice: 38,
    weeklyPrice: 32,
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
    ],
    features: ["Bluetooth", "Backup Camera", "Apple CarPlay", "Cruise Control", "Keyless Entry"],
    location: "Chicago, IL",
    host: hosts[0],
    rating: 4.9,
    reviews: 47,
    available: true,
    instantBook: true,
    description: "Reliable and fuel-efficient Ford Fusion perfect for daily commutes or weekend getaways. Smooth ride with great gas mileage and all the modern conveniences you need.",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
  {
    id: "v-2",
    make: "Nissan",
    model: "Altima",
    year: 2020,
    type: "sedan",
    pricePerDay: 48,
    discountedPrice: 40,
    weeklyPrice: 35,
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
    ],
    features: ["AWD Available", "ProPILOT Assist", "Apple CarPlay", "Android Auto", "Heated Seats"],
    location: "Milwaukee, WI",
    host: hosts[1],
    rating: 4.8,
    reviews: 32,
    available: true,
    instantBook: true,
    description: "Stylish Nissan Altima with advanced safety features. ProPILOT Assist makes highway driving a breeze. Great for business trips or family outings.",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
  {
    id: "v-3",
    make: "Chrysler",
    model: "200",
    year: 2017,
    type: "sedan",
    pricePerDay: 38,
    discountedPrice: 32,
    weeklyPrice: 28,
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
    ],
    features: ["Leather Interior", "Touchscreen Display", "Bluetooth", "Backup Camera", "USB Ports"],
    location: "Detroit, MI",
    host: hosts[2],
    rating: 4.7,
    reviews: 28,
    available: true,
    instantBook: false,
    description: "Comfortable Chrysler 200 with a premium leather interior at an affordable price. Perfect for those who want style without breaking the bank.",
    mileageIncluded: 150,
    fuelPolicy: "same-to-same",
  },
  {
    id: "v-4",
    make: "Nissan",
    model: "Versa",
    year: 2021,
    type: "sedan",
    pricePerDay: 35,
    discountedPrice: 29,
    weeklyPrice: 25,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800",
    ],
    features: ["Excellent MPG", "Apple CarPlay", "Android Auto", "Automatic Emergency Braking", "Bluetooth"],
    location: "Indianapolis, IN",
    host: hosts[3],
    rating: 4.8,
    reviews: 56,
    available: true,
    instantBook: true,
    description: "Budget-friendly Nissan Versa that doesn't compromise on features. Best-in-class fuel economy makes this perfect for road trips across the Midwest.",
    mileageIncluded: 250,
    fuelPolicy: "full-to-full",
  },
  // Additional fleet vehicles for demo
  {
    id: "v-5",
    make: "Honda",
    model: "Accord",
    year: 2021,
    type: "sedan",
    pricePerDay: 55,
    discountedPrice: 46,
    weeklyPrice: 40,
    images: [
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800",
    ],
    features: ["Honda Sensing", "Leather Seats", "Sunroof", "Wireless CarPlay", "Heated Seats"],
    location: "Chicago, IL",
    host: hosts[0],
    rating: 4.9,
    reviews: 63,
    available: true,
    instantBook: true,
    description: "Premium Honda Accord with all the bells and whistles. Honda Sensing safety suite keeps you protected while the leather interior keeps you comfortable.",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
  {
    id: "v-6",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    type: "sedan",
    pricePerDay: 52,
    discountedPrice: 44,
    weeklyPrice: 38,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
    ],
    features: ["Toyota Safety Sense", "JBL Audio", "Wireless Charging", "Lane Departure Alert", "Adaptive Cruise"],
    location: "Columbus, OH",
    host: hosts[1],
    rating: 4.9,
    reviews: 89,
    available: true,
    instantBook: true,
    description: "America's best-selling sedan for a reason. Legendary Toyota reliability meets modern technology. Perfect for business trips or family adventures.",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
  {
    id: "v-7",
    make: "Chevrolet",
    model: "Malibu",
    year: 2020,
    type: "sedan",
    pricePerDay: 42,
    discountedPrice: 35,
    weeklyPrice: 30,
    images: [
      "https://images.unsplash.com/photo-1537984822441-cff330929b84?w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
    ],
    features: ["Teen Driver Mode", "4G LTE WiFi", "Apple CarPlay", "Android Auto", "Rear Cross Traffic Alert"],
    location: "Minneapolis, MN",
    host: hosts[2],
    rating: 4.6,
    reviews: 41,
    available: true,
    instantBook: true,
    description: "Spacious Chevy Malibu with built-in WiFi hotspot. Great for families or road warriors who need to stay connected on the go.",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
  {
    id: "v-8",
    make: "Hyundai",
    model: "Sonata",
    year: 2022,
    type: "sedan",
    pricePerDay: 49,
    discountedPrice: 41,
    weeklyPrice: 36,
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800",
    ],
    features: ["Digital Key", "Blind Spot Collision Avoidance", "Smart Cruise", "Ventilated Seats", "Bose Audio"],
    location: "Madison, WI",
    host: hosts[3],
    rating: 4.8,
    reviews: 37,
    available: true,
    instantBook: false,
    description: "Award-winning Hyundai Sonata with stunning design and cutting-edge tech. Digital Key lets you unlock and start the car with your phone!",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
  {
    id: "v-9",
    make: "Kia",
    model: "K5",
    year: 2023,
    type: "sedan",
    pricePerDay: 54,
    discountedPrice: 45,
    weeklyPrice: 39,
    images: [
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    ],
    features: ["Turbocharged", "360 Camera", "Heads-Up Display", "Wireless Phone Charger", "Smart Park Assist"],
    location: "Cleveland, OH",
    host: hosts[0],
    rating: 4.9,
    reviews: 24,
    available: true,
    instantBook: true,
    description: "The sporty Kia K5 turns heads wherever it goes. Turbocharged power meets premium features at an incredible value.",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
  {
    id: "v-10",
    make: "Mazda",
    model: "Mazda3",
    year: 2021,
    type: "sedan",
    pricePerDay: 46,
    discountedPrice: 39,
    weeklyPrice: 33,
    images: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
    ],
    features: ["i-Activsense Safety", "Bose Audio", "Heads-Up Display", "AWD Available", "Premium Interior"],
    location: "Kansas City, MO",
    host: hosts[1],
    rating: 4.7,
    reviews: 52,
    available: true,
    instantBook: true,
    description: "The driver's choice! Mazda3 delivers an engaging driving experience with a premium interior that rivals luxury brands.",
    mileageIncluded: 200,
    fuelPolicy: "full-to-full",
  },
];

// Mock bookings for customer view
export const customerBookings: Booking[] = [
  {
    id: "b-1",
    vehicleId: "v-1",
    vehicle: vehicles[0],
    startDate: "2024-12-15",
    endDate: "2024-12-18",
    totalPrice: 267,
    status: "confirmed",
    createdAt: "2024-12-01",
  },
  {
    id: "b-2",
    vehicleId: "v-3",
    vehicle: vehicles[2],
    startDate: "2024-11-20",
    endDate: "2024-11-22",
    totalPrice: 220,
    status: "completed",
    createdAt: "2024-11-15",
  },
];

// Mock bookings for provider view
export const providerBookings: Booking[] = [
  {
    id: "pb-1",
    vehicleId: "v-1",
    vehicle: vehicles[0],
    startDate: "2024-12-15",
    endDate: "2024-12-18",
    totalPrice: 267,
    status: "pending",
    createdAt: "2024-12-10",
  },
  {
    id: "pb-2",
    vehicleId: "v-5",
    vehicle: vehicles[4],
    startDate: "2024-12-20",
    endDate: "2024-12-25",
    totalPrice: 750,
    status: "confirmed",
    createdAt: "2024-12-05",
  },
  {
    id: "pb-3",
    vehicleId: "v-1",
    vehicle: vehicles[0],
    startDate: "2024-11-28",
    endDate: "2024-12-02",
    totalPrice: 356,
    status: "completed",
    createdAt: "2024-11-20",
  },
];

// Midwest locations
export const MIDWEST_LOCATIONS = [
  "Chicago, IL",
  "Detroit, MI",
  "Milwaukee, WI",
  "Minneapolis, MN",
  "Indianapolis, IN",
  "Columbus, OH",
  "Cleveland, OH",
  "Madison, WI",
  "Kansas City, MO",
  "St. Louis, MO",
];

// FAQ data
export const faqs = [
  {
    question: "Why is Fast Quick Whipz only available in the Midwest?",
    answer: "We're currently in beta testing, focusing on the Midwest to ensure we deliver the best possible experience. By starting regionally, we can provide personalized support, faster response times, and refine our service before expanding nationally. Our goal is to be the most reliable car-sharing platform, and that starts with getting it right in our home region.",
  },
  {
    question: "What's included in the rental price?",
    answer: "Our prices are 100% transparent with no hidden fees. The listed price includes the daily rental rate, liability insurance, and 24/7 roadside assistance. You'll only pay extra for optional add-ons like premium insurance upgrades or additional drivers.",
  },
  {
    question: "How does the pickup process work?",
    answer: "We offer flexible pickup options! Most hosts offer contactless pickup with lockboxes or smart locks. You'll receive detailed instructions before your trip. Our Quick Pickup Guarantee ensures you're on the road within 15 minutes of your scheduled time.",
  },
  {
    question: "What if something goes wrong during my rental?",
    answer: "We've got you covered 24/7! Our Midwest-based support team is just a call away. We offer roadside assistance, emergency support, and if needed, we'll work with you to find a replacement vehicle. Your safety and satisfaction are our top priorities.",
  },
  {
    question: "How do I become a host?",
    answer: "Becoming a host is simple! Sign up, list your vehicle with photos and details, set your availability and pricing, and start earning. We handle the insurance, payment processing, and provide 24/7 support. Most hosts earn $500-$1,500+ per month per vehicle.",
  },
  {
    question: "What insurance coverage is included?",
    answer: "Every rental includes liability insurance that meets or exceeds state minimums. Hosts' personal insurance is protected through our Host Protection Program. Guests can also purchase additional coverage for comprehensive protection.",
  },
  {
    question: "Can I modify or cancel my booking?",
    answer: "Yes! Free cancellation is available up to 24 hours before your trip. Modifications can be made anytime before your trip starts, subject to vehicle availability. We believe in flexibility because life happens.",
  },
  {
    question: "How are hosts and guests verified?",
    answer: "Safety is paramount. All users undergo identity verification including driver's license validation. Hosts and guests can see ratings and reviews before booking. We also verify vehicle registration and insurance for all listed cars.",
  },
];
