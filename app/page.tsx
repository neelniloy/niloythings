"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, Code2, Database, Rocket, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-wide pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl">
          <p className="text-lg text-muted-foreground mb-4">Hey there 👋</p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
            I&apos;m <span className="text-accent">Niloy</span>,<br />
            I build products<br />
            that scale.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            CTO & Product Builder specializing in mobile-first experiences,
            offline-first architecture, and building teams that ship.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/work" className="btn-primary">
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-outline">
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatItem number="60K+" label="Active Users" />
            <StatItem number="10+" label="Products Shipped" />
            <StatItem number="5+" label="Years Experience" />
            <StatItem number="3" label="Companies Built" />
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="container-wide py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What I Do</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I help companies build exceptional digital products from the ground up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            icon={<Smartphone className="w-7 h-7" />}
            title="Mobile Development"
            description="Flutter, React Native, and native iOS/Android apps that users love."
          />
          <ServiceCard
            icon={<Code2 className="w-7 h-7" />}
            title="Full-Stack Engineering"
            description="End-to-end solutions with Node.js, Go, and modern frameworks."
          />
          <ServiceCard
            icon={<Database className="w-7 h-7" />}
            title="System Architecture"
            description="Scalable, offline-first backends and cloud infrastructure."
          />
          <ServiceCard
            icon={<Rocket className="w-7 h-7" />}
            title="Product Strategy"
            description="From ideation to launch, bridging tech and business."
          />
          <ServiceCard
            icon={<Users className="w-7 h-7" />}
            title="Team Leadership"
            description="Building and mentoring high-performing engineering teams."
          />
          <ServiceCard
            icon={<Zap className="w-7 h-7" />}
            title="Performance"
            description="Optimization for speed, SEO, and user experience."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s build something amazing
          </h2>
          <p className="text-xl text-background/70 mb-10 max-w-xl mx-auto">
            Have a project in mind? I&apos;m open to select partnerships and collaborations.
          </p>
          <Link
            href="mailto:hello@niloy.dev"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="stat-number text-accent">{number}</p>
      <p className="text-muted-foreground font-medium mt-2">{label}</p>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card p-8 transition-all hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
