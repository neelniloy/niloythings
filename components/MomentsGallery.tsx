"use client";

import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import { staggerContainer, staggerItem, sectionViewport } from "@/lib/useAnimations";

const achievements = [
    {
        icon: Trophy,
        title: "1st Runner-Up",
        event: "DIU Intra University Hackathon",
        year: "2021",
    },
    {
        icon: Medal,
        title: "29th Place",
        event: "DIU Inter Section Programming Contest",
        year: "2019",
    },
];

export default function MomentsGallery() {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="border-t border-border grid sm:grid-cols-2"
        >
            {achievements.map((a, i) => {
                const Icon = a.icon;
                return (
                    <motion.div
                        key={a.title}
                        variants={staggerItem}
                        className={`flex items-start gap-5 p-8 md:p-10 border-b border-border ${i === 0 ? "sm:border-r" : ""}`}
                    >
                        <Icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                            <h3 className="font-display text-xl tracking-tight mb-1">{a.title}</h3>
                            <p className="text-muted-foreground">{a.event}</p>
                            <p className="eyebrow mt-2">{a.year}</p>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
