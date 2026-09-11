"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, sectionViewport } from "@/lib/useAnimations";

const principles = [
    {
        title: "Systemic Integrity",
        description: "Architecting systems that don't just work, but scale and persist through complexity.",
    },
    {
        title: "Venture Velocity",
        description: "Shipping high-fidelity products at the speed of thought, without technical debt.",
    },
    {
        title: "Pragmatic Resiliency",
        description: "Choosing stable, reliable technologies over transient industry trends.",
    },
    {
        title: "User Centricity",
        description: "Bridging the gap between binary logic and human emotion through design.",
    },
];

export default function PhilosophySection() {
    return (
        <div>
            <div className="grid lg:grid-cols-12 gap-8 mb-16">
                <div className="lg:col-span-4">
                    <p className="eyebrow mb-4 text-primary">02 — Philosophy</p>
                    <h2 className="font-display text-3xl md:text-4xl tracking-tight">The Mandate</h2>
                </div>
                <p className="lg:col-span-8 text-lg text-muted-foreground max-w-xl self-end">
                    I don&apos;t just build apps. I build technical foundations that empower ventures
                    to scale with zero friction.
                </p>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={staggerContainer}
                className="border-t border-border grid md:grid-cols-2"
            >
                {principles.map((principle, index) => {
                    const isRightCol = index % 2 === 1;
                    return (
                        <motion.div
                            key={principle.title}
                            variants={staggerItem}
                            className={`border-b border-border p-8 md:p-10 flex flex-col gap-4 transition-colors hover:bg-muted/40 ${
                                isRightCol ? "md:border-l" : ""
                            }`}
                        >
                            <div>
                                <span className="num text-sm text-muted-foreground">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-display tracking-tight">{principle.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
