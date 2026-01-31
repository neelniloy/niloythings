"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, Smartphone, Calendar, X, ExternalLink } from "lucide-react";

type ViewMode = "projects" | "experience";

interface Project {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tech: string[];
    category: string;
    impact: string;
    color: string;
    links: {
        playStore?: string;
        github?: string;
    };
}

export default function WorkPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("projects");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen"
        >
            <div className="container-constrained py-12 md:py-20 space-y-12">
                {/* Header */}
                <div className="max-w-3xl space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">Portfolio</h1>
                    <p className="text-muted text-lg md:text-xl leading-relaxed">
                        A comprehensive view of my professional journey—from products I've built to companies I've scaled.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-6 border-b border-white/10">
                    <button
                        onClick={() => setViewMode("projects")}
                        className={`relative pb-4 px-2 text-sm font-semibold uppercase tracking-wider transition-colors ${viewMode === "projects" ? "text-white" : "text-muted hover:text-white"
                            }`}
                    >
                        Projects
                        {viewMode === "projects" && (
                            <motion.div
                                layoutId="workTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setViewMode("experience")}
                        className={`relative pb-4 px-2 text-sm font-semibold uppercase tracking-wider transition-colors ${viewMode === "experience" ? "text-white" : "text-muted hover:text-white"
                            }`}
                    >
                        Experience
                        {viewMode === "experience" && (
                            <motion.div
                                layoutId="workTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                        )}
                    </button>
                </div>

                {/* Content */}
                {viewMode === "projects" ? (
                    <ProjectsView key="projects" setSelectedProject={setSelectedProject} />
                ) : (
                    <ExperienceView key="experience" />
                )}
            </div>

            {/* Modal */}
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </motion.div>
    );
}

function ProjectsView({ setSelectedProject }: { setSelectedProject: (project: Project) => void }) {
    const projects: Project[] = [
        {
            title: "Futuredesh Ecosystem",
            description: "Mobile platform for diaspora communities with offline-first architecture supporting 50K+ users.",
            longDescription: "Built a complete Flutter-based ecosystem with Firebase backend, implementing advanced offline sync, real-time updates, and native performance optimizations.",
            image: "/projects/futuredesh.png",
            tech: ["Flutter", "Firebase", "Node.js", "Cloud Functions"],
            category: "Mobile",
            impact: "50K+ Users",
            color: "from-red-900/40 to-orange-900/40",
            links: {
                playStore: "https://play.google.com/store/apps/details?id=com.futuredesh",
            },
        },
        {
            title: "Kormi Workforce Platform",
            description: "Enterprise workforce management with real-time job matching and analytics dashboard.",
            longDescription: "Developed a dual-platform solution connecting job seekers with employers through intelligent matching algorithms.",
            image: "/projects/kormi.png",
            tech: ["Flutter", "PostgreSQL", "REST API"],
            category: "Enterprise",
            impact: "10K+ Placements",
            color: "from-blue-900/40 to-cyan-900/40",
            links: {
                playStore: "https://play.google.com/store/apps/details?id=com.kormi",
            },
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
                <ProjectCard key={project.title} project={project} onClick={() => setSelectedProject(project)} />
            ))}
        </div>
    );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer text-left space-y-4 rounded-2xl p-1 bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image - Fixed aspect ratio */}
            <div className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br ${project.color}`}>
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="px-3 pb-2 space-y-3">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed line-clamp-2">
                        {project.description}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.slice(0, 3).map((t: string) => (
                        <span key={t} className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 bg-white/5 rounded-full text-white/80 border border-white/10">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ExperienceView() {
    const experiences = [
        {
            company: "BuildWithInnovation",
            role: "Lead Mobile Engineer & Product Architect",
            period: "2022 - Present",
            description: "Leading mobile development and product strategy for multiple high-impact ventures.",
            achievements: [
                "Built and launched 3 production apps serving 60K+ combined users",
                "Designed offline-first architecture handling complex data sync",
                "Established mobile development standards and best practices",
            ],
        },
        {
            company: "Freelance & Contract Work",
            role: "Full-Stack Mobile Developer",
            period: "2020 - 2022",
            description: "Delivered custom mobile and web solutions for various clients.",
            achievements: [
                "Completed 15+ client projects with 100% satisfaction rate",
                "Specialized in Flutter, React Native, and Firebase implementations",
                "Provided technical consulting for startup MVPs",
            ],
        },
    ];

    return (
        <div className="max-w-4xl space-y-10">
            {experiences.map((exp) => (
                <div
                    key={exp.company}
                    className="relative pl-8 md:pl-12 pb-10 border-l-2 border-white/10 last:border-l-0 last:pb-0"
                >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />

                    {/* Content */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="space-y-1">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight">{exp.company}</h3>
                                <p className="text-primary font-bold text-sm uppercase tracking-wide">{exp.role}</p>
                            </div>
                            <div className="flex items-center gap-2 text-muted text-sm font-medium">
                                <Calendar className="w-4 h-4" />
                                {exp.period}
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed">
                            {exp.description}
                        </p>

                        <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex gap-3 text-sm text-muted/90">
                                    <span className="text-primary mt-0.5">→</span>
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"
                onClick={onClose}
            />

            <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-8 md:p-12 space-y-8 animate-slide-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-all z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                    <span className="inline-block px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                        {project.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        {project.title}
                    </h2>
                    <p className="text-lg md:text-xl text-muted leading-relaxed">
                        {project.longDescription}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 border-y border-white/10 py-6">
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wide text-primary">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string) => (
                                <span key={t} className="px-3 py-1.5 border border-white/10 rounded-lg bg-white/5 text-sm font-medium">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wide text-primary">Impact</p>
                        <p className="text-lg font-bold">{project.impact}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    {project.links.playStore && (
                        <a
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 uppercase tracking-wide"
                        >
                            <Smartphone className="w-4 h-4" /> View on Play Store
                        </a>
                    )}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 glass border border-white/10 text-white text-sm font-bold rounded-full hover:bg-white/5 transition-all flex items-center gap-2 uppercase tracking-wide"
                        >
                            <Github className="w-4 h-4" /> View Source
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
