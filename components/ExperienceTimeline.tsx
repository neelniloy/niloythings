"use client";

import { Briefcase, Building2, Calendar, Target } from "lucide-react";
import { motion } from "framer-motion";

interface Role {
    title: string;
    period: string;
    description: string;
}

interface CompanyExperience {
    company: string;
    totalPeriod: string;
    roles: Role[];
}

const experiences: CompanyExperience[] = [
    {
        company: "Futuredesh Ltd",
        totalPeriod: "2024 – Present",
        roles: [
            {
                title: "Chief Technology Officer (CTO)",
                period: "Jan 2024 – Present",
                description:
                    "Leading technical strategy and architecture for the AgriTech platform. Overseeing mobile (Flutter), backend, and operational dashboards. Managing the engineering team and ensuring offline-first reliability for rural usage.",
            },
        ],
    },
    {
        company: "Bdjobs.com Ltd",
        totalPeriod: "2023 – 2024",
        roles: [
            {
                title: "Software Engineer – Mobile",
                period: "2023 – 2024",
                description:
                    "Maintained and improved the core mobile application for Bangladesh's largest job portal. Implemented new features, refactored legacy modules, and optimized performance for millions of active users.",
            },
        ],
    },
    {
        company: "Freelance & Contract",
        totalPeriod: "2021 – 2023",
        roles: [
            {
                title: "Mobile Application Developer",
                period: "2021 – 2023",
                description:
                    "Built and shipped 10+ Android applications to Google Play Store. Specialized in utility apps, e-commerce solutions, and MVVM architecture with Kotlin and Java.",
            },
        ],
    },
];

export default function ExperienceTimeline() {
    return (
        <div className="space-y-12">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Briefcase className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase">Experience</h2>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">The Career Arc</p>
                </div>
            </div>

            <div className="relative border-l-2 border-white/5 ml-6 py-4 space-y-16">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="pl-12 relative"
                    >
                        {/* Company Node */}
                        <span className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-black border-[3px] border-primary shadow-[0_0_15px_rgba(255,49,49,0.3)]" />

                        <div className="mb-10">
                            <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                                {exp.company}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-muted uppercase tracking-widest mt-3">
                                <Calendar className="w-3 h-3 text-primary" />
                                {exp.totalPeriod}
                            </div>
                        </div>

                        {/* Roles */}
                        <div className="space-y-12">
                            {exp.roles.map((role, rIndex) => (
                                <div key={rIndex} className="relative pl-8 border-l border-white/5 ml-1">
                                    <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary/40" />
                                    <div className="space-y-3">
                                        <h4 className="text-xl font-bold text-white/90">
                                            {role.title}
                                        </h4>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                            {role.period}
                                        </p>
                                        <p className="text-muted leading-relaxed text-base max-w-2xl">
                                            {role.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
