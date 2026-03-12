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
  const mockupBlobUrls: Record<string, Record<string, string>> = await import(
    "@/data/mockupBlobUrls.json"
  ).then((m) => m.default);

  const orderIndex = new Map(PREFERRED_ORDER.map((f, i) => [f, i]));
  const folders = Object.keys(mockupBlobUrls);

  const results = folders
    .map((folder) => ({ folder, count: Object.keys(mockupBlobUrls[folder]).length }))
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
  }));
}

export async function getLogoCategories(): Promise<DynamicCategory[]> {
  const blobUrls: Record<string, Record<string, string>> = await import(
    "@/data/blobUrls.json"
  ).then((m) => m.default);

  const orderIndex = new Map(PREFERRED_ORDER.map((f, i) => [f, i]));
  const folders = Object.keys(blobUrls);

  const results = folders
    .map((folder) => ({ folder, count: Object.keys(blobUrls[folder]).length }))
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
  }));
}
