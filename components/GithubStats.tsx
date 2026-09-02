"use client";

import { Star, GitFork, BookOpen, Users, Github } from "lucide-react";
import { useState, useEffect } from "react";

interface GitHubUser {
    public_repos: number;
    followers: number;
    following: number;
}

interface GitHubRepo {
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
}

const USERNAME = "neelniloy";

function SectionHeading() {
    return (
        <div className="mb-10">
            <p className="eyebrow mb-4 text-primary">03 — Open Source</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">GitHub Activity</h2>
        </div>
    );
}

export default function GithubStats() {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGithub() {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${USERNAME}`),
                    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=stars&direction=desc`),
                ]);

                if (!userRes.ok || !reposRes.ok) {
                    throw new Error("GitHub API rate limited or unavailable");
                }

                const userData: GitHubUser = await userRes.json();
                const reposData: GitHubRepo[] = await reposRes.json();

                setUser(userData);

                const stars = reposData.reduce((sum, r) => sum + r.stargazers_count, 0);
                setTotalStars(stars);

                setRepos(reposData.slice(0, 3));
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load GitHub data");
            } finally {
                setLoading(false);
            }
        }

        fetchGithub();
    }, []);

    if (loading) {
        return (
            <div>
                <SectionHeading />
                <div className="py-12 flex items-center justify-center border border-border rounded-md text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
                    <span className="eyebrow">Loading GitHub data...</span>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div>
                <SectionHeading />
                <div className="border border-border rounded-md p-8 text-center text-muted-foreground">
                    <p className="mb-2">Unable to load GitHub stats right now.</p>
                    <a
                        href={`https://github.com/${USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                    >
                        Visit my GitHub profile →
                    </a>
                </div>
            </div>
        );
    }

    const langColors: Record<string, string> = {
        TypeScript: "bg-blue-400",
        JavaScript: "bg-yellow-400",
        Dart: "bg-sky-400",
        Kotlin: "bg-purple-400",
        Go: "bg-cyan-400",
        Python: "bg-green-400",
        Java: "bg-orange-400",
        HTML: "bg-red-400",
        CSS: "bg-pink-400",
    };

    const stats = [
        { icon: <BookOpen className="w-4 h-4" />, value: user.public_repos, label: "Repositories" },
        { icon: <Star className="w-4 h-4" />, value: totalStars, label: "Stars Earned" },
        { icon: <Users className="w-4 h-4" />, value: user.followers, label: "Followers" },
    ];

    return (
        <div>
            <SectionHeading />

            <div className="border border-border rounded-md p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3 eyebrow">
                        <Github className="w-4 h-4" />
                        @{USERNAME}
                    </span>
                    <a
                        href={`https://github.com/${USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        View profile ↗
                    </a>
                </div>

                {/* Stats Grid — no animation, renders immediately */}
                <div className="grid grid-cols-3 border-t border-border">
                    {stats.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex flex-col items-center justify-center py-6 text-center gap-2 ${i > 0 ? "border-l border-border" : ""}`}
                        >
                            <span className="text-muted-foreground">{s.icon}</span>
                            <span className="font-display text-2xl tracking-tight">{s.value}</span>
                            <span className="eyebrow">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Top Repos */}
                {repos.length > 0 && (
                    <div className="space-y-3 pt-2">
                        <h4 className="eyebrow">Top Repositories</h4>
                        <div className="grid gap-3">
                            {repos.map((repo) => (
                                <a
                                    key={repo.name}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 rounded-sm border border-border hover:border-foreground transition-colors group"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium group-hover:text-primary transition-colors">
                                            {repo.name}
                                        </span>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3" /> {repo.stargazers_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitFork className="w-3 h-3" /> {repo.forks_count}
                                            </span>
                                        </div>
                                    </div>
                                    {repo.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-1">{repo.description}</p>
                                    )}
                                    {repo.language && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${langColors[repo.language] || "bg-gray-400"}`} />
                                            <span className="text-xs text-muted-foreground">{repo.language}</span>
                                        </div>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
