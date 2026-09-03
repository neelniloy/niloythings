"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import { staggerContainer, staggerItem, sectionViewport } from "@/lib/useAnimations";

interface MomentImage {
    src: string;
    caption: string;
    width: number;
    height: number;
}

function hash(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

const SHAPES = [
    "col-span-8 sm:col-span-6 row-span-3",
    "col-span-6 sm:col-span-4 row-span-2",
    "col-span-6 sm:col-span-5 row-span-3",
    "col-span-6 sm:col-span-4 row-span-2",
    "col-span-6 sm:col-span-3 row-span-2",
];

type Cell =
    | { kind: "headline" }
    | { kind: "accent"; tone: "ink" | "red" }
    | ({ kind: "photo" } & MomentImage & { shape: string });

export default function MomentsGallery() {
    const [images, setImages] = useState<MomentImage[]>([]);

    useEffect(() => {
        fetch("/moments-manifest.json")
            .then((res) => (res.ok ? res.json() : []))
            .then((data: MomentImage[]) => setImages(data))
            .catch(() => setImages([]));
    }, []);

    const cells: Cell[] = useMemo(() => {
        const photos: Cell[] = images.map((img) => ({
            kind: "photo",
            ...img,
            shape: SHAPES[hash(img.src) % SHAPES.length],
        }));

        const out: Cell[] = [{ kind: "headline" }];
        photos.forEach((p, i) => {
            out.push(p);
            if (i === 3) out.push({ kind: "accent", tone: "red" });
            if (i === 8) out.push({ kind: "accent", tone: "ink" });
        });
        return out;
    }, [images]);

    if (images.length === 0) return null;

    return (
        <motion.div
            className="border border-border p-6 md:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
        >
            {/* Header mark */}
            <motion.div variants={staggerItem} className="mb-8 md:mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <Diamond className="w-4 h-4 text-primary" />
                    <p className="eyebrow text-primary">05 — Recognition</p>
                </div>
                <div className="h-px w-24 bg-border mb-4" />
                <p className="text-sm text-muted-foreground max-w-md">
                    1st Runner-Up, DIU Intra University Hackathon 2021 · 29th Place, DIU Inter
                    Section Programming Contest 2019
                </p>
            </motion.div>

            {/* Cluster */}
            <div className="grid grid-cols-12 auto-rows-[48px] sm:auto-rows-[64px] md:auto-rows-[84px] gap-3 md:gap-5 [grid-auto-flow:dense]">
                {cells.map((cell, i) => {
                    if (cell.kind === "headline") {
                        return (
                            <motion.div
                                key="headline"
                                variants={staggerItem}
                                className="col-span-12 sm:col-span-7 md:col-span-6 row-span-2 flex flex-col justify-center"
                            >
                                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.05]">
                                    Achievements<br />&amp; <span className="italic">Moments.</span>
                                </h2>
                            </motion.div>
                        );
                    }
                    if (cell.kind === "accent") {
                        return (
                            <motion.div
                                key={`accent-${i}`}
                                variants={staggerItem}
                                className={`col-span-4 sm:col-span-3 row-span-2 ${
                                    cell.tone === "red" ? "bg-primary" : "bg-foreground"
                                }`}
                            />
                        );
                    }
                    return (
                        <motion.a
                            key={cell.src}
                            href={cell.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={staggerItem}
                            className={`group relative block overflow-hidden bg-neutral-900 ${cell.shape}`}
                        >
                            <Image
                                src={cell.src}
                                alt={cell.caption}
                                fill
                                draggable={false}
                                className="object-cover grayscale-[35%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.04] pointer-events-none"
                                sizes="(max-width: 768px) 60vw, 40vw"
                            />
                        </motion.a>
                    );
                })}
            </div>

            {/* Footer tag */}
            <motion.div
                variants={staggerItem}
                className="mt-8 md:mt-10 pt-6 border-t border-border flex items-center justify-between"
            >
                <p className="font-display italic text-sm">
                    Niloy<span className="text-primary not-italic">.</span>
                </p>
                <p className="eyebrow text-muted-foreground">{String(images.length).padStart(2, "0")} Moments</p>
            </motion.div>
        </motion.div>
    );
}
