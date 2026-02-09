"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import ExperienceTimeline from "@/components/ExperienceTimeline";

type ViewMode = "projects" | "experience";

export default function WorkPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("projects");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="min-h-screen">
            <div className="container-wide pt-32 pb-24">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        My Work
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Products I&apos;ve built and companies I&apos;ve helped scale.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-4 mb-12">
                    <button
                        onClick={() => setViewMode("projects")}
                        className={`px-6 py-3 rounded-full font-medium transition-all ${viewMode === "projects"
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setViewMode("experience")}
                        className={`px-6 py-3 rounded-full font-medium transition-all ${viewMode === "experience"
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Experience
                    </button>
                </div>

                {/* Content */}
                {viewMode === "projects" ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        {PROJECTS.map((project) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                ) : (
                    <ExperienceTimeline />
                )}
            </div>

            {/* Modal */}
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </div>
    );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="card text-left overflow-hidden group"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6">
                <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{project.description}</p>
            </div>
        </button>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto card p-8 space-y-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                    <X className="w-5 h-5" />
                </button>

                <div>
                    <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                    <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>

                <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string) => (
                                <span key={t} className="px-3 py-1.5 text-sm bg-muted rounded-full">
                                    {t}
                                </span>
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
                        <a
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-sm py-3 px-5"
                        >
                            <ExternalLink className="w-4 h-4" /> View App
                        </a>
                    )}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-sm py-3 px-5"
                        >
                            <Github className="w-4 h-4" /> Source
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
