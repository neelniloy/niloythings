import { Linkedin, Github, Mail, Youtube } from "lucide-react";
import Link from "next/link";

const socials = [
    {
        name: "LinkedIn",
        icon: <Linkedin className="w-5 h-5" />,
        href: "https://www.linkedin.com/in/niloysarker/",
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
        href: "mailto:niloy64529@gmail.com",
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
                    className="group relative w-11 h-11 flex items-center justify-center border border-border rounded-sm text-muted-foreground transition-colors hover:border-foreground hover:text-primary"
                    aria-label={s.name}
                >
                    <div className="relative z-10">{s.icon}</div>
                </Link>
            ))}
        </div>
    );
}
