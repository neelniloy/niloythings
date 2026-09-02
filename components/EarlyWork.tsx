"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EARLY_APPS } from "@/lib/data";
import { staggerContainer, staggerItem, sectionViewport } from "@/lib/useAnimations";

export default function EarlyWork() {
    return (
        <section>
            <div className="grid lg:grid-cols-12 gap-8 mb-10">
                <div className="lg:col-span-4">
                    <p className="eyebrow mb-4 text-primary">More — Early Work</p>
                    <h2 className="font-display text-3xl md:text-4xl tracking-tight">Where It Started</h2>
                </div>
                <p className="lg:col-span-8 text-lg text-muted-foreground max-w-xl self-end">
                    Smaller apps and experiments built along the way. Not every project needs 100K
                    downloads to be worth shipping.
                </p>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={staggerContainer}
                className="border-t border-l border-border grid sm:grid-cols-2 lg:grid-cols-4"
            >
                {EARLY_APPS.map((app) => (
                    <motion.a
                        key={app.title}
                        href={app.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={staggerItem}
                        className="group text-left p-6 border-r border-b border-border transition-colors hover:bg-muted/40 flex flex-col gap-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="w-11 h-11 rounded-md overflow-hidden border border-border relative shrink-0">
                                <Image src={app.image} alt={app.title} fill className="object-cover" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary transition-all" />
                        </div>
                        <div>
                            <h3 className="font-display text-base tracking-tight mb-1">{app.title}</h3>
                            <p className="text-sm text-muted-foreground">{app.tagline}</p>
                        </div>
                        <span className="eyebrow text-primary">{app.installs} Installs</span>
                    </motion.a>
                ))}
            </motion.div>
        </section>
    );
}
