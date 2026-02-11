"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp, sectionViewport } from "@/lib/useAnimations";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="border-t border-border bg-muted py-16"
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
        >
            <div className="container-wide">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <motion.div variants={staggerItem} className="md:col-span-2">
                        <Link href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
                            Niloy<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm">
                            CTO & Product Builder. Helping companies build exceptional digital products.
                        </p>
                    </motion.div>

                    {/* Links */}
                    <motion.div variants={staggerItem}>
                        <h4 className="font-bold mb-4">Navigate</h4>
                        <ul className="space-y-3">
                            <li><Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">Work</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                            <li><Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">Tools</Link></li>
                        </ul>
                    </motion.div>

                    {/* Social */}
                    <motion.div variants={staggerItem}>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <SocialLink href="https://github.com/neelniloy" icon={<Github className="w-5 h-5" />} />
                            <SocialLink href="https://linkedin.com/in/niloythings" icon={<Linkedin className="w-5 h-5" />} />
                            <SocialLink href="https://twitter.com/niloythings" icon={<Twitter className="w-5 h-5" />} />
                            <SocialLink href="https://youtube.com/@niloythings" icon={<Youtube className="w-5 h-5" />} />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeUp}
                    custom={0.3}
                    className="pt-8 border-t border-border text-sm text-muted-foreground"
                >
                    © {currentYear} Niloy Kumar Sarker. All rights reserved.
                </motion.div>
            </div>
        </motion.footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            whileHover={{ scale: 1.15, rotate: -5, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            {icon}
        </motion.a>
    );
}
