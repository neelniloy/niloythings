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
    };
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
}

export const PROJECTS: Project[] = [
    {
        title: "Futuredesh Ecosystem",
        description: "Mobile platform for diaspora communities with offline-first architecture supporting 50K+ users.",
        longDescription: "Built a complete Flutter-based ecosystem with Firebase backend, implementing advanced offline sync, real-time updates, and native performance optimizations.",
        image: "/projects/futuredesh.png",
        tech: ["Flutter", "Firebase", "Node.js", "Cloud Functions"],
        category: "Mobile",
        impact: "50K+ Users",
        color: "from-red-900/40 to-orange-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.futuredesh",
        },
    },
    {
        title: "Kormi Workforce Platform",
        description: "Enterprise workforce management with real-time job matching and analytics dashboard.",
        longDescription: "Developed a dual-platform solution connecting job seekers with employers through intelligent matching algorithms.",
        image: "/projects/kormi.png",
        tech: ["Flutter", "PostgreSQL", "REST API"],
        category: "Enterprise",
        impact: "10K+ Placements",
        color: "from-blue-900/40 to-cyan-900/40",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=com.kormi",
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
