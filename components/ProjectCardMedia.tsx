"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/data";
import { getProjectAppMedia } from "@/lib/playstore";

interface ProjectCardMediaProps {
    project: Project;
    className?: string;
}

export default function ProjectCardMedia({ project, className = "" }: ProjectCardMediaProps) {
    const playMedia = getProjectAppMedia(project.links);
    const screenshots = playMedia?.screenshots || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Priority 1: Explicit customImage (e.g. Futuredesh 3D mockup)
    if (project.customImage) {
        return (
            <div className={`relative aspect-[16/10] rounded-md overflow-hidden border border-border bg-neutral-950 flex items-center justify-center ${className}`}>
                <Image
                    src={project.customImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
        );
    }

    // Priority 2: Google Play Store Interactive Device Carousel
    if (screenshots.length > 0) {
        const handlePrev = (e: React.MouseEvent) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
        };

        const handleNext = (e: React.MouseEvent) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
        };

        const prevIndex = (currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1);
        const nextIndex = (currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1);

        return (
            <div className={`relative aspect-[16/10] rounded-md overflow-hidden border border-border bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-2.5 sm:p-3 select-none group/carousel ${className}`}>
                {/* Ambient background glow from current screenshot */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-125 transition-all duration-700 pointer-events-none"
                    style={{ backgroundImage: `url(${screenshots[currentIndex]})` }}
                />

                {/* 3D Multi-Device Stage */}
                <div className="relative w-full h-full flex items-center justify-center gap-1.5 sm:gap-2.5 py-1">
                    {/* Left Flanking Phone (Previous screen) */}
                    {screenshots.length >= 2 && (
                        <div
                            onClick={handlePrev}
                            className="relative w-[28%] sm:w-[26%] aspect-[9/19] rounded-[13px] sm:rounded-[16px] p-[2.5px] bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-900 border border-neutral-600/70 shadow-xl opacity-90 hover:opacity-100 -rotate-6 -translate-y-1 hover:-translate-y-2 hover:-rotate-8 transition-all duration-300 cursor-pointer shrink-0 z-0"
                            title="Previous screenshot"
                        >
                            <div className="relative w-full h-full rounded-[10px] sm:rounded-[13px] overflow-hidden bg-black shadow-inner">
                                <Image
                                    src={screenshots[prevIndex]}
                                    alt={`${project.title} screenshot ${prevIndex + 1}`}
                                    fill
                                    className="object-cover transition-all duration-300"
                                    sizes="140px"
                                />
                            </div>
                        </div>
                    )}

                    {/* Center Featured Phone (Current Active screen) */}
                    <div className="relative w-[44%] sm:w-[40%] aspect-[9/19] rounded-[15px] sm:rounded-[18px] p-[3px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 border border-neutral-500/80 shadow-[0_20px_45px_rgba(0,0,0,0.95)] z-10 scale-105 group-hover/carousel:scale-110 transition-all duration-500 shrink-0">
                        <div className="relative w-full h-full rounded-[12px] sm:rounded-[15px] overflow-hidden bg-black shadow-inner">
                            {/* Dynamic Island Pill */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-11 h-2 sm:h-2.5 bg-black rounded-full z-20 border border-white/20 shadow-sm" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.25 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={screenshots[currentIndex]}
                                        alt={`${project.title} screenshot ${currentIndex + 1}`}
                                        fill
                                        priority={currentIndex === 0}
                                        className="object-cover transition-all duration-300"
                                        sizes="220px"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Flanking Phone (Next screen) */}
                    {screenshots.length >= 3 && (
                        <div
                            onClick={handleNext}
                            className="relative w-[28%] sm:w-[26%] aspect-[9/19] rounded-[13px] sm:rounded-[16px] p-[2.5px] bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-900 border border-neutral-600/70 shadow-xl opacity-90 hover:opacity-100 rotate-6 translate-y-1 hover:translate-y-0 hover:rotate-8 transition-all duration-300 cursor-pointer shrink-0 z-0"
                            title="Next screenshot"
                        >
                            <div className="relative w-full h-full rounded-[10px] sm:rounded-[13px] overflow-hidden bg-black shadow-inner">
                                <Image
                                    src={screenshots[nextIndex]}
                                    alt={`${project.title} screenshot ${nextIndex + 1}`}
                                    fill
                                    className="object-cover transition-all duration-300"
                                    sizes="140px"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Carousel Controls (Show on hover) */}
                {screenshots.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-primary transition-all duration-300 z-20"
                            aria-label="Previous screenshot"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-primary transition-all duration-300 z-20"
                            aria-label="Next screenshot"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 z-20">
                            {screenshots.slice(0, 6).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(idx);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        currentIndex === idx ? "w-4 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/70"
                                    }`}
                                    aria-label={`Go to screenshot ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Priority 3: Fallback Project Media (Never stretched, styled card)
    const fallbackSrc = playMedia?.icon || project.image;
    const isIcon = fallbackSrc.includes("icon") || fallbackSrc.includes("logo");

    return (
        <div className={`relative aspect-[16/10] rounded-md overflow-hidden border border-border bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center p-6 ${className}`}>
            {isIcon ? (
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/15 bg-neutral-800 shadow-2xl relative">
                        <Image
                            src={fallbackSrc}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-medium">
                        {project.title}
                    </span>
                </div>
            ) : (
                <Image
                    src={fallbackSrc}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            )}
        </div>
    );
}
