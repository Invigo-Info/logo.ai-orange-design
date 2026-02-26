import { readdir } from "fs/promises";
import path from "path";

export interface DynamicCategory {
  key: string;
  label: string;
  folder: string;
  count: number;
}

const PREFERRED_ORDER = [
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
  "insurance-agency",
  "jewelry-brand",
  "tech-startup",
];

function folderToLabel(folder: string): string {
  return folder
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function folderToKey(folder: string): string {
  const parts = folder.split("-");
  return parts
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
}

export async function getMockupCategories(): Promise<DynamicCategory[]> {
  const baseDir = path.join(process.cwd(), "public", "logo-mockups");
  return scanCategories(baseDir);
}

async function scanCategories(baseDir: string): Promise<DynamicCategory[]> {
  const entries = await readdir(baseDir, { withFileTypes: true });

  const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const results: { folder: string; count: number }[] = [];

  await Promise.all(
    folders.map(async (folder) => {
      const files = await readdir(path.join(baseDir, folder));
      const pngCount = files.filter((f) =>
        f.toLowerCase().endsWith(".png"),
      ).length;
      if (pngCount > 0) {
        results.push({ folder, count: pngCount });
      }
    }),
  );

  // Sort: preferred order first, then alphabetical for unknown folders
  const orderIndex = new Map(PREFERRED_ORDER.map((f, i) => [f, i]));

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
  }));
}

export async function getLogoCategories(): Promise<DynamicCategory[]> {
  const baseDir = path.join(process.cwd(), "public", "logo-examples");
  return scanCategories(baseDir);
}
