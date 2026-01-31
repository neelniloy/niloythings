"use client";

import { motion } from "framer-motion";
import { Play, Youtube, Loader2, AlertCircle, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    publishedAt: string;
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
        <div className="py-20 flex flex-col items-center gap-4 text-muted animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest">Hydrating Studio Feed...</span>
        </div>
    );

    if (error) {
        return (
            <div className="p-10 rounded-[2.5rem] glass border border-primary/20 space-y-4">
                <h3 className="font-black text-primary flex items-center gap-3 uppercase tracking-tighter text-2xl">
                    <AlertCircle className="w-6 h-6" /> Feed Restricted
                </h3>
                <p className="text-muted leading-relaxed max-w-lg">{error}</p>
                <a href="https://youtube.com/@niloythings" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b border-primary/40 pb-1">Visit Channel Manually <ArrowUpRight className="w-3 h-3" /></a>
            </div>
        );
    }

    return (
        <section className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tighter">Studio Feed.</h2>
                    <p className="text-muted tracking-[0.4em] uppercase text-[10px] font-bold">Latest via @niloythings</p>
                </div>
                <a
                    href="https://youtube.com/@niloythings"
                    target="_blank"
                    className="text-[10px] font-black uppercase tracking-widest px-8 py-4 glass border border-white/10 rounded-full hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20"
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
                        className="group block space-y-6"
                    >
                        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/5 bg-neutral-900 group-hover:border-primary/30 transition-all duration-500 shadow-2xl">
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(255,49,49,0.5)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                                </div>
                            </div>

                            {/* Duration/Platform Tag */}
                            <div className="absolute top-4 right-4">
                                <Youtube className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2 px-2">
                            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors text-white/90">
                                {video.title}
                            </h3>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
                                {new Date(video.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}

