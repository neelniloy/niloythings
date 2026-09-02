export interface Project {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tech: string[];
    category: string;
    impact: string;
    color: string;
    links: {
        playStore?: string;
        github?: string;
        website?: string;
    };
}

export interface MicroApp {
    title: string;
    tagline: string;
    image: string;
    installs: string;
    playStore: string;
}

export const EARLY_APPS: MicroApp[] = [
    {
        title: "Project Scan",
        tagline: "Generate, scan, and share QR codes.",
        image: "/apps/projectscan.webp",
        installs: "1K+",
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.projectscan",
    },
    {
        title: "Ledgify",
        tagline: "Expense tracking, debt management & PDF reports.",
        image: "/apps/ledgify.webp",
        installs: "10+",
        playStore: "https://play.google.com/store/apps/details?id=com.niloythings.ledgify",
    },
    {
        title: "D Smart Recovery",
        tagline: "Quickly restore recently deleted files.",
        image: "/apps/dsmartrecovery.webp",
        installs: "100+",
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.dsmartrecovery",
    },
    {
        title: "Billi Weather",
        tagline: "A personal weather assistant.",
        image: "/apps/billiweather.webp",
        installs: "100+",
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.weatherbilli",
    },
    {
        title: "Scheduler",
        tagline: "A class routine manager.",
        image: "/apps/scheduler.webp",
        installs: "10+",
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.scheduler",
    },
    {
        title: "Fun With Elements",
        tagline: "Learn chemical elements the fun way.",
        image: "/apps/funwithelements.webp",
        installs: "10+",
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.funwithelements",
    },
    {
        title: "Tic Tac Toe Shape",
        tagline: "Free to play, priceless to learn.",
        image: "/apps/tictactoe.webp",
        installs: "10+",
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.tictactoeshape",
    },
];

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
}

export const PROJECTS: Project[] = [
    {
        title: "Futuredesh App",
        description: "Mobile platform for diaspora communities with offline-first architecture supporting 50K+ users.",
        longDescription: "Built a complete Flutter-based ecosystem with Firebase backend, implementing advanced offline sync, real-time updates, and native performance optimizations.",
        image: "/projects/futuredesh.png",
        tech: ["Flutter", "Firebase", "Node.js", "Cloud Functions"],
        category: "Mobile",
        impact: "50K+ Users",
        color: "from-red-900/40 to-orange-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.futuredesh.contractFarming",
        },
    },
    {
        title: "Bdjobs",
        description: "Official app for Bangladesh's largest job portal — job search, resume tracking, and employer messaging for 5M+ installs.",
        longDescription: "Maintained and shipped features for the core Android app of Bdjobs.com Ltd, Bangladesh's first and largest career management platform, connecting millions of job seekers with over 10,000 employers.",
        image: "/projects/bdjobs.png",
        tech: ["Android"],
        category: "Enterprise",
        impact: "5M+ Downloads",
        color: "from-blue-900/40 to-indigo-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.bdjobs.app",
        },
    },
    {
        title: "Delivery Tiger",
        description: "Nationwide courier and parcel delivery marketplace covering 64 districts, with real-time tracking and COD.",
        longDescription: "Courier and parcel booking app for Delivery Tiger, Bdjobs.com Ltd's logistics venture — order pickup, real-time tracking, and digital payments across 64 districts and 492 sub-districts in Bangladesh.",
        image: "/projects/deliverytiger.png",
        tech: ["Android"],
        category: "Logistics",
        impact: "1K+ Downloads",
        color: "from-amber-900/40 to-orange-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.bdj.deliverytiger.app",
        },
    },
    {
        title: "KitHub: Skins for DLS",
        description: "Kit, skin, and logo browser for Dream League Soccer with one-tap in-game import — 100K+ downloads.",
        longDescription: "A searchable library of kits, logos, and skins for Dream League Soccer covering major clubs and national teams across every league, refreshed each season. Includes instant copy-paste import into the game and a kit-trivia quiz.",
        image: "/projects/kithub.png",
        tech: ["Android"],
        category: "Gaming",
        impact: "100K+ Downloads",
        color: "from-pink-900/40 to-rose-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.braineer.dlskits",
        },
    },
    {
        title: "LAN Streamer",
        description: "Discovers local FTP and media servers on Bangladesh's BDIX network so users can stream without touching mobile data.",
        longDescription: "Scans a connected Wi-Fi/ISP network for accessible local media, movie, and FTP servers, then surfaces only the working links in a built-in browser — solving a very Bangladesh-specific problem of navigating BDIX network directories.",
        image: "/projects/lanstreamer.png",
        tech: ["Android"],
        category: "Utility",
        impact: "10K+ Downloads",
        color: "from-cyan-900/40 to-teal-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.niloythings.lanstreamer",
        },
    },
    {
        title: "LSTV Prime",
        description: "Multi-platform IPTV player — native apps for Android, Android TV/Fire TV, and Windows, plus a 90+ channel web portfolio.",
        longDescription: "A cross-platform IPTV suite: Kotlin-native Android and Android TV/Fire TV apps, a Flutter-built Windows desktop app, and a companion web app showcasing 90+ live channels and live sports events directly in the browser. Hardware-accelerated playback, D-Pad remote support, and auto-server failover throughout.",
        image: "/projects/lstvprime.png",
        tech: ["Kotlin", "Flutter", "Next.js", "Tailwind", "Cloudflare"],
        category: "Multi-Platform",
        impact: "90+ Channels",
        color: "from-red-900/40 to-neutral-900/40",
        links: {
            website: "https://lstvprime.pages.dev/",
            github: "https://github.com/neelniloy/lstv_app",
        },
    },
    {
        title: "Shromik Seba",
        description: "Community app for Bangladeshi labor rights advocacy — wage negotiation support, legal aid, and job-training resources for workers.",
        longDescription: "Built for শ্রমিক সেবা (Shromik Seba), an organization advocating for workers' wages, benefits, and working conditions. Connects members to legal representation, medical assistance, and job-training resources.",
        image: "/projects/shromikseba.png",
        tech: ["Android"],
        category: "Social Impact",
        impact: "1K+ Downloads",
        color: "from-emerald-900/40 to-green-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.braineer.shromikseba",
        },
    },
];

export const EXPERIENCES: Experience[] = [
    {
        company: "BuildWithInnovation",
        role: "Lead Mobile Engineer & Product Architect",
        period: "2022 - Present",
        description: "Leading mobile development and product strategy for multiple high-impact ventures.",
        achievements: [
            "Built and launched 3 production apps serving 60K+ combined users",
            "Designed offline-first architecture handling complex data sync",
            "Established mobile development standards and best practices",
        ],
    },
    {
        company: "Freelance & Contract Work",
        role: "Full-Stack Mobile Developer",
        period: "2020 - 2022",
        description: "Delivered custom mobile and web solutions for various clients.",
        achievements: [
            "Completed 15+ client projects with 100% satisfaction rate",
            "Specialized in Flutter, React Native, and Firebase implementations",
            "Provided technical consulting for startup MVPs",
        ],
    },
];
