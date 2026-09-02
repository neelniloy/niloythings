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
    "Go",
    "Tailwind",
    "Framer Motion",
    "Dart",
    "GraphQL",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Git",
];

export default function TechStack() {
    return (
        <div className="w-full overflow-hidden py-8 border-y border-border bg-muted/5">
            <div className="flex relative">
                <motion.div
                    className="flex gap-8 px-4"
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
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-border/50 bg-background/5 text-muted-foreground font-bold uppercase tracking-wider text-sm hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default whitespace-nowrap shadow-sm hover:shadow-lg hover:-translate-y-1"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
