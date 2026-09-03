"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navSlideDown } from "@/lib/useAnimations";

const navItems = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tools" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setMenuOpen(false);
    }

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            <motion.header
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 ${
                scrolled
                    ? "bg-background/95 backdrop-blur-xl border-border"
                    : "bg-background/80 backdrop-blur-md border-transparent"
            }`}
            initial="hidden"
            animate="visible"
            variants={navSlideDown}
        >
            <nav className="container-wide flex items-center justify-between h-20">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <Image src="/logo-mark.png" alt="Niloy" width={28} height={28} className="rounded-md" priority />
                    <span className="font-display italic text-2xl tracking-tight group-hover:text-primary transition-colors">
                        Niloy<span className="text-primary not-italic">.</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6 md:gap-8">
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item, i) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path} className="relative">
                                    <Link
                                        href={item.path}
                                        className={`eyebrow flex items-center gap-2 py-2 transition-colors ${
                                            isActive ? "text-foreground" : "hover:text-foreground"
                                        }`}
                                    >
                                        <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                                        {item.name}
                                    </Link>
                                    {isActive && (
                                        <motion.div
                                            className="nav-indicator"
                                            layoutId="nav-indicator"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href="mailto:niloy64529@gmail.com"
                        className="hidden md:inline-flex eyebrow items-center gap-2 px-4 py-2.5 border border-border rounded-sm hover:border-foreground hover:text-foreground transition-colors"
                    >
                        Say Hello
                    </Link>

                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="md:hidden w-10 h-10 flex items-center justify-center border border-border rounded-sm text-foreground"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>
        </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="md:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-background border-t border-border overflow-y-auto"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="container-wide py-10 flex flex-col h-full">
                            <ul className="flex flex-col divide-y divide-border border-y border-border">
                                {navItems.map((item, i) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <li key={item.path}>
                                            <Link
                                                href={item.path}
                                                className="flex items-baseline justify-between py-6 group"
                                            >
                                                <span
                                                    className={`font-display text-4xl tracking-tight transition-colors ${
                                                        isActive ? "text-primary" : "group-hover:text-primary"
                                                    }`}
                                                >
                                                    {item.name}
                                                </span>
                                                <span className="flex items-center gap-3">
                                                    <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-auto pt-10 flex items-center justify-between">
                                <Link href="mailto:niloy64529@gmail.com" className="eyebrow link-underline">
                                    niloy64529@gmail.com
                                </Link>
                                <span className="eyebrow text-muted-foreground">Bangladesh</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
