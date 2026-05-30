export interface Subcategory {
  key: string;
  label: string;
  slug: string;
  count: number;
}

export interface DynamicCategory {
  key: string;
  label: string;
  folder: string;
  count: number;
  isPopular: boolean;
  subcategories: Subcategory[];
}

export function subcategorySlug(label: string, parentFolder: string): string {
  const labelSlug = label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${labelSlug}-${parentFolder}`;
}

export const POPULAR_FOLDERS = [
  "restaurant",
  "coffee-shop",
  "bakery",
  "food-truck",
  "barbershop",
  "hair-salon",
  "nail-studio",
  "boutique",
  "clothing-brand",
  "gym",
  "cleaning-service",
  "landscaping-company",
  "pet-grooming",
  "e-commerce-brand",
  "content-creator",
  "tattoo-studio",
];

const SUBCATEGORIES_BY_FOLDER: Record<string, string[]> = {
  restaurant: ["Italian", "Mexican", "Chinese", "Japanese", "Thai", "Seafood", "Steakhouse", "Breakfast", "Burger", "Chicken", "Quick Service", "Soul Food"],
  "coffee-shop": ["Specialty", "Espresso Bar", "Cafe", "Roastery", "Drive-Thru", "Boutique"],
  bakery: ["Bread", "Pastry", "Cake", "Donut", "Patisserie", "Artisan"],
  "food-truck": ["Tacos", "Burgers", "BBQ", "Asian Fusion", "Desserts", "Pizza"],
  barbershop: ["Classic", "Modern", "Premium", "Vintage", "Mens Grooming"],
  "hair-salon": ["Color", "Styling", "Bridal", "Mens", "Childrens", "Extensions"],
  "nail-studio": ["Manicure", "Pedicure", "Acrylic", "Gel", "Nail Art"],
  boutique: ["Womens", "Mens", "Vintage", "Luxury", "Streetwear"],
  "clothing-brand": ["Streetwear", "Activewear", "Luxury", "Casual", "Workwear"],
  gym: ["CrossFit", "Yoga", "Pilates", "Boxing", "Personal Training"],
  "cleaning-service": ["Residential", "Commercial", "Eco-Friendly", "Carpet", "Window"],
  "landscaping-company": ["Residential", "Commercial", "Hardscape", "Lawn Care", "Tree Service"],
  "pet-grooming": ["Dog", "Cat", "Mobile", "Spa", "Puppy"],
  "e-commerce-brand": ["Fashion", "Electronics", "Home Goods", "Beauty", "Subscription"],
  "content-creator": ["YouTube", "Podcast", "Instagram", "TikTok", "Blog"],
  "tattoo-studio": ["Traditional", "Modern", "Minimalist", "Color", "Black & Grey"],
  "accounting-firm": ["Tax", "Bookkeeping", "Audit", "Personal", "Small Business"],
  "architecture-firm": ["Residential", "Commercial", "Interior", "Landscape", "Sustainable"],
  "auto-repair-shop": ["Foreign", "Domestic", "Body Work", "Quick Lube", "Performance"],
  bookstore: ["Independent", "Used", "Comic", "Childrens", "Academic"],
  "branding-agency": ["Boutique", "Strategy", "Visual Identity", "Naming", "Rebrand"],
  brewery: ["Craft", "Microbrewery", "Brewpub", "IPA", "Lager"],
  butcher: ["Local", "Halal", "Kosher", "Premium", "Custom Cuts"],
  "car-dealership": ["New Cars", "Used Cars", "Luxury", "Trucks", "Electric"],
  "car-wash": ["Express", "Detail", "Self-Serve", "Mobile", "Eco-Friendly"],
  carpenter: ["Custom", "Cabinetry", "Framing", "Finish", "Restoration"],
  catering: ["Wedding", "Corporate", "Event", "Drop-Off", "Buffet"],
  "childcare-center": ["Daycare", "Preschool", "Montessori", "Infant", "After School"],
  "consulting-firm": ["Management", "IT", "HR", "Strategy", "Marketing"],
  "cyber-security": ["Network", "Cloud", "Compliance", "Pen Testing", "MSSP"],
  "dental-clinic": ["General", "Pediatric", "Orthodontic", "Cosmetic", "Family"],
  "donut-shop": ["Classic", "Gourmet", "Vegan", "Mini", "Filled"],
  electrician: ["Residential", "Commercial", "Industrial", "Solar", "Smart Home"],
  "event-planning-company": ["Wedding", "Corporate", "Birthday", "Conference", "Production"],
  "general-contractor": ["Residential", "Commercial", "Design-Build", "Renovation", "New Build"],
  "home-builder": ["Custom", "Luxury", "Modular", "Eco-Friendly", "Production"],
  "home-remodeling": ["Kitchen", "Bath", "Whole Home", "Basement", "Addition"],
  hotel: ["Boutique", "Luxury", "Resort", "Business", "Budget"],
  "hvac-company": ["Residential", "Commercial", "Heating", "Cooling", "Refrigeration"],
  "insurance-agency": ["Auto", "Home", "Life", "Health", "Commercial"],
  jewellery: ["Fine", "Custom", "Vintage", "Engagement", "Handmade"],
  "law-firm": ["Personal Injury", "Family", "Criminal", "Corporate", "Real Estate"],
  "life-coach": ["Career", "Wellness", "Executive", "Relationship", "Spiritual"],
  "logistics-company": ["Freight", "Last-Mile", "Warehousing", "International", "Cold Chain"],
  "marketing-agency": ["Digital", "SEO", "Social Media", "Content", "Performance"],
  "med-spa": ["Facials", "Botox", "Laser", "Body Contouring", "Wellness"],
  "mental-health-practice": ["Therapy", "Counseling", "Psychiatry", "Group", "Couples"],
  "mortgage-brokerage": ["Residential", "Commercial", "Refinance", "First-Time", "Investment"],
  "moving-company": ["Local", "Long Distance", "Commercial", "Packing", "Storage"],
  nutritionist: ["Sports", "Weight Loss", "Clinical", "Holistic", "Plant-Based"],
  "online-course-platform": ["Business", "Tech", "Creative", "Wellness", "Academic"],
  orthopedic: ["Sports Medicine", "Joint Replacement", "Spine", "Pediatric", "Trauma"],
  "physical-therapy-clinic": ["Sports", "Orthopedic", "Pediatric", "Geriatric", "Aquatic"],
  "plumbing-company": ["Residential", "Commercial", "Emergency", "Drain", "Water Heater"],
  "pool-service-company": ["Maintenance", "Cleaning", "Repair", "Installation", "Inspection"],
  "property-management-company": ["Residential", "Commercial", "HOA", "Vacation", "Multi-Family"],
  "real-estate-agency": ["Residential", "Commercial", "Luxury", "Rental", "Investment"],
  "roofing-company": ["Residential", "Commercial", "Metal", "Shingle", "Flat Roof"],
  "saas-company": ["B2B", "Marketing", "Analytics", "HR", "Finance"],
  "skincare-brand": ["Anti-Aging", "Acne", "Natural", "Luxury", "Sensitive"],
  "solar-installation-company": ["Residential", "Commercial", "Off-Grid", "Battery Storage", "Maintenance"],
  "tech-startup": ["AI", "SaaS", "Fintech", "Healthtech", "Edtech"],
  "trucking-company": ["Long Haul", "Local", "Refrigerated", "Flatbed", "Heavy Haul"],
  "vape-shop": ["E-Liquid", "Hardware", "Premium", "CBD", "Disposable"],
  "veterinary-clinic": ["Dog & Cat", "Exotic", "Equine", "Emergency", "Mobile"],
};

const PREFERRED_ORDER = [
  ...POPULAR_FOLDERS,
  "insurance-agency",
  "jewelry-brand",
  "tech-startup",
];

const UPPERCASE_WORDS = new Set(["saas", "hvac"]);

function folderToLabel(folder: string): string {
  return folder
    .split("-")
    .map((w) =>
      UPPERCASE_WORDS.has(w.toLowerCase())
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
}

function folderToKey(folder: string): string {
  const parts = folder.split("-");
  return parts
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
}

export async function getMockupCategories(): Promise<DynamicCategory[]> {
  const fs = await import("fs");
  const path = await import("path");

  const baseDir = path.join(process.cwd(), "public", "logo-mockups");
  const folders = fs.readdirSync(baseDir).filter((f: string) =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
  );

  const orderIndex = new Map(PREFERRED_ORDER.map((f, i) => [f, i]));
  const popularSet = new Set(POPULAR_FOLDERS);

  const results = folders
    .map((folder: string) => {
      const files = fs.readdirSync(path.join(baseDir, folder));
      const count = files.filter((f: string) => f.endsWith(".webp")).length;
      return { folder, count };
    })
    .filter(({ count }) => count > 0);

  results.sort((a, b) => {
    const ai = orderIndex.get(a.folder);
    const bi = orderIndex.get(b.folder);
    if (ai !== undefined && bi !== undefined) return ai - bi;
    if (ai !== undefined) return -1;
    if (bi !== undefined) return 1;
    return a.folder.localeCompare(b.folder);
  });

  return results.map(({ folder, count }) => ({
    key: folderToKey(folder),
    label: folderToLabel(folder),
    folder,
    count,
    isPopular: popularSet.has(folder),
    subcategories: [],
  }));
}

export async function getLogoCategories(): Promise<DynamicCategory[]> {
  const fs = await import("fs");
  const path = await import("path");

  const baseDir = path.join(process.cwd(), "public", "logo-examples");
  const folders = fs.readdirSync(baseDir).filter((f: string) =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
  );

  const orderIndex = new Map(PREFERRED_ORDER.map((f, i) => [f, i]));
  const popularSet = new Set(POPULAR_FOLDERS);

  const results = folders
    .map((folder: string) => {
      const dirPath = path.join(baseDir, folder);
      const entries = fs.readdirSync(dirPath);
      const count = entries.filter((e: string) => {
        if (!e.endsWith(".webp")) return false;
        return fs.statSync(path.join(dirPath, e)).isFile();
      }).length;

      const declared = SUBCATEGORIES_BY_FOLDER[folder] ?? [];
      const subcategories: Subcategory[] = declared.map((label) => {
        const slug = subcategorySlug(label, folder);
        const subPath = path.join(dirPath, slug);
        let subCount = 0;
        try {
          if (fs.statSync(subPath).isDirectory()) {
            subCount = fs
              .readdirSync(subPath)
              .filter((f: string) => f.endsWith(".webp")).length;
          }
        } catch {
          // sub-folder doesn't exist yet
        }
        return { key: folderToKey(slug), label, slug, count: subCount };
      });

      return { folder, count, subcategories };
    })
    .filter(({ count, subcategories }) =>
      count > 0 || subcategories.some((s) => s.count > 0),
    );

  results.sort((a, b) => {
    const ai = orderIndex.get(a.folder);
    const bi = orderIndex.get(b.folder);
    if (ai !== undefined && bi !== undefined) return ai - bi;
    if (ai !== undefined) return -1;
    if (bi !== undefined) return 1;
    return a.folder.localeCompare(b.folder);
  });

  return results.map(({ folder, count, subcategories }) => ({
    key: folderToKey(folder),
    label: folderToLabel(folder),
    folder,
    count,
    isPopular: popularSet.has(folder),
    subcategories,
  }));
}
