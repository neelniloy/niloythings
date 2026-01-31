"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tools" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled
                ? "glass-card px-3 py-2 rounded-full"
                : "glass px-4 py-3 rounded-full"
                }`}
        >
            <ul className="flex items-center gap-1">
                {/* Logo */}
                <li className="mr-4 pr-4 border-r border-white/10">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-6 h-6 object-contain hover:scale-110 transition-transform"
                        />
                    </Link>
                </li>

                {/* Nav Items */}
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`relative px-5 py-2.5 text-sm font-semibold transition-colors rounded-full ${isActive
                                        ? "text-white bg-white/10 border border-white/5"
                                        : "text-muted hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </motion.nav>
    );
}
