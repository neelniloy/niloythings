"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  sectionViewport,
} from "@/lib/useAnimations";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-wide pt-8 pb-16 md:pt-12 md:pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-end"
        >
          <div className="lg:col-span-9">
            <motion.p variants={staggerItem} className="eyebrow mb-6">
              Product Technologist — CTO, Futuredesh Ltd
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] mb-8"
            >
              I&apos;m Niloy. I build
              <br />
              products that{" "}
              <span className="italic text-primary">scale.</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              CTO &amp; product builder specializing in mobile-first experiences,
              offline-first architecture, and building teams that ship.
            </motion.p>
          </div>

          <motion.div variants={staggerItem} className="lg:col-span-3 flex lg:justify-end">
            <div className="flex flex-wrap lg:flex-col gap-4 lg:items-end w-full">
              <Link href="/work" className="btn-primary">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-outline">
                About Me
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border">
        <motion.div
          className="container-wide"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            <AnimatedStat number={60} suffix="K+" label="Active Users" first />
            <AnimatedStat number={10} suffix="+" label="Products Shipped" />
            <AnimatedStat number={5} suffix="+" label="Years Experience" />
            <AnimatedStat number={4} suffix="" label="Companies" />
          </div>
        </motion.div>
      </section>

      {/* What I Do Section */}
      <section className="container-wide py-16 md:py-24">
        <motion.div
          className="grid lg:grid-cols-12 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="lg:col-span-4">
            <p className="eyebrow mb-4 text-primary">01 — What I Do</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Capabilities
            </h2>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="lg:col-span-8 text-lg text-muted-foreground max-w-2xl self-end"
          >
            I help companies build exceptional digital products from the ground up —
            from architecture to shipped feature.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="border-t border-border grid md:grid-cols-2"
        >
          {services.map((service, index) => (
            <ServiceRow key={service.title} {...service} index={index} />
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-foreground text-background py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="lg:col-span-8 font-display text-4xl md:text-6xl tracking-tight leading-[1.1]"
            >
              Let&apos;s build something amazing.
            </motion.h2>
            <motion.div variants={fadeUp} custom={0.15} className="lg:col-span-4 lg:text-right">
              <p className="text-background/60 mb-6 max-w-xs lg:ml-auto">
                Open to select partnerships and collaborations.
              </p>
              <Link
                href="mailto:niloy64529@gmail.com"
                className="inline-flex items-center gap-2 eyebrow px-6 py-4 bg-background text-foreground rounded-sm hover:bg-primary hover:text-white transition-colors"
              >
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

// ── Animated Counter ─────────────────────────────

function AnimatedStat({
  number,
  suffix,
  label,
  first,
}: {
  number: number;
  suffix: string;
  label: string;
  first?: boolean;
}) {
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
      className={`py-10 px-2 md:px-8 ${!first ? "border-l border-border" : ""}`}
    >
      <p className="stat-number">
        {isInView ? count : 0}
        {suffix}
      </p>
      <p className="eyebrow mt-3">{label}</p>
    </motion.div>
  );
}

// ── Service Row ───────────────────────────────────

const services = [
  {
    title: "Mobile Development",
    description: "Flutter and native iOS/Android apps that users love.",
  },
  {
    title: "Full-Stack Engineering",
    description: "End-to-end solutions with Node.js, Go, and modern frameworks.",
  },
  {
    title: "System Architecture",
    description: "Scalable, offline-first backends and cloud infrastructure.",
  },
  {
    title: "Product Strategy",
    description: "From ideation to launch, bridging tech and business.",
  },
  {
    title: "Team Leadership",
    description: "Building and mentoring high-performing engineering teams.",
  },
  {
    title: "Performance",
    description: "Optimization for speed, SEO, and user experience.",
  },
];

function ServiceRow({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const isRightCol = index % 2 === 1;
  return (
    <motion.div
      variants={staggerItem}
      className={`group border-b border-border p-8 md:p-10 flex flex-col gap-4 transition-colors hover:bg-muted/40 ${
        isRightCol ? "md:border-l" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="num text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary transition-all" />
      </div>
      <h3 className="text-xl md:text-2xl font-display tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
