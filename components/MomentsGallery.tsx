"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const moments = [
    {
        src: "/gallery/award.jpg",
        caption: "AgriTech Innovation Award",
        category: "Recognition",
        span: "md:col-span-2 md:row-span-2"
    },
    {
        src: "/gallery/talk.jpg",
        caption: "Technical Keynote @ DevCon",
        category: "Public Speaking",
        span: "md:col-span-1 md:row-span-1"
    },
    {
        src: "/gallery/hackathon.jpg",
        caption: "Jury Panel @ HackNSU",
        category: "Mentorship",
        span: "md:col-span-1 md:row-span-1"
    }
];

export default function MomentsGallery() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[600px] w-full">
            {moments.map((m, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className={`relative group rounded-md overflow-hidden border border-border bg-neutral-900 ${m.span}`}
                >
                    <Image
                        src={m.src}
                        alt={m.caption}
                        fill
                        className="object-cover grayscale-[40%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="eyebrow text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {m.category}
                        </span>
                        <p className="font-display text-xl text-white tracking-tight leading-tight">
                            {m.caption}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
