import Link from "next/link";
import { Github, Linkedin, Youtube, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-white/[0.02] mt-20">
            <div className="container-constrained py-12 md:py-16">
                <div className="grid md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                            <span className="font-bold text-lg">Niloy Kumar Sarker</span>
                        </div>
                        <p className="text-muted text-sm leading-relaxed max-w-xs">
                            Mobile engineer building resilient, offline-first applications with Flutter and modern web technologies.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2">
                            <li><FooterLink href="/">Home</FooterLink></li>
                            <li><FooterLink href="/work">Portfolio</FooterLink></li>
                            <li><FooterLink href="/about">About</FooterLink></li>
                            <li><FooterLink href="/tools">Developer Tools</FooterLink></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider">Connect</h4>
                        <div className="flex gap-3">
                            <SocialIcon href="https://github.com/niloythings" icon={<Github className="w-4 h-4" />} label="GitHub" />
                            <SocialIcon href="https://linkedin.com/in/niloythings" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
                            <SocialIcon href="https://youtube.com/@niloythings" icon={<Youtube className="w-4 h-4" />} label="YouTube" />
                            <SocialIcon href="mailto:contact@niloy.dev" icon={<Mail className="w-4 h-4" />} label="Email" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <p>© {currentYear} Niloy Kumar Sarker. All rights reserved.</p>
                    <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-muted hover:text-white transition-colors text-sm inline-block"
        >
            {children}
        </Link>
    );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-muted hover:text-white"
        >
            {icon}
        </a>
    );
}
