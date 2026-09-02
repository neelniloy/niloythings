"use client";

import { motion } from "framer-motion";

const stack = [
    "Flutter",
    "Kotlin",
    "Dart",
    "Android",
    "Firebase",
    "Java",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Go",
    "Cloudflare",
    "Framer Motion",
    "Git",
];

export default function TechStack() {
    return (
        <div className="w-full overflow-hidden py-6 border-y border-border">
            <div className="flex relative">
                <motion.div
                    className="flex gap-3 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {[...stack, ...stack].map((tech, i) => (
                        <div
                            key={i}
                            className="eyebrow flex items-center gap-2 px-5 py-2.5 rounded-sm border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300 cursor-default whitespace-nowrap"
                        >
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
