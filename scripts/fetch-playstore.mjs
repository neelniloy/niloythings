import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractAppsFromDataFile() {
  const dataPath = path.join(__dirname, "..", "lib", "data.ts");
  if (!fs.existsSync(dataPath)) return { playStoreIds: [], appStoreIds: [] };
  const content = fs.readFileSync(dataPath, "utf8");

  const playMatches = [
    ...content.matchAll(
      /play\.google\.com\/store\/apps\/details\?id=([a-zA-Z0-9._]+)/g
    ),
  ];
  const appStoreMatches = [
    ...content.matchAll(/apps\.apple\.com\/[^"'\s]+\/id([0-9]+)/g),
  ];

  return {
    playStoreIds: [...new Set(playMatches.map((m) => m[1]))],
    appStoreIds: [...new Set(appStoreMatches.map((m) => m[1]))],
  };
}

function extractPlayStoreMedia(html) {
  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const screenshots = [];
  let icon = null;

  for (const tag of imgTags) {
    const isScreenshot =
      /alt=["']Screenshot image["']/i.test(tag) ||
      /data-screenshot-index=/i.test(tag);
    const isIcon =
      /alt=["']Icon image["']/i.test(tag) ||
      (/itemprop=["']image["']/i.test(tag) && !isScreenshot && !icon);

    const srcMatch = tag.match(
      /src=["'](https:\/\/play-lh\.googleusercontent\.com\/[^"']+)["']/i
    );
    if (!srcMatch) continue;

    const base = srcMatch[1].split("=")[0];

    if (isScreenshot) {
      const url = `${base}=w1080`;
      if (!screenshots.includes(url)) {
        screenshots.push(url);
      }
    } else if (isIcon && !icon) {
      icon = `${base}=s256`;
    }
  }

  return { icon, screenshots };
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function fetchAndSaveAll() {
  const { playStoreIds, appStoreIds } = extractAppsFromDataFile();
  console.log(
    `Discovered ${playStoreIds.length} Play Store apps & ${appStoreIds.length} App Store apps from lib/data.ts`
  );

  const publicDir = path.join(__dirname, "..", "public");
  const playstoreMediaDir = path.join(publicDir, "playstore");

  if (!fs.existsSync(playstoreMediaDir)) {
    fs.mkdirSync(playstoreMediaDir, { recursive: true });
  }

  const manifestPath = path.join(publicDir, "playstore-manifest.json");
  let existingManifest = {};
  if (fs.existsSync(manifestPath)) {
    try {
      existingManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    } catch {
      existingManifest = {};
    }
  }

  const manifest = { ...existingManifest };

  // 1. Fetch Google Play Store Apps
  for (const id of playStoreIds) {
    try {
      const appDir = path.join(playstoreMediaDir, id);
      const iconPath = path.join(appDir, "icon.png");
      const screenshot1Path = path.join(appDir, "screenshot-1.png");

      const isCached =
        manifest[id] &&
        fs.existsSync(iconPath) &&
        fs.existsSync(screenshot1Path);

      if (isCached && !process.argv.includes("--force")) {
        console.log(`  [PlayStore: ${id}] Using cached assets`);
        continue;
      }

      console.log(`Fetching ${id} from Google Play...`);
      const res = await fetch(
        `https://play.google.com/store/apps/details?id=${id}&hl=en`
      );
      if (!res.ok) {
        console.warn(`  [PlayStore: ${id}] Store returned HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      const media = extractPlayStoreMedia(html);

      if (!fs.existsSync(appDir)) {
        fs.mkdirSync(appDir, { recursive: true });
      }

      let localIcon = null;
      if (media.icon) {
        try {
          await downloadFile(media.icon, iconPath);
          localIcon = `/playstore/${id}/icon.png`;
        } catch (e) {
          console.warn(`  [PlayStore: ${id}] Failed icon:`, e.message);
          localIcon = media.icon;
        }
      }

      const localScreenshots = [];
      for (let i = 0; i < media.screenshots.length; i++) {
        const remoteUrl = media.screenshots[i];
        const screenPath = path.join(appDir, `screenshot-${i + 1}.png`);
        try {
          await downloadFile(remoteUrl, screenPath);
          localScreenshots.push(`/playstore/${id}/screenshot-${i + 1}.png`);
        } catch (e) {
          console.warn(
            `  [PlayStore: ${id}] Failed screenshot ${i + 1}:`,
            e.message
          );
          localScreenshots.push(remoteUrl);
        }
      }

      manifest[id] = {
        icon: localIcon,
        screenshots: localScreenshots,
      };

      console.log(
        `  [PlayStore: ${id}] Synced ${localScreenshots.length} screenshots & icon`
      );
    } catch (e) {
      console.error(`  [PlayStore: ${id}] Error: ${e.message}`);
    }
  }

  // 2. Fetch Apple App Store Apps (e.g. Futuredesh)
  for (const appleId of appStoreIds) {
    const key = `apple_${appleId}`;
    try {
      const appDir = path.join(playstoreMediaDir, key);
      const iconPath = path.join(appDir, "icon.png");
      const screenshot1Path = path.join(appDir, "screenshot-1.png");

      const isCached =
        manifest[key] &&
        fs.existsSync(iconPath) &&
        fs.existsSync(screenshot1Path);

      if (isCached && !process.argv.includes("--force")) {
        console.log(`  [AppStore: ${appleId}] Using cached assets`);
        continue;
      }

      console.log(`Fetching ${appleId} from Apple App Store...`);
      const res = await fetch(`https://itunes.apple.com/lookup?id=${appleId}`);
      if (!res.ok) {
        console.warn(`  [AppStore: ${appleId}] iTunes returned HTTP ${res.status}`);
        continue;
      }
      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        console.warn(`  [AppStore: ${appleId}] No results found`);
        continue;
      }

      const appData = data.results[0];
      if (!fs.existsSync(appDir)) {
        fs.mkdirSync(appDir, { recursive: true });
      }

      let localIcon = null;
      if (appData.artworkUrl512) {
        try {
          await downloadFile(appData.artworkUrl512, iconPath);
          localIcon = `/playstore/${key}/icon.png`;
        } catch (e) {
          console.warn(`  [AppStore: ${appleId}] Failed icon:`, e.message);
          localIcon = appData.artworkUrl512;
        }
      }

      const localScreenshots = [];
      const rawScreenshots = appData.screenshotUrls || [];
      for (let i = 0; i < rawScreenshots.length; i++) {
        // Request full resolution screenshot
        const hiResUrl = rawScreenshots[i].replace(
          /\/[0-9]+x[0-9]+bb\.(jpg|png)/,
          "/1242x2688bb.png"
        );
        const screenPath = path.join(appDir, `screenshot-${i + 1}.png`);
        try {
          await downloadFile(hiResUrl, screenPath);
          localScreenshots.push(`/playstore/${key}/screenshot-${i + 1}.png`);
        } catch {
          try {
            await downloadFile(rawScreenshots[i], screenPath);
            localScreenshots.push(`/playstore/${key}/screenshot-${i + 1}.png`);
          } catch (e) {
            console.warn(`  [AppStore: ${appleId}] Failed screenshot ${i + 1}:`, e.message);
          }
        }
      }

      manifest[key] = {
        icon: localIcon,
        screenshots: localScreenshots,
      };

      console.log(
        `  [AppStore: ${appleId}] Synced ${localScreenshots.length} screenshots & icon for ${appData.trackName}`
      );
    } catch (e) {
      console.error(`  [AppStore: ${appleId}] Error: ${e.message}`);
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Manifest updated with ${Object.keys(manifest).length} total apps`);
}

fetchAndSaveAll();
