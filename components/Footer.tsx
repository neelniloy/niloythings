import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-muted py-16">
            <div className="container-wide">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
                            Niloy<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm">
                            CTO & Product Builder. Helping companies build exceptional digital products.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-4">Navigate</h4>
                        <ul className="space-y-3">
                            <li><Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">Work</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                            <li><Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">Tools</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <SocialLink href="https://github.com/nicsheathe" icon={<Github className="w-5 h-5" />} />
                            <SocialLink href="https://linkedin.com/in/niloythings" icon={<Linkedin className="w-5 h-5" />} />
                            <SocialLink href="https://twitter.com/niloythings" icon={<Twitter className="w-5 h-5" />} />
                            <SocialLink href="https://youtube.com/@niloythings" icon={<Youtube className="w-5 h-5" />} />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border text-sm text-muted-foreground">
                    © {currentYear} Niloy Kumar Sarker. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
        >
            {icon}
        </a>
    );
}
