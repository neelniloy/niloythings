"use client";

import { useState } from "react";
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

type ViewMode = "projects" | "experience";

export default function WorkPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("projects");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="min-h-screen">
            <div className="container-wide pt-8 pb-16 md:pt-10">
                {/* Header */}
                <motion.div
                    className="max-w-3xl mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.p variants={staggerItem} className="eyebrow mb-6 text-primary">
                        Selected Work
                    </motion.p>
                    <motion.h1
                        variants={staggerItem}
                        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4"
                    >
                        Products &amp; Companies
                    </motion.h1>
                    <motion.p
                        variants={staggerItem}
                        className="text-lg md:text-xl text-muted-foreground"
                    >
                        Products I&apos;ve built and companies I&apos;ve helped scale.
                    </motion.p>
                </motion.div>

                {/* Tab Switcher & Play Console Link */}
                <motion.div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerItem}
                >
                    <div className="inline-flex p-1 rounded-lg bg-muted/50 border border-border/80">
                        <button
                            onClick={() => setViewMode("projects")}
                            className={`relative px-5 py-2 text-xs font-mono tracking-wider uppercase rounded-md transition-all duration-200 ${
                                viewMode === "projects"
                                    ? "bg-background text-foreground shadow-sm font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setViewMode("experience")}
                            className={`relative px-5 py-2 text-xs font-mono tracking-wider uppercase rounded-md transition-all duration-200 ${
                                viewMode === "experience"
                                    ? "bg-background text-foreground shadow-sm font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Experience
                        </button>
                    </div>

                    <a
                        href="https://play.google.com/store/apps/dev?id=6986460577323497498"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 eyebrow px-4 py-2 rounded-md border border-border bg-card hover:border-primary hover:text-primary transition-colors text-xs font-mono self-start sm:self-auto group"
                    >
                        <svg className="w-3.5 h-3.5 fill-current text-primary" viewBox="0 0 24 24">
                            <path d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.61-1.638V3.452c0-.624.225-1.2.609-1.638zm11.237 11.24l2.583-2.583-11.58-6.68 8.997 9.263zm2.583-2.583l3.655 2.11c1.298.75 1.298 1.97 0 2.72l-3.655 2.11-2.228-2.228 2.228-2.712zm-2.583 2.583l-8.997 9.263 11.58-6.68-2.583-2.583z"/>
                        </svg>
                        <span>Play Console Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {viewMode === "projects" ? (
                        <motion.div
                            key="projects"
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                            variants={staggerContainer}
                        >
                            <div className="border-t border-border">
                                {PROJECTS.map((project, index) => (
                                    <ProjectRow
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.5 }}
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

function ProjectRow({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    return (
        <motion.button
            onClick={onClick}
            className="group w-full text-left border-b border-border py-10 grid md:grid-cols-12 gap-6 md:gap-8 items-center"
            variants={staggerItem}
        >
            <span className="num text-sm text-muted-foreground md:col-span-1">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="md:col-span-6 space-y-3">
                <p className="eyebrow text-primary">{project.category}</p>
                <h3 className="font-display text-2xl md:text-3xl tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-muted-foreground max-w-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    {project.tech.map((t) => (
                        <span key={t} className="text-xs text-muted-foreground font-mono">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="md:col-span-4 relative aspect-[16/10] rounded-md overflow-hidden border border-border">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </div>

            <div className="md:col-span-1 flex md:justify-end">
                <ArrowUpRight className="w-6 h-6 text-muted-foreground -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary transition-all" />
            </div>
        </motion.button>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                className="absolute inset-0 bg-background/95 backdrop-blur-sm"
                onClick={onClose}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            />

            <motion.div
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-border rounded-md bg-card p-8 space-y-6"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div>
                    <p className="eyebrow text-primary mb-3">{project.category}</p>
                    <h2 className="font-display text-2xl md:text-3xl tracking-tight">{project.title}</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>

                <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                        <p className="eyebrow mb-3">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string) => (
                                <span
                                    key={t}
                                    className="px-3 py-1.5 text-xs font-mono border border-border rounded-sm text-muted-foreground"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {project.impact && (
                        <div>
                            <p className="eyebrow mb-2">Impact</p>
                            <p className="font-display text-xl tracking-tight">{project.impact}</p>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-4">
                    {project.links.playStore && (
                        <a
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-3 px-5"
                        >
                            <ExternalLink className="w-4 h-4" /> {project.links.appStore ? "Google Play" : "View App"}
                        </a>
                    )}
                    {project.links.appStore && (
                        <a
                            href={project.links.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-xs py-3 px-5"
                        >
                            <ExternalLink className="w-4 h-4" /> App Store
                        </a>
                    )}
                    {project.links.website && (
                        <a
                            href={project.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-3 px-5"
                        >
                            <ExternalLink className="w-4 h-4" /> Visit Site
                        </a>
                    )}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-xs py-3 px-5"
                        >
                            <Github className="w-4 h-4" /> Source
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
