"use client";

import { Star, GitFork, BookOpen, Users } from "lucide-react";
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
            <div className="py-12 flex items-center justify-center text-muted-foreground">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
                Loading GitHub data...
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="card p-8 text-center text-muted-foreground">
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
        { icon: <BookOpen className="w-5 h-5 text-blue-400" />, value: user.public_repos, label: "Repositories" },
        { icon: <Star className="w-5 h-5 text-yellow-400" />, value: totalStars, label: "Stars Earned" },
        { icon: <Users className="w-5 h-5 text-green-400" />, value: user.followers, label: "Followers" },
    ];

    return (
        <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-muted/10 flex items-center justify-center text-foreground">
                        <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </span>
                    GitHub Activity
                </h3>
                <a
                    href={`https://github.com/${USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    @{USERNAME} ↗
                </a>
            </div>

            {/* Stats Grid — no animation, renders immediately */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="flex flex-col items-center justify-center p-4 bg-muted/10 rounded-2xl text-center space-y-2 hover:bg-muted/20 transition-colors"
                    >
                        {s.icon}
                        <span className="text-2xl font-bold">{s.value}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Top Repos */}
            {repos.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Top Repositories
                    </h4>
                    <div className="grid gap-3">
                        {repos.map((repo) => (
                            <a
                                key={repo.name}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-xl border border-border hover:border-foreground/20 hover:bg-muted/10 transition-all group"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold group-hover:text-primary transition-colors">
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
    );
}
