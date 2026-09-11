import playstoreManifest from "@/public/playstore-manifest.json";

export interface PlayStoreMedia {
    icon: string | null;
    screenshots: string[];
}

export function getPackageId(playStoreUrl?: string): string | null {
    if (!playStoreUrl) return null;
    try {
        const match = playStoreUrl.match(/id=([a-zA-Z0-9._]+)/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}

export function getAppStoreId(appStoreUrl?: string): string | null {
    if (!appStoreUrl) return null;
    try {
        const match = appStoreUrl.match(/id([0-9]+)/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}

export function getPlayStoreMedia(playStoreUrl?: string): PlayStoreMedia | null {
    const pkg = getPackageId(playStoreUrl);
    if (!pkg) return null;
    const data = (playstoreManifest as Record<string, PlayStoreMedia>)[pkg];
    return data || null;
}

export function getProjectAppMedia(links?: { playStore?: string; appStore?: string }): PlayStoreMedia | null {
    if (!links) return null;
    const manifest = playstoreManifest as Record<string, PlayStoreMedia>;

    if (links.playStore) {
        const pkg = getPackageId(links.playStore);
        if (pkg && manifest[pkg] && manifest[pkg].screenshots.length > 0) {
            return manifest[pkg];
        }
    }

    if (links.appStore) {
        const appleId = getAppStoreId(links.appStore);
        if (appleId) {
            const key = `apple_${appleId}`;
            if (manifest[key] && manifest[key].screenshots.length > 0) {
                return manifest[key];
            }
        }
    }

    return null;
}
