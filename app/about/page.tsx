"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Mail, Calendar } from "lucide-react";
import { EXPERIENCES } from "@/lib/data";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="container-wide pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                            Hey, I&apos;m <span className="text-accent">Niloy</span> 👋
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            I&apos;m a CTO and product builder based in Bangladesh. I lead engineering teams
                            and build products that scale — with a focus on mobile-first experiences
                            and offline-first architecture.
                        </p>
                        <div className="flex flex-wrap gap-4 text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Bangladesh
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" /> hello@niloy.dev
                            </span>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="card p-8">
                        <h3 className="text-lg font-bold mb-6">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <StatItem number="60K+" label="Active Users" />
                            <StatItem number="10+" label="Products" />
                            <StatItem number="5+" label="Years" />
                            <StatItem number="3" label="Companies" />
                        </div>
                    </div>
                </div>
            </section>

            {/* What I Believe */}
            <section className="bg-muted py-20">
                <div className="container-wide">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                        What I Believe
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <BeliefCard
                            title="Build for Real People"
                            description="Technology should solve real problems, not create new ones. I focus on products that make a tangible difference."
                        />
                        <BeliefCard
                            title="Offline-First Always"
                            description="Connectivity is a privilege. I build systems that work seamlessly regardless of network conditions."
                        />
                        <BeliefCard
                            title="Ship, Learn, Iterate"
                            description="Perfection is the enemy of progress. Get it out, get feedback, make it better."
                        />
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section className="container-wide py-20">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                    Experience
                </h2>
                <div className="space-y-8">
                    {EXPERIENCES.map((exp) => (
                        <div key={exp.company} className="card p-8">
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{exp.company}</h3>
                                    <p className="text-primary font-medium">{exp.role}</p>
                                </div>
                                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" /> {exp.period}
                                </span>
                            </div>
                            <p className="text-muted-foreground">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container-wide py-20 border-t border-border">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        I&apos;m open to advisory roles, technical partnerships, and conversations
                        about building impactful products.
                    </p>
                    <Link href="mailto:hello@niloy.dev" className="btn-primary">
                        Get in Touch
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

function StatItem({ number, label }: { number: string; label: string }) {
    return (
        <div>
            <p className="text-3xl font-bold text-accent">{number}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}

function BeliefCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="card p-8">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}
