"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Smartphone, Database, Zap } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="container-constrained py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="w-4 h-4" />
              Available for Projects
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Building{" "}
              <span className="text-gradient-accent">Resilient</span>
              <br />
              Digital Products
            </h1>

            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I'm <span className="text-white font-semibold">Niloy</span>, a mobile engineer crafting
              high-performance Flutter applications with offline-first architecture and native reliability.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/work"
                className="group px-8 py-4 bg-primary text-white font-semibold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <SocialLinks className="flex gap-3" />
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-square max-w-md mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl blur-3xl opacity-50" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="Niloy Kumar Sarker"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Ticker */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02] my-20">
        <TechStack />
      </section>

      {/* Capabilities Section */}
      <section className="container-constrained py-24 space-y-16">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Core Capabilities</h2>
          <p className="text-muted text-lg leading-relaxed">
            Specialized in building production-ready mobile and web applications with modern tech stacks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CapabilityCard
            icon={<Smartphone className="w-6 h-6" />}
            title="Mobile Development"
            description="Building high-performance Flutter apps with offline-first architecture and seamless user experiences."
            tags={["Flutter", "Native", "Firebase"]}
          />
          <CapabilityCard
            icon={<Code2 className="w-6 h-6" />}
            title="Full-Stack Engineering"
            description="End-to-end development from responsive frontends to scalable backend APIs and cloud infrastructure."
            tags={["Next.js", "Node.js", "PostgreSQL"]}
          />
          <CapabilityCard
            icon={<Database className="w-6 h-6" />}
            title="System Architecture"
            description="Designing distributed systems that handle millions of requests while maintaining data integrity."
            tags={["Cloud", "APIs", "Real-time"]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-constrained py-16 md:py-24">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 p-12 md:p-16 lg:p-20 text-center bg-gradient-to-br from-primary/10 to-purple-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

          <div className="relative space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Ready to build something{" "}
              <span className="text-gradient-accent">exceptional?</span>
            </h2>
            <p className="text-muted text-lg md:text-xl leading-relaxed">
              I specialize in transforming complex requirements into elegant, production-ready solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/work"
                className="px-8 py-4 bg-white text-background font-semibold rounded-full hover:scale-105 transition-all shadow-xl"
              >
                View My Work
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 glass border border-white/10 font-semibold rounded-full hover:bg-white/5 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

function CapabilityCard({ icon, title, description, tags }: CapabilityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 bg-white/5 rounded-md text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
