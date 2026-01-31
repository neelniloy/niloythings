"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Users, Target, Shield, Cpu, Sparkles, Orbit } from "lucide-react";

const principles = [
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "Systemic Integrity",
        description: "Architecting systems that don't just work, but scale and persist through complexity.",
        accent: "bg-primary",
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Venture Velocity",
        description: "Shipping high-fidelity products at the speed of thought, without technical debt.",
        accent: "bg-primary",
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Pragmatic Resiliency",
        description: "Choosing stable, reliable technologies over transient industry trends.",
        accent: "bg-primary",
    },
    {
        icon: <Orbit className="w-6 h-6" />,
        title: "User Centricity",
        description: "Bridging the gap between binary logic and human emotion through design.",
        accent: "bg-primary",
    },
];

export default function PhilosophySection() {
    return (
        <section className="space-y-16">
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4">
                <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tighter">The Mandate.</h2>
                    <p className="text-muted tracking-[0.4em] uppercase text-[10px] font-bold">Engineering Philosophy</p>
                </div>
                <p className="text-muted text-sm max-w-sm leading-relaxed border-l border-white/10 pl-6">
                    I don't just build apps. I build technical foundations that empower ventures to scale with zero friction.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {principles.map((principle, index) => (
                    <motion.div
                        key={principle.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group relative p-10 rounded-[2.5rem] glass border border-white/5 overflow-hidden transition-all hover:border-primary/20"
                    >
                        {/* Background Glow */}
                        <div className={`absolute -top-24 -right-24 w-48 h-48 ${principle.accent} opacity-0 blur-[80px] group-hover:opacity-10 transition-opacity duration-700`} />

                        <div className="relative z-10 space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                                {principle.icon}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold tracking-tight">{principle.title}</h3>
                                <p className="text-muted text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                                    {principle.description}
                                </p>
                            </div>
                        </div>

                        {/* Architectural Accent */}
                        <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-all">
                            <Sparkles className="w-12 h-12 text-primary" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
