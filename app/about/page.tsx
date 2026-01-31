"use client";

import { motion } from "framer-motion";
import { Rocket, Code2, Users, Award, Github, Linkedin, Youtube } from "lucide-react";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechStack from "@/components/TechStack";
import MomentsGallery from "@/components/MomentsGallery";
import VideoShowcase from "@/components/VideoShowcase";
import GithubStats from "@/components/GithubStats";

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="min-h-screen"
        >
            <div className="container-constrained pt-32 pb-20 space-y-24">
                {/* Header */}
                <div className="max-w-4xl space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    >
                        Engineering at the{" "}
                        <span className="text-gradient-accent">intersection</span> of
                        product and technology.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
                        className="text-muted text-lg md:text-xl leading-relaxed"
                    >
                        I'm Niloy Kumar Sarker, a mobile and full-stack engineer specializing in building resilient,
                        offline-first applications. My focus is on creating products that work flawlessly even in
                        challenging network conditions—combining native performance with modern architecture.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16">
                    <StatCard number="60K+" label="Active Users" />
                    <StatCard number="3+" label="Production Apps" />
                    <StatCard number="5+" label="Years Experience" />
                    <StatCard number="100%" label="Client Satisfaction" />
                </div>

                {/* Highlights */}
                <div className="grid md:grid-cols-2 gap-8">
                    <HighlightCard
                        icon={<Rocket className="w-6 h-6" />}
                        title="Active Venture"
                        description="Building specialized software for underserved markets, creating tools that bridge infrastructure gaps and solve real human problems in challenging environments."
                    />
                    <HighlightCard
                        icon={<Code2 className="w-6 h-6" />}
                        title="Technical Focus"
                        description="Offline-first mobile architecture, real-time data synchronization, cloud-native backends, and performance optimization for resource-constrained devices."
                    />
                </div>

                {/* Tech Stack */}
                <div className="border-y border-white/5 py-12 bg-white/[0.02]">
                    <TechStack />
                </div>

                {/* Experience Timeline */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Professional Journey</h2>
                        <p className="text-muted text-lg">A timeline of my career milestones and key achievements.</p>
                    </div>
                    <ExperienceTimeline />
                </div>

                {/* Multimedia Grid */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8 space-y-16">
                        {/* Moments */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-4xl font-bold">Moments</h2>
                                <div className="h-1 w-16 bg-primary rounded" />
                            </div>
                            <MomentsGallery />
                        </div>

                        {/* Videos */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-4xl font-bold text-gradient-accent">
                                    Content & Talks
                                </h2>
                                <p className="text-muted">Technical deep-dives and project showcases.</p>
                            </div>
                            <VideoShowcase />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Current Focus */}
                        <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-6 sticky top-24">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Rocket className="w-6 h-6 text-primary" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold">Current Focus</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    Building production-grade Flutter applications with advanced offline capabilities
                                    and exploring edge computing for mobile platforms.
                                </p>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">Achievements</h3>
                            <div className="grid gap-3">
                                <BadgeItem
                                    label="Google Cloud Certified"
                                    icon={<Award className="w-4 h-4 text-primary" />}
                                />
                                <BadgeItem
                                    label="AWS Solutions Architect"
                                    icon={<Award className="w-4 h-4 text-primary" />}
                                />
                                <BadgeItem
                                    label="Flutter Expert"
                                    icon={<Code2 className="w-4 h-4 text-primary" />}
                                />
                            </div>
                        </div>

                        {/* GitHub Stats - Only if available */}
                        <GithubStats />
                    </aside>
                </div>
            </div>
        </motion.div>
    );
}

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center"
        >
            <div className="text-3xl md:text-4xl font-bold text-gradient-accent">{number}</div>
            <div className="text-muted text-sm mt-2">{label}</div>
        </motion.div>
    );
}

function HighlightCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl glass-card border border-white/10 space-y-4"
        >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {icon}
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

function BadgeItem({ label, icon }: { label: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-default">
            <span className="text-sm font-semibold">{label}</span>
            <div className="group-hover:scale-110 transition-transform">{icon}</div>
        </div>
    );
}
