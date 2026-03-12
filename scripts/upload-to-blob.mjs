import { put } from "@vercel/blob";
import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const BASE = "public/logo-examples";
const urlMap = {};

const folders = (await readdir(BASE, { withFileTypes: true }))
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

let totalUploaded = 0;
const totalFiles = 384;

for (const folder of folders) {
  const folderPath = path.join(BASE, folder);
  const files = (await readdir(folderPath)).filter((f) => f.endsWith(".png"));
  files.sort((a, b) => parseInt(a) - parseInt(b));
  urlMap[folder] = {};

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileBuffer = await readFile(filePath);
    const blobPath = `logo-examples/${folder}/${file}`;

    const { url } = await put(blobPath, fileBuffer, {
      access: "public",
      addRandomSuffix: false,
    });

    const index = parseInt(file.replace(".png", ""));
    urlMap[folder][index] = url;
    totalUploaded++;
    console.log(`[${totalUploaded}/${totalFiles}] ${blobPath}`);
  }
}

await writeFile("src/data/blobUrls.json", JSON.stringify(urlMap, null, 2));
console.log("\nAll uploaded! URL map saved to src/data/blobUrls.json");
