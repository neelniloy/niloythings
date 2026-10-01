"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EarlyWork from "@/components/EarlyWork";
import { motion, AnimatePresence } from "framer-motion";
import {
    staggerContainer,
    staggerItem,
    backdropVariants,
    modalVariants,
} from "@/lib/useAnimations";

import ProjectCardMedia from "@/components/ProjectCardMedia";
import { getProjectAppMedia } from "@/lib/playstore";

type ViewMode = "projects" | "experience";

export default function WorkPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("projects");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="min-h-screen">
            <div className="container-wide pt-8 pb-16 md:pt-12">
                {/* Header */}
                <motion.div
                    className="max-w-3xl mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.p variants={staggerItem} className="eyebrow mb-4 text-primary">
                        Selected Work
                    </motion.p>
                    <motion.h1
                        variants={staggerItem}
                        className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
                    >
                        Products &amp; Architecture
                    </motion.h1>
                    <motion.p
                        variants={staggerItem}
                        className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
                    >
                        Zero-to-one systems, enterprise mobile engineering, and scaled independent products.
                    </motion.p>
                </motion.div>

                {/* Clean Control Bar */}
                <motion.div
                    className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-border/60"
                    initial="hidden"
                    animate="visible"
                    variants={staggerItem}
                >
                    {/* Segmented View Mode Toggle */}
                    <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border">
                        <button
                            onClick={() => setViewMode("projects")}
                            className={`px-5 py-2 text-xs font-mono tracking-wider uppercase rounded-md transition-all duration-200 ${
                                viewMode === "projects"
                                    ? "bg-background text-foreground shadow-sm font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setViewMode("experience")}
                            className={`px-5 py-2 text-xs font-mono tracking-wider uppercase rounded-md transition-all duration-200 ${
                                viewMode === "experience"
                                    ? "bg-background text-foreground shadow-sm font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Experience
                        </button>
                    </div>

                    {/* Developer Profiles */}
                    <div className="flex items-center gap-2.5 text-xs font-mono">
                        <a
                            href="https://play.google.com/store/apps/dev?id=6986460577323497498"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-border bg-card/60 hover:border-primary hover:text-primary transition-colors text-muted-foreground group"
                        >
                            <span>Play Console</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                        <a
                            href="https://apps.apple.com/us/developer/futuredesh-limited/id1811118227"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-border bg-card/60 hover:border-primary hover:text-primary transition-colors text-muted-foreground group"
                        >
                            <span>App Store</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                    </div>
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {viewMode === "projects" ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: 15, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="space-y-6 sm:space-y-8">
                                {PROJECTS.map((project, index) => (
                                    <ProjectBentoCard
                                        key={project.title}
                                        project={project}
                                        index={index}
                                        onClick={() => setSelectedProject(project)}
                                    />
                                ))}
                            </div>

                            <div className="pt-20 md:pt-28">
                                <EarlyWork />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.4 }}
                        >
                            <ExperienceTimeline />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

function ProjectBentoCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    return (
        <motion.div
            onClick={onClick}
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            }}
            className="group relative w-full text-left p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-border/80 bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
        >
            {/* Ambient Background Accent Glow on Hover */}
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl group-hover:bg-primary/[0.08] transition-all duration-700 pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-4">
                    {/* Unified Meta Header */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-primary/10 text-primary border border-primary/25 shrink-0">
                            {project.scope}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                            <span className="text-muted-foreground/50 font-medium">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-muted-foreground/30">/</span>
                            <span className="eyebrow text-muted-foreground font-medium">
                                {project.category}
                            </span>
                            {project.impact && (
                                <>
                                    <span className="text-muted-foreground/30">/</span>
                                    <span className="text-foreground/80 font-medium text-[11px]">
                                        {project.impact}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Title with integrated hover indicator */}
                    <div>
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-2.5">
                            <span>{project.title}</span>
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-xl">
                        {project.description}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted/60 text-muted-foreground border border-border/60"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Interactive Prompt Hint */}
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-mono text-muted-foreground/80 group-hover:text-primary transition-colors">
                        <span>Explore Architecture &amp; Case Study</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                </div>

                {/* Right Media Preview Column */}
                <div className="lg:col-span-5">
                    <div className="rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                        <ProjectCardMedia project={project} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const playMedia = getProjectAppMedia(project.links);
    const screenshots = playMedia?.screenshots || [];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
                className="fixed inset-0 bg-background/80 backdrop-blur-md"
                onClick={onClose}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            />

            <motion.div
                className="relative w-full max-w-2xl max-h-[90vh] bg-card border border-border rounded-xl shadow-2xl z-10 flex flex-col overflow-hidden"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Fixed Header */}
                <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-border/80 shrink-0 bg-card">
                    <div>
                        <p className="eyebrow text-primary mb-1">{project.category}</p>
                        <h2 className="font-display text-2xl md:text-3xl tracking-tight">{project.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors shrink-0 ml-4"
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Scrollable Content Body */}
                <div className="overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6 flex-1 [touch-action:pan-y] [-webkit-overflow-scrolling:touch]">
                    {/* 3-Column Context Strip */}
                    <div className="grid grid-cols-3 divide-x divide-border border border-border rounded-lg bg-muted/20 text-center py-3 px-1">
                        <div className="px-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">Scope</span>
                            <span className="text-xs sm:text-sm font-semibold block truncate text-primary">
                                {project.scope}
                            </span>
                        </div>
                        <div className="px-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">Category</span>
                            <span className="text-xs sm:text-sm font-medium text-foreground block truncate">{project.category}</span>
                        </div>
                        <div className="px-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">Scale</span>
                            <span className="text-xs sm:text-sm font-medium text-foreground block truncate">{project.impact}</span>
                        </div>
                    </div>

                    {/* Hero Preview or Screenshots Carousel */}
                    {screenshots.length > 0 ? (
                        <div className="space-y-3">
                            <p className="eyebrow">Screenshots ({screenshots.length})</p>
                            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin snap-x pt-1 [touch-action:pan-x]">
                                {screenshots.map((s, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-36 sm:w-44 aspect-[9/19.5] shrink-0 rounded-xl overflow-hidden snap-start bg-transparent drop-shadow-md border border-border/40"
                                    >
                                        <Image
                                            src={s}
                                            alt={`${project.title} screenshot ${idx + 1}`}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 144px, 176px"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <ProjectCardMedia project={project} />
                        </div>
                    )}

                    {/* Overview */}
                    <div className="space-y-2">
                        <p className="eyebrow">Overview</p>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{project.longDescription}</p>
                    </div>

                    {/* Key Architecture & Technical Highlights */}
                    {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                        <div className="space-y-3 pt-3 border-t border-border">
                            <p className="eyebrow text-foreground">Key Architecture &amp; Technical Highlights</p>
                            <ul className="space-y-2">
                                {project.architectureHighlights.map((highlight, idx) => (
                                    <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed bg-muted/20 p-2.5 rounded-md border border-border/40">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="space-y-3 pt-2 border-t border-border">
                        <p className="eyebrow">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t: string) => (
                                <span
                                    key={t}
                                    className="px-2.5 py-1 text-xs font-mono bg-muted/50 border border-border rounded text-muted-foreground"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fixed Footer with Clean Links */}
                <div className="p-4 sm:p-5 border-t border-border/80 bg-card/95 backdrop-blur-sm shrink-0 flex flex-wrap gap-3">
                    {project.links.playStore && (
                        <a
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                        >
                            <ExternalLink className="w-3.5 h-3.5" /> {project.links.appStore ? "Google Play" : "View App"}
                        </a>
                    )}
                    {project.links.appStore && (
                        <a
                            href={project.links.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-xs py-2 px-4 inline-flex items-center gap-1.5"
                        >
                            <ExternalLink className="w-3.5 h-3.5" /> App Store
                        </a>
                    )}
                    {project.links.website && (
                        <a
                            href={project.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                        >
                            <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                        </a>
                    )}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-xs py-2 px-4 inline-flex items-center gap-1.5"
                        >
                            <Github className="w-3.5 h-3.5" /> Source
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
