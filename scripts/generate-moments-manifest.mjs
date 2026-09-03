import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const dir = path.join(process.cwd(), "public", "moments");
const outFile = path.join(process.cwd(), "public", "moments-manifest.json");

let files = [];
try {
    files = fs.readdirSync(dir);
} catch {
    files = [];
}

const imageFiles = files.filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase())).sort();

const images = [];
for (const f of imageFiles) {
    const name = path.basename(f, path.extname(f));
    const caption = name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const meta = await sharp(path.join(dir, f)).metadata();
    images.push({
        src: `/moments/${f}`,
        caption,
        width: meta.width ?? 1000,
        height: meta.height ?? 1250,
    });
}

fs.writeFileSync(outFile, JSON.stringify(images, null, 2));
console.log(`[moments] wrote ${images.length} image(s) to public/moments-manifest.json`);
