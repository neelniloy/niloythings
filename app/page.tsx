"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, Code2, Database, Rocket, Users, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  scaleIn,
  sectionViewport,
} from "@/lib/useAnimations";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-wide pt-12 pb-20 md:pt-20 md:pb-28">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            variants={staggerItem}
            className="text-lg text-muted-foreground mb-4"
          >
            Hey there 👋
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8"
          >
            I&apos;m <span className="gradient-text">Niloy</span>,<br />
            I build products<br />
            that scale.
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            CTO & Product Builder specializing in mobile-first experiences,
            offline-first architecture, and building teams that ship.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
            <Link href="/work" className="btn-primary">
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-outline">
              About Me
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-20 md:py-24">
        <motion.div
          className="container-wide"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedStat number={60} suffix="K+" label="Active Users" />
            <AnimatedStat number={10} suffix="+" label="Products Shipped" />
            <AnimatedStat number={5} suffix="+" label="Years Experience" />
            <AnimatedStat number={3} suffix="" label="Companies Built" />
          </div>
        </motion.div>
      </section>

      {/* What I Do Section */}
      <section className="container-wide py-24 md:py-28">
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            What I Do
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            I help companies build exceptional digital products from the ground up.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <ServiceCard
            icon={<Smartphone className="w-7 h-7" />}
            title="Mobile Development"
            description="Flutter, React Native, and native iOS/Android apps that users love."
            index={0}
          />
          <ServiceCard
            icon={<Code2 className="w-7 h-7" />}
            title="Full-Stack Engineering"
            description="End-to-end solutions with Node.js, Go, and modern frameworks."
            index={1}
          />
          <ServiceCard
            icon={<Database className="w-7 h-7" />}
            title="System Architecture"
            description="Scalable, offline-first backends and cloud infrastructure."
            index={2}
          />
          <ServiceCard
            icon={<Rocket className="w-7 h-7" />}
            title="Product Strategy"
            description="From ideation to launch, bridging tech and business."
            index={3}
          />
          <ServiceCard
            icon={<Users className="w-7 h-7" />}
            title="Team Leadership"
            description="Building and mentoring high-performing engineering teams."
            index={4}
          />
          <ServiceCard
            icon={<Zap className="w-7 h-7" />}
            title="Performance"
            description="Optimization for speed, SEO, and user experience."
            index={5}
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-foreground text-background py-24 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <div className="container-wide text-center">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Let&apos;s build something amazing
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="text-xl text-background/70 mb-10 max-w-xl mx-auto"
          >
            Have a project in mind? I&apos;m open to select partnerships and collaborations.
          </motion.p>
          <motion.div variants={fadeUp} custom={0.2}>
            <Link
              href="mailto:hello@niloy.dev"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

// ── Animated Counter ─────────────────────────────

function AnimatedStat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(number / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="text-center md:text-left"
    >
      <p className="stat-number text-accent">
        {isInView ? count : 0}{suffix}
      </p>
      <p className="text-muted-foreground font-medium mt-2">{label}</p>
    </motion.div>
  );
}

// ── Service Card ─────────────────────────────────

const cardAccents = [
  { bg: "bg-red-500/10", text: "text-red-500", border: "hover:border-red-500/30" },
  { bg: "bg-blue-500/10", text: "text-blue-500", border: "hover:border-blue-500/30" },
  { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "hover:border-emerald-500/30" },
  { bg: "bg-amber-500/10", text: "text-amber-500", border: "hover:border-amber-500/30" },
  { bg: "bg-violet-500/10", text: "text-violet-500", border: "hover:border-violet-500/30" },
  { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "hover:border-cyan-500/30" },
];

function ServiceCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  const accent = cardAccents[index % cardAccents.length];
  return (
    <motion.div
      variants={scaleIn}
      custom={index * 0.05}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`card p-8 group ${accent.border} transition-all duration-300`}
    >
      <motion.div
        className={`w-14 h-14 rounded-2xl ${accent.bg} flex items-center justify-center ${accent.text} mb-6`}
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
