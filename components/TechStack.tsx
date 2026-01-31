"use client";

import { motion } from "framer-motion";

const stack = [
    "Flutter",
    "React",
    "Next.js",
    "TypeScript",
    "Kotlin",
    "Android",
    "Firebase",
    "Node.js",
    "Tailwind",
    "Framer Motion",
    "Dart",
    "GraphQL",
    "PostgreSQL",
    "Docker",
];

export default function TechStack() {
    return (
        <div className="w-full overflow-hidden py-8 border-y border-white/5 bg-white/2">
            <div className="flex relative">
                <motion.div
                    className="flex gap-12 whitespace-nowrap px-12"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {[...stack, ...stack].map((tech, i) => (
                        <span
                            key={i}
                            className="text-2xl font-bold text-muted/30 uppercase tracking-widest hover:text-white transition-colors cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
