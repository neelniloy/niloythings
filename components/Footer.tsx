"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp, sectionViewport } from "@/lib/useAnimations";

const socials = [
    { name: "GitHub", href: "https://github.com/neelniloy" },
    { name: "LinkedIn", href: "https://linkedin.com/in/niloykumarsarker" },
    { name: "Twitter", href: "https://twitter.com/niloythings" },
    { name: "YouTube", href: "https://youtube.com/@niloythings" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="border-t border-border pt-14 pb-8"
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
        >
            <div className="container-wide">
                <motion.div variants={fadeUp} custom={0} className="mb-16">
                    <Link href="mailto:hello@niloy.dev" className="group inline-flex items-baseline gap-4">
                        <span className="font-display italic text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none group-hover:text-primary transition-colors">
                            Let&apos;s talk shop.
                        </span>
                        <ArrowUpRight className="hidden sm:block w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-12 pt-10 border-t border-border">
                    <motion.div variants={staggerItem} className="md:col-span-2">
                        <p className="font-display italic text-xl mb-4">
                            Niloy<span className="text-primary not-italic">.</span>
                        </p>
                        <p className="text-muted-foreground max-w-sm">
                            CTO &amp; product builder. Helping companies ship exceptional digital products.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                        <h4 className="eyebrow mb-5">Navigate</h4>
                        <ul className="space-y-3">
                            <li><Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">Work</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                            <li><Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">Tools</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                        <h4 className="eyebrow mb-5">Connect</h4>
                        <ul className="space-y-3">
                            {socials.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {s.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeUp}
                    custom={0.2}
                    className="pt-10 mt-10 border-t border-border flex flex-col sm:flex-row justify-between gap-2 eyebrow"
                >
                    <span>© {currentYear} Niloy Kumar Sarker</span>
                    <span>Bangladesh — Available for select work</span>
                </motion.div>
            </div>
        </motion.footer>
    );
}
