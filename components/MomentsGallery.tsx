"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Award, BookOpen } from "lucide-react";
import {
    staggerContainer,
    staggerItem,
    sectionViewport,
} from "@/lib/useAnimations";

import initialImages from "@/public/moments-manifest.json";

interface MomentImage {
    src: string;
    width: number;
    height: number;
    caption?: string;
}

const ACHIEVEMENTS = [
    {
        icon: Trophy,
        title: "1st Runner-Up",
        event: "DIU Intra University Hackathon",
        year: "2021",
    },
    {
        icon: Award,
        title: "29th Place",
        event: "DIU Inter Section Programming Contest",
        year: "2019",
    },
    {
        icon: BookOpen,
        title: "Research Certification",
        event: "ARCED Foundation · UCSD & CU Denver Initiative",
        year: "2022",
    },
];

export default function MomentsGallery() {
    const [images] = useState<MomentImage[]>(initialImages as MomentImage[]);

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-10">
            {/* Header & Achievements */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={staggerContainer}
                className="space-y-6"
            >
                <div>
                    <motion.p variants={staggerItem} className="eyebrow mb-3 text-primary">
                        05 — Recognition &amp; Archive
                    </motion.p>
                    <motion.h2
                        variants={staggerItem}
                        className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight"
                    >
                        Achievements &amp; <span className="italic">Moments.</span>
                    </motion.h2>
                </div>

                {/* Minimal Authentic Achievements (Adaptive 1-col mobile, 2-col tablet with centered 3rd item, 3-col desktop) */}
                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1"
                >
                    {ACHIEVEMENTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.event}
                                variants={staggerItem}
                                className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-md border border-border bg-card/60 transition-colors hover:border-primary/30 min-w-0"
                            >
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-muted border border-border flex items-center justify-center shrink-0 text-primary mt-0.5">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline justify-between gap-2 flex-wrap sm:flex-nowrap">
                                        <span className="font-medium text-foreground text-sm sm:text-base tracking-tight">
                                            {item.title}
                                        </span>
                                        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                                            · {item.year}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-snug mt-1 whitespace-normal break-words">
                                        {item.event}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

            {/* Natural Uncropped Masonry Gallery */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={staggerContainer}
                className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 [column-fill:_balance]"
            >
                {images.map((img) => (
                    <motion.div
                        key={img.src}
                        variants={staggerItem}
                        className="break-inside-avoid mb-3 sm:mb-4 overflow-hidden rounded-md border border-border bg-muted/30"
                    >
                        <Image
                            src={img.src}
                            alt="Moment photograph"
                            width={img.width || 1200}
                            height={img.height || 800}
                            className="w-full h-auto object-contain block transition-transform duration-500 hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
