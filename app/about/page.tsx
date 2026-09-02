"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    fadeUp,
    fadeRight,
    staggerContainer,
    staggerItem,
    sectionViewport,
} from "@/lib/useAnimations";

import TechStack from "@/components/TechStack";
import PhilosophySection from "@/components/PhilosophySection";
import GithubStats from "@/components/GithubStats";
import VideoShowcase from "@/components/VideoShowcase";
import MomentsGallery from "@/components/MomentsGallery";
import SocialLinks from "@/components/SocialLinks";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="container-wide pt-8 pb-12 md:pt-10">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <motion.div
                        className="lg:col-span-8"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.p variants={staggerItem} className="eyebrow mb-6 text-primary">
                            About
                        </motion.p>
                        <motion.h1
                            variants={staggerItem}
                            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8"
                        >
                            Hey, I&apos;m <span className="italic">Niloy.</span>
                        </motion.h1>
                        <motion.p
                            variants={staggerItem}
                            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
                        >
                            I&apos;m a CTO and product builder based in Bangladesh. I lead engineering teams
                            and build products that scale — with a focus on mobile-first experiences
                            and offline-first architecture.
                        </motion.p>
                        <motion.div variants={staggerItem} className="flex flex-wrap gap-6 eyebrow">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" /> Bangladesh
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" /> hello@niloy.dev
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        className="lg:col-span-4 border border-border rounded-md p-8"
                        initial="hidden"
                        animate="visible"
                        variants={fadeRight}
                        custom={0.3}
                    >
                        <h3 className="eyebrow mb-6">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                            <AnimatedMiniStat number={60} suffix="K+" label="Active Users" />
                            <AnimatedMiniStat number={10} suffix="+" label="Products" />
                            <AnimatedMiniStat number={5} suffix="+" label="Years" />
                            <AnimatedMiniStat number={3} suffix="" label="Companies" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tech Stack Marquee */}
            <motion.div
                className="py-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <TechStack />
            </motion.div>

            {/* Engineering Philosophy */}
            <motion.section
                className="container-wide py-16"
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={fadeUp}
                custom={0}
            >
                <PhilosophySection />
            </motion.section>

            {/* GitHub / Open Source */}
            <motion.section
                className="container-wide py-16 border-t border-border"
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={fadeUp}
                custom={0}
            >
                <GithubStats />
            </motion.section>

            {/* Studio Feed (YouTube) */}
            <motion.section
                className="container-wide py-16 border-t border-border"
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={fadeUp}
                custom={0}
            >
                <VideoShowcase />
            </motion.section>

            {/* Achievements Gallery */}
            <motion.section
                className="container-wide py-16 border-t border-border"
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={fadeUp}
                custom={0}
            >
                <div className="mb-16">
                    <p className="eyebrow mb-4 text-primary">05 — Recognition</p>
                    <h2 className="font-display text-3xl md:text-4xl tracking-tight">Achievements &amp; Moments</h2>
                </div>
                <MomentsGallery />
            </motion.section>

            {/* CTA */}
            <motion.section
                className="container-wide py-16 border-t border-border"
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                variants={staggerContainer}
            >
                <div className="max-w-2xl">
                    <motion.h2
                        variants={staggerItem}
                        className="font-display text-3xl md:text-4xl tracking-tight mb-6"
                    >
                        Let&apos;s Connect
                    </motion.h2>
                    <motion.p
                        variants={staggerItem}
                        className="text-lg md:text-xl text-muted-foreground mb-10"
                    >
                        I&apos;m open to advisory roles, technical partnerships, and conversations
                        about building impactful products.
                    </motion.p>
                    <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-6">
                        <Link href="mailto:hello@niloy.dev" className="btn-primary">
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <SocialLinks />
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}

function AnimatedMiniStat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1200;
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
        <div ref={ref}>
            <p className="font-display text-3xl tracking-tight text-accent">{isInView ? count : 0}{suffix}</p>
            <p className="eyebrow mt-1">{label}</p>
        </div>
    );
}
