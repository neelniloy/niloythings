"use client";

import { Briefcase, Calendar } from "lucide-react";
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
                    "Maintained and improved the core Bdjobs app for Bangladesh's largest job portal, alongside Delivery Tiger and Delivery Bondhu — the company's courier and rider logistics apps. Implemented new features, refactored legacy modules, and optimized performance for millions of active users.",
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
            <div>
                <p className="eyebrow mb-4 text-primary">Career</p>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight flex items-center gap-3">
                    <Briefcase className="w-7 h-7 text-muted-foreground" />
                    Experience
                </h2>
            </div>

            <div className="relative border-l border-border ml-3 py-4 space-y-16">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="pl-10 relative"
                    >
                        {/* Company Node */}
                        <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-background border-2 border-primary" />

                        <div className="mb-8">
                            <h3 className="font-display text-2xl tracking-tight text-foreground">
                                {exp.company}
                            </h3>
                            <div className="inline-flex items-center gap-2 eyebrow mt-3">
                                <Calendar className="w-3 h-3 text-primary" />
                                {exp.totalPeriod}
                            </div>
                        </div>

                        {/* Roles */}
                        <div className="space-y-12">
                            {exp.roles.map((role, rIndex) => (
                                <div key={rIndex} className="relative pl-8 border-l border-border ml-1">
                                    <span className="absolute -left-[4px] top-2 h-2 w-2 rounded-full bg-border" />
                                    <div className="space-y-3">
                                        <h4 className="text-xl font-medium text-foreground/90">
                                            {role.title}
                                        </h4>
                                        <p className="eyebrow text-primary">
                                            {role.period}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed text-base max-w-2xl">
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
