"use client";

import { motion } from "framer-motion";
import { Play, Youtube, Loader2, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    publishedAt: string;
}

function SectionHeading({ noMargin }: { noMargin?: boolean }) {
    return (
        <div className={noMargin ? "" : "mb-10"}>
            <p className="eyebrow mb-4 text-primary">04 — Studio Feed</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">Latest Videos</h2>
        </div>
    );
}

export default function VideoShowcase() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const CHANNEL_ID = "UCwt6QqoIq3CpaI-5dVtQLzg";

    useEffect(() => {
        async function fetchVideos() {
            const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

            if (!API_KEY) {
                setError('Environment Sync Error: NEXT_PUBLIC_YOUTUBE_API_KEY not found.');
                setLoading(false);
                return;
            }

            try {
                const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=3&order=date&type=video&key=${API_KEY}`;

                const response = await fetch(videosUrl);
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error.message);
                }

                if (data.items && data.items.length > 0) {
                    const fetchedVideos = data.items.map((item: { id: { videoId: string }; snippet: { title: string; thumbnails: { high?: { url: string }; medium?: { url: string } }; publishedAt: string } }) => ({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || "",
                        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                        publishedAt: item.snippet.publishedAt,
                    }));
                    setVideos(fetchedVideos);
                } else {
                    setError('No public videos found.');
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'YouTube connection failed.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    if (loading) return (
        <div>
            <SectionHeading />
            <div className="py-16 flex flex-col items-center gap-4 border border-border rounded-md text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="eyebrow">Loading Studio Feed...</span>
            </div>
        </div>
    );

    if (error) {
        return (
            <div>
                <SectionHeading />
                <div className="p-8 rounded-md border border-border text-center space-y-4">
                    <Youtube className="w-6 h-6 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Videos are loading from YouTube. Check out the channel directly for the latest content.
                    </p>
                    <a
                        href="https://youtube.com/@niloythings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                        Visit YouTube Channel <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        );
    }

    return (
        <section className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <SectionHeading noMargin />
                <a
                    href="https://youtube.com/@niloythings"
                    target="_blank"
                    className="eyebrow px-6 py-3 border border-border rounded-sm hover:border-foreground transition-colors whitespace-nowrap"
                >
                    View Full Archive
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {videos.map((video, index) => (
                    <motion.a
                        key={video.id}
                        href={video.videoUrl}
                        target="_blank"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group block space-y-5"
                    >
                        <div className="relative aspect-video rounded-md overflow-hidden border border-border bg-neutral-900 group-hover:border-primary transition-colors duration-500">
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                </div>
                            </div>

                            {/* Duration/Platform Tag */}
                            <div className="absolute top-4 right-4">
                                <Youtube className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-display text-lg leading-tight line-clamp-2 tracking-tight group-hover:text-primary transition-colors">
                                {video.title}
                            </h3>
                            <p className="eyebrow">
                                {new Date(video.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}

