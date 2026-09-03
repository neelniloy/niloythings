import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const dir = path.join(process.cwd(), "public", "moments");
const outFile = path.join(process.cwd(), "public", "moments-manifest.json");

let files = [];
try {
    files = fs.readdirSync(dir);
} catch {
    files = [];
}

const images = files
    .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => {
        const name = path.basename(f, path.extname(f));
        const caption = name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return { src: `/moments/${f}`, caption };
    });

fs.writeFileSync(outFile, JSON.stringify(images, null, 2));
console.log(`[moments] wrote ${images.length} image(s) to public/moments-manifest.json`);
