import { Star, GitCommit, GitPullRequest } from "lucide-react";

export default function GithubStats() {
    // Static mock data for demo purposes, can be swapped with SWR/API later
    const stats = [
        {
            label: "Contributions",
            value: "1,240+",
            icon: <GitCommit className="w-5 h-5 text-green-400" />,
        },
        {
            label: "Repositories",
            value: "45",
            icon: <GitPullRequest className="w-5 h-5 text-blue-400" />,
        },
        {
            label: "Stars Earned",
            value: "180+",
            icon: <Star className="w-5 h-5 text-yellow-400" />,
        },
    ];

    return (
        <div className="bg-card border border-border rounded-3xl p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </span>
                    Open Source
                </h2>
                <a
                    href="https://github.com/neelniloy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-white transition-colors"
                >
                    @neelniloy ↗
                </a>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl text-center space-y-2 hover:bg-white/10 transition-colors"
                    >
                        {s.icon}
                        <span className="text-2xl font-bold">{s.value}</span>
                        <span className="text-xs text-muted uppercase tracking-wider">
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted uppercase tracking-wider">
                    Top Projects
                </h3>
                <div className="grid gap-3">
                    <RepoCard name="niloythings" desc="A modern, motion-driven engineering portfolio." lang="TypeScript" stars="12" />
                    <RepoCard name="flutter_payment_gateway" desc="Unified payment interface for BD gateways." lang="Dart" stars="45" />
                    <RepoCard name="agri_connect_backend" desc="Scalable microservices for AgriTech." lang="Go" stars="28" />
                </div>
            </div>
        </div>
    );
}

interface RepoCardProps {
    name: string;
    desc: string;
    lang: string;
    stars: string;
}

function RepoCard({ name, desc, lang, stars }: RepoCardProps) {
    return (
        <a
            href={`https://github.com/neelniloy`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group"
        >
            <div className="flex items-center justify-between mb-1">
                <span className="font-semibold group-hover:text-blue-400 transition-colors">
                    {name}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted">
                    <Star className="w-3 h-3" /> {stars}
                </div>
            </div>
            <p className="text-sm text-muted line-clamp-1">{desc}</p>
            <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs text-muted">{lang}</span>
            </div>
        </a>
    );
}
