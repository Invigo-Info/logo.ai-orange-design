export interface LogoItem {
  n: string;
  t: string;
  bg: string;
  tc: string;
}

export interface Category {
  l: string;
  folder: string;
  items: LogoItem[];
}

function generateItems(count: number): LogoItem[] {
  return Array.from({ length: count }, (_, i) => ({
    n: `${i + 1}`,
    t: "",
    bg: "#1a1a1a",
    tc: "#ffffff",
  }));
}

export const categories: Record<string, Category> = {
  restaurant: {
    l: "Restaurant",
    folder: "restaurant",
    items: generateItems(24),
  },
  coffeeShop: {
    l: "Coffee Shop",
    folder: "coffee-shop",
    items: generateItems(24),
  },
  bakery: {
    l: "Bakery",
    folder: "bakery",
    items: generateItems(24),
  },
  foodTruck: {
    l: "Food Truck",
    folder: "food-truck",
    items: generateItems(24),
  },
  barbershop: {
    l: "Barbershop",
    folder: "barbershop",
    items: generateItems(24),
  },
  hairSalon: {
    l: "Hair Salon",
    folder: "hair-salon",
    items: generateItems(24),
  },
  nailStudio: {
    l: "Nail Studio",
    folder: "nail-studio",
    items: generateItems(24),
  },
  boutique: {
    l: "Boutique",
    folder: "boutique",
    items: generateItems(24),
  },
  clothingBrand: {
    l: "Clothing Brand",
    folder: "clothing-brand",
    items: generateItems(24),
  },
  gym: {
    l: "Gym",
    folder: "gym",
    items: generateItems(24),
  },
  cleaningService: {
    l: "Cleaning Service",
    folder: "cleaning-service",
    items: generateItems(24),
  },
  landscaping: {
    l: "Landscaping",
    folder: "landscaping-company",
    items: generateItems(24),
  },
  petGrooming: {
    l: "Pet Grooming",
    folder: "pet-grooming",
    items: generateItems(24),
  },
  ecommerce: {
    l: "E-Commerce",
    folder: "e-commerce-brand",
    items: generateItems(24),
  },
  contentCreator: {
    l: "Content Creator",
    folder: "content-creator",
    items: generateItems(24),
  },
  tattooStudio: {
    l: "Tattoo Studio",
    folder: "tattoo-studio",
    items: generateItems(22),
  },
};

export const categoryKeys = Object.keys(categories);
