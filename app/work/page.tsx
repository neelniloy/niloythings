"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { motion, AnimatePresence } from "framer-motion";
import {
    fadeUp,
    staggerContainer,
    staggerItem,
    scaleIn,
    backdropVariants,
    modalVariants,
    sectionViewport,
} from "@/lib/useAnimations";

type ViewMode = "projects" | "experience";

export default function WorkPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("projects");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="min-h-screen">
            <div className="container-wide pt-12 pb-24">
                {/* Header */}
                <motion.div
                    className="max-w-3xl mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.h1
                        variants={staggerItem}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                    >
                        My Work
                    </motion.h1>
                    <motion.p
                        variants={staggerItem}
                        className="text-xl text-muted-foreground"
                    >
                        Products I&apos;ve built and companies I&apos;ve helped scale.
                    </motion.p>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    className="flex gap-4 mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0.2}
                >
                    <button
                        onClick={() => setViewMode("projects")}
                        className={`relative px-6 py-3 rounded-full font-medium transition-colors ${viewMode === "projects"
                                ? "text-background"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {viewMode === "projects" && (
                            <motion.div
                                className="absolute inset-0 bg-foreground rounded-full"
                                layoutId="tab-indicator"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">Projects</span>
                    </button>
                    <button
                        onClick={() => setViewMode("experience")}
                        className={`relative px-6 py-3 rounded-full font-medium transition-colors ${viewMode === "experience"
                                ? "text-background"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {viewMode === "experience" && (
                            <motion.div
                                className="absolute inset-0 bg-foreground rounded-full"
                                layoutId="tab-indicator"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">Experience</span>
                    </button>
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {viewMode === "projects" ? (
                        <motion.div
                            key="projects"
                            className="grid md:grid-cols-2 gap-8"
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                            variants={staggerContainer}
                        >
                            {PROJECTS.map((project, index) => (
                                <ProjectCard
                                    key={project.title}
                                    project={project}
                                    index={index}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
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

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    return (
        <motion.button
            onClick={onClick}
            className="card text-left overflow-hidden group"
            variants={scaleIn}
            custom={index * 0.05}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-6">
                <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{project.description}</p>
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
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto card p-8 space-y-6"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    <X className="w-5 h-5" />
                </motion.button>

                <div>
                    <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                    <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>

                <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string, i: number) => (
                                <motion.span
                                    key={t}
                                    className="px-3 py-1.5 text-sm bg-muted rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {project.impact && (
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Impact</p>
                            <p className="font-medium">{project.impact}</p>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-4">
                    {project.links.playStore && (
                        <motion.a
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-sm py-3 px-5"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ExternalLink className="w-4 h-4" /> View App
                        </motion.a>
                    )}
                    {project.links.github && (
                        <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-sm py-3 px-5"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="w-4 h-4" /> Source
                        </motion.a>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
