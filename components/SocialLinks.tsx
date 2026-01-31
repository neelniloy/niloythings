import { Linkedin, Github, Mail, Youtube } from "lucide-react";
import Link from "next/link";

const socials = [
    {
        name: "LinkedIn",
        icon: <Linkedin className="w-5 h-5" />,
        href: "https://linkedin.com/in/niloykumarsarker",
    },
    {
        name: "GitHub",
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/neelniloy",
    },
    {
        name: "YouTube",
        icon: <Youtube className="w-5 h-5" />,
        href: "https://youtube.com/@niloythings",
    },
    {
        name: "Email",
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:contact@niloy.dev",
    },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {socials.map((s) => (
                <Link
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-card border border-border rounded-full text-muted transition-all hover:scale-110 active:scale-95 hover:border-primary/50 hover:text-primary shadow-lg hover:shadow-primary/20"
                    aria-label={s.name}
                >
                    <div className="relative z-10">{s.icon}</div>
                </Link>
            ))}
        </div>
    );
}
