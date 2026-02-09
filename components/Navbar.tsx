"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tools" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
            <nav className="container-wide flex items-center justify-between h-20">
                <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                    Niloy<span className="text-primary">.</span>
                </Link>

                <div className="flex items-center gap-8">
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href="mailto:hello@niloy.dev"
                        className="hidden md:inline-flex px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:scale-105 transition-transform"
                    >
                        Say Hello
                    </Link>

                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
