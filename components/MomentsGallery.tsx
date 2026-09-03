"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import { staggerContainer, staggerItem, sectionViewport } from "@/lib/useAnimations";

interface MomentImage {
    src: string;
    caption: string;
}

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
    const [images, setImages] = useState<MomentImage[]>([]);

    useEffect(() => {
        fetch("/moments-manifest.json")
            .then((res) => (res.ok ? res.json() : []))
            .then((data: MomentImage[]) => setImages(data))
            .catch(() => setImages([]));
    }, []);

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
            {achievements.map((a) => {
                const Icon = a.icon;
                return (
                    <motion.div
                        key={a.title}
                        variants={staggerItem}
                        className="aspect-[4/5] rounded-md border border-border p-6 flex flex-col justify-between hover:border-foreground transition-colors"
                    >
                        <Icon className="w-6 h-6 text-primary" />
                        <div>
                            <h3 className="font-display text-lg tracking-tight mb-1 leading-tight">
                                {a.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-snug">{a.event}</p>
                            <p className="eyebrow mt-3">{a.year}</p>
                        </div>
                    </motion.div>
                );
            })}

            {images.map((img) => (
                <motion.div
                    key={img.src}
                    variants={staggerItem}
                    className="group relative aspect-[4/5] rounded-md overflow-hidden border border-border bg-neutral-900"
                >
                    <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        className="object-cover grayscale-[40%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
