"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { navSlideDown } from "@/lib/useAnimations";

const navItems = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tools" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-background/95 backdrop-blur-xl shadow-[0_1px_0_var(--border)]"
                    : "bg-background/80 backdrop-blur-md"
            }`}
            initial="hidden"
            animate="visible"
            variants={navSlideDown}
        >
            <nav className="container-wide flex items-center justify-between h-20">
                <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="inline-block"
                    >
                        Niloy<span className="text-primary">.</span>
                    </motion.span>
                </Link>

                <div className="flex items-center gap-8">
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path} className="relative">
                                    <Link
                                        href={item.path}
                                        className={`font-medium transition-colors py-2 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                    {isActive && (
                                        <motion.div
                                            className="nav-indicator"
                                            layoutId="nav-indicator"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="mailto:hello@niloy.dev"
                            className="hidden md:inline-flex px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:shadow-[0_8px_25px_rgba(255,49,49,0.3)] transition-shadow"
                        >
                            Say Hello
                        </Link>
                    </motion.div>

                    <ThemeToggle />
                </div>
            </nav>
        </motion.header>
    );
}
