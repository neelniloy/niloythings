"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Award, BookOpen } from "lucide-react";
import {
    staggerContainer,
    staggerItem,
    sectionViewport,
} from "@/lib/useAnimations";

interface MomentImage {
    src: string;
    width: number;
    height: number;
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
    const [images, setImages] = useState<MomentImage[]>([]);

    useEffect(() => {
        fetch("/moments-manifest.json")
            .then((res) => (res.ok ? res.json() : []))
            .then((data: MomentImage[]) => setImages(data))
            .catch(() => setImages([]));
    }, []);

    if (images.length === 0) return null;

    return (
        <section className="space-y-10">
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

                {/* Minimal Authentic Achievements (3-column grid) */}
                <motion.div
                    variants={staggerContainer}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {ACHIEVEMENTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.event}
                                variants={staggerItem}
                                className="flex items-center gap-4 p-4 sm:p-5 rounded-md border border-border bg-card/60"
                            >
                                <div className="w-10 h-10 rounded-sm bg-muted border border-border flex items-center justify-center shrink-0 text-primary">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-foreground text-base tracking-tight">
                                            {item.title}
                                        </span>
                                        <span className="text-xs font-mono text-muted-foreground">
                                            · {item.year}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{item.event}</p>
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
                className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
                {images.map((img) => (
                    <motion.div
                        key={img.src}
                        variants={staggerItem}
                        className="break-inside-avoid overflow-hidden rounded-md border border-border bg-muted/30"
                    >
                        <Image
                            src={img.src}
                            alt="Moment photograph"
                            width={img.width || 1200}
                            height={img.height || 800}
                            className="w-full h-auto object-contain block transition-transform duration-500 hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
