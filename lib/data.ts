export const RESUME_URL =
    "https://docs.google.com/document/d/1swG3GHAJ_kmNKgDexxtsPiEjrEmoUIX4IpnJJvtzqN8/edit?usp=sharing";

export type ProjectScope = "Enterprise" | "Independent";

export interface Project {
    title: string;
    role: string;
    scope: ProjectScope;
    description: string;
    longDescription: string;
    architectureHighlights?: string[];
    image: string;
    customImage?: string;
    tech: string[];
    category: string;
    impact: string;
    color: string;
    links: {
        playStore?: string;
        appStore?: string;
        github?: string;
        website?: string;
    };
}

export interface MicroApp {
    title: string;
    tagline: string;
    image: string;
    installs?: string;
    playStore?: string;
    link?: string;
    tech?: string[];
}

export const EARLY_APPS: MicroApp[] = [
    {
        title: "Shromik Seba",
        tagline: "Labor rights advocacy and legal aid community platform.",
        image: "/projects/shromikseba.png",
        installs: "1K+",
        tech: ["Android", "Kotlin"],
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.shromikseba",
    },
    {
        title: "SpeedBazar",
        tagline: "Online grocery & e-commerce shopping platform.",
        image: "/apps/speedbazar.webp",
        installs: "E-Commerce",
        tech: ["Android", "Java", "Firebase"],
        link: "https://apkpure.com/speedbazar/com.samulitfirstproject.speedbazar",
    },
    {
        title: "FoodCYC",
        tagline: "Social platform for restaurant and food reviews.",
        image: "/apps/foodcyc.png",
        installs: "Social App",
        tech: ["Android", "Java", "Firebase"],
        link: "https://drive.google.com/drive/folders/1JeYm7SM7eQrXxlWYI2ddCkgWCtdF9QIE?usp=sharing",
    },
    {
        title: "D Smart Recovery",
        tagline: "On-device file and media storage recovery utility.",
        image: "/apps/dsmartrecovery.webp",
        installs: "Utility",
        tech: ["Android", "Kotlin"],
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.dsmartrecovery",
    },
    {
        title: "Billi Weather",
        tagline: "Delightful weather assistant with interactive animations.",
        image: "/apps/billiweather.webp",
        installs: "Weather",
        tech: ["Flutter", "OpenWeather"],
        playStore: "https://play.google.com/store/apps/details?id=com.braineer.weatherbilli",
    },
    {
        title: "Ledgify",
        tagline: "On-device bookkeeping ledger and PDF generator.",
        image: "/apps/ledgify.webp",
        installs: "Finance",
        tech: ["Flutter", "Hive"],
        playStore: "https://play.google.com/store/apps/details?id=com.niloythings.ledgify",
    },
];

export const PROJECTS: Project[] = [
    {
        title: "Futuredesh App",
        role: "Lead Software Engineer",
        scope: "Enterprise",
        description: "Architected 0-to-1 offline-first contract-farming ecosystem with resilient local database sync for rural agricultural communities.",
        longDescription: "Designed, architected, and shipped the core Flutter mobile platform from scratch for Futuredesh Ltd. Engineered a resilient offline-first architecture with local SQLite/Hive caching, bi-directional sync, and optimistic UI updates for rural users with intermittent 2G/3G connectivity. Promoted to Lead Software Engineer to head technical strategy across mobile, backend, and team execution.",
        architectureHighlights: [
            "Designed resilient offline-first sync engine handling intermittent connectivity with conflict-free caching.",
            "Engineered contract-farming workflows, crop telemetry tracking, and digital disbursement monitoring.",
            "Leading technical architecture, code reviews, release management, and mentoring mobile & backend engineers.",
        ],
        image: "/projects/futuredesh.png",
        tech: ["Flutter", "Dart", "Firebase", "Node.js", "SQLite/Hive"],
        category: "AgriTech & Fintech",
        impact: "30K+ Users",
        color: "from-red-900/40 to-orange-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.futuredesh.contract_farming",
            appStore: "https://apps.apple.com/us/app/futuredesh/id6745175628",
        },
    },
    {
        title: "Bdjobs",
        role: "Core Android Developer",
        scope: "Enterprise",
        description: "Contributed to Bangladesh's #1 career portal app serving millions of job seekers and 10,000+ employers across the country.",
        longDescription: "Contributed to the flagship Android application for Bdjobs.com Ltd, Bangladesh's largest career management platform. Collaborated within an enterprise engineering team to ship new features across job discovery, application tracking, and employer messaging while modernizing legacy codebase modules with Kotlin and clean architecture.",
        architectureHighlights: [
            "Shipped core user-facing features across resume tracking, job discovery filters, and push notification flows for 5M+ installs.",
            "Refactored legacy Java modules into modern Kotlin with Android Architecture Components (MVVM, Coroutines, Flow).",
            "Collaborated with cross-functional product managers, QA teams, and backend engineers in scheduled enterprise release trains.",
        ],
        image: "/projects/bdjobs.png",
        tech: ["Android", "Kotlin", "Java", "MVVM", "Coroutines", "REST APIs"],
        category: "Career Platform",
        impact: "5M+ Downloads",
        color: "from-blue-900/40 to-indigo-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.bdjobs.app",
        },
    },
    {
        title: "Delivery Tiger",
        role: "Android Developer",
        scope: "Enterprise",
        description: "Nationwide parcel booking and courier logistics application with real-time tracking and Cash on Delivery (COD) across 64 districts.",
        longDescription: "Developed and maintained features for Delivery Tiger, Bdjobs.com Ltd's nationwide logistics platform. Built parcel tracking interfaces, automated cash-on-delivery calculations, and rider dispatch communication across all 64 districts and 492 sub-districts in Bangladesh.",
        architectureHighlights: [
            "Engineered automated COD accounting and parcel status synchronization across 64 districts.",
            "Optimized background location tracking and map rendering for logistics riders, reducing battery usage.",
            "Ensured sub-second barcode dispatch scanning and real-time status updates at distribution hubs.",
        ],
        image: "/projects/deliverytiger.png",
        tech: ["Android", "Kotlin", "Google Maps SDK", "REST APIs"],
        category: "Logistics",
        impact: "Nationwide Scope",
        color: "from-amber-900/40 to-orange-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.bdj.deliverytiger.app",
        },
    },
    {
        title: "KitHub: Skins for DLS",
        role: "Independent Developer",
        scope: "Independent",
        description: "Searchable kit, skin, and graphic browser for Dream League Soccer with one-tap game import and Cloudflare-backed asset CDN.",
        longDescription: "Conceived, engineered, and independently launched KitHub, reaching over 100K+ organic global downloads on Google Play with a 4.4+ rating. Designed an efficient Cloudflare caching architecture to deliver game assets to hundreds of thousands of active players with minimal latency.",
        architectureHighlights: [
            "Scaled independently from 0 to 100K+ organic downloads with high user retention and 4.4★ rating.",
            "Built Cloudflare Edge CDN caching to stream thousands of high-resolution kits with sub-second asset delivery.",
            "Implemented instant in-game clipboard deep-linking and interactive trivia module.",
        ],
        image: "/projects/kithub.png",
        tech: ["Android", "Kotlin", "Cloudflare CDN", "Firebase", "Room DB"],
        category: "Gaming Utility",
        impact: "100K+ Downloads",
        color: "from-pink-900/40 to-rose-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.braineer.dlskits",
        },
    },
    {
        title: "LSTV Prime",
        role: "Independent Developer",
        scope: "Independent",
        description: "Cross-platform IPTV engine running natively on Android, Android TV/Fire TV, Windows desktop, and the web with auto-server failover.",
        longDescription: "A high-performance cross-platform IPTV suite: Kotlin-native Android and Android TV/Fire TV apps (with D-Pad remote navigation), a Flutter-built Windows desktop app, and a companion Next.js web application. Includes hardware-accelerated playback and automated server health probing.",
        architectureHighlights: [
            "Designed unified streaming playback supporting ExoPlayer (Android), LibVLC (Windows), and HLS.js (Web).",
            "Implemented dynamic proxy server failover to ensure 99.9% playback availability during live sports events.",
            "Built seamless 10-foot UI optimized for Android TV remote D-Pad navigation.",
        ],
        image: "/projects/lstvprime.png",
        tech: ["Kotlin", "ExoPlayer", "Flutter", "Next.js", "HLS"],
        category: "Streaming Media",
        impact: "Multi-Platform Suite",
        color: "from-red-900/40 to-neutral-900/40",
        links: {
            website: "https://lstvprime.pages.dev/",
            github: "https://github.com/neelniloy/lstv_app",
        },
    },
    {
        title: "LAN Streamer",
        role: "Independent Developer",
        scope: "Independent",
        description: "Network discovery tool that automatically scans local ISP/BDIX subnets for zero-data media and FTP streaming servers.",
        longDescription: "Engineered an Android network utility that scans Wi-Fi and ISP subnets to identify active BDIX FTP servers in Bangladesh, allowing users to discover and stream high-bitrate media without consuming mobile data.",
        architectureHighlights: [
            "Implemented multi-threaded local IP subnet probing algorithm with automatic protocol detection.",
            "Engineered integrated browser with hardware video playback directly connected to internal network links.",
            "Solved a localized infrastructure problem in Bangladesh, achieving 10K+ organic downloads.",
        ],
        image: "/projects/lanstreamer.png",
        tech: ["Android", "Kotlin", "Network Sockets"],
        category: "Networking",
        impact: "10K+ Downloads",
        color: "from-cyan-900/40 to-teal-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.niloythings.lanstreamer",
        },
    },
    {
        title: "Project Scan",
        role: "Independent Developer",
        scope: "Independent",
        description: "Extract image to text, scan barcodes, and generate dynamic QR codes with offline-first OCR powered by Google ML Kit.",
        longDescription: "An all-in-one scanning tool powered by Google ML Kit and ZXing for optical character recognition (OCR), document digitization, and barcode/QR code generation with instant export.",
        architectureHighlights: [
            "Zero-latency on-device OCR pipeline utilizing Google ML Kit with zero cloud API dependency.",
            "Integrated high-speed 1D/2D barcode generation and vector image export.",
        ],
        image: "/apps/projectscan.webp",
        tech: ["Android", "Kotlin", "Google ML Kit", "ZXing"],
        category: "Productivity & ML",
        impact: "On-Device ML Tool",
        color: "from-emerald-900/40 to-teal-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.braineer.projectscan",
        },
    },
];
