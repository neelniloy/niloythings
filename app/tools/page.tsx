"use client";

import { useState, useEffect, useMemo } from "react";
import {
    X,
    FileJson,
    ShieldCheck,
    Regex,
    Key,
    Clock,
    Globe,
    Binary,
    Hash,
    Copy,
    Check,
    RefreshCw,
    AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    staggerContainer,
    staggerItem,
    backdropVariants,
    modalVariants,
    sectionViewport,
} from "@/lib/useAnimations";

type ToolType = "json" | "jwt" | "regex" | "uuid" | "timestamp" | "url" | "base64" | "hash" | null;

const tools = [
    {
        id: "json",
        title: "JSON Formatter",
        description: "Beautify, minify, and validate JSON payloads with syntax checking",
        icon: FileJson,
    },
    {
        id: "jwt",
        title: "JWT Decoder",
        description: "Decode headers, claims, and human-readable expiration timestamps",
        icon: ShieldCheck,
    },
    {
        id: "regex",
        title: "Regex Tester",
        description: "Test regular expressions with flags and live match group previews",
        icon: Regex,
    },
    {
        id: "uuid",
        title: "UUID Generator",
        description: "Generate single or bulk cryptographically secure v4 UUIDs",
        icon: Key,
    },
    {
        id: "timestamp",
        title: "Timestamp Converter",
        description: "Convert Unix Epoch seconds/ms to UTC, local dates, and back",
        icon: Clock,
    },
    {
        id: "url",
        title: "URL & Query Parser",
        description: "Parse URLs, inspect query parameters in a table, and encode/decode",
        icon: Globe,
    },
    {
        id: "base64",
        title: "Base64 & DataURI",
        description: "Encode/decode text strings and live-preview Base64 data images",
        icon: Binary,
    },
    {
        id: "hash",
        title: "Hash Generator",
        description: "Compute SHA-256, SHA-512, and SHA-1 cryptographic hashes",
        icon: Hash,
    },
];

export default function ToolsPage() {
    const [activeTool, setActiveTool] = useState<ToolType>(null);

    return (
        <div className="min-h-screen">
            <div className="container-wide pt-8 pb-16 md:pt-10">
                <motion.div
                    className="max-w-3xl mb-14"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.p variants={staggerItem} className="eyebrow mb-4 text-primary">
                        Utilities
                    </motion.p>
                    <motion.h1
                        variants={staggerItem}
                        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4"
                    >
                        Developer Tools
                    </motion.h1>
                    <motion.p
                        variants={staggerItem}
                        className="text-lg md:text-xl text-muted-foreground"
                    >
                        Essential utilities for mobile, API, and full-stack development. Private, client-side, and free.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="border-t border-l border-border grid sm:grid-cols-2 lg:grid-cols-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={staggerContainer}
                >
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                            <motion.button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id as ToolType)}
                                className="group text-left p-8 border-r border-b border-border transition-colors hover:bg-muted/40 flex flex-col gap-6"
                                variants={staggerItem}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="num text-xs text-muted-foreground font-mono">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="w-8 h-8 rounded-sm bg-muted/60 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-display text-lg tracking-tight mb-1 group-hover:text-primary transition-colors">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tool.description}
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            {/* Tool Modal */}
            <AnimatePresence>
                {activeTool && (
                    <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

function ToolModal({ tool, onClose }: { tool: ToolType; onClose: () => void }) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                className="absolute inset-0 bg-background/95 backdrop-blur-sm"
                onClick={onClose}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            />
            <motion.div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border rounded-md bg-card p-6 sm:p-8"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors z-10"
                    aria-label="Close modal"
                >
                    <X className="w-4 h-4" />
                </button>
                <div>
                    {tool === "json" && <JsonFormatterTool />}
                    {tool === "jwt" && <JwtDecoderTool />}
                    {tool === "regex" && <RegexTesterTool />}
                    {tool === "uuid" && <UuidGeneratorTool />}
                    {tool === "timestamp" && <TimestampTool />}
                    {tool === "url" && <UrlParserTool />}
                    {tool === "base64" && <Base64Tool />}
                    {tool === "hash" && <HashGeneratorTool />}
                </div>
            </motion.div>
        </div>
    );
}

// ── 1. JSON Formatter & Minifier ──────────────────

function JsonFormatterTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const format = (indent = 2) => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Invalid JSON");
            setOutput("");
        }
    };

    const minify = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Invalid JSON");
            setOutput("");
        }
    };

    return (
        <ToolWrapper title="JSON Formatter & Minifier">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste raw JSON here: {"user": "Niloy", "role": "Lead Engineer"}'
                rows={6}
                className="w-full p-3 font-mono text-xs bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
            />
            <div className="flex flex-wrap gap-2">
                <button onClick={() => format(2)} className="btn-primary text-xs py-2 px-4">
                    Beautify (2 Spaces)
                </button>
                <button onClick={minify} className="btn-outline text-xs py-2 px-4">
                    Minify
                </button>
                <button onClick={() => { setInput(""); setOutput(""); setError(null); }} className="text-xs text-muted-foreground hover:text-foreground px-3 py-2">
                    Clear
                </button>
            </div>
            {error && (
                <div className="flex items-center gap-2 p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-600 rounded-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            <AnimatePresence>
                {output && <OutputBox value={output} mono />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

// ── 2. JWT Decoder ─────────────────────────────────

function JwtDecoderTool() {
    const [jwt, setJwt] = useState("");
    const [header, setHeader] = useState<string | null>(null);
    const [payload, setPayload] = useState<string | null>(null);
    const [expInfo, setExpInfo] = useState<{ date: string; expired: boolean } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const decodeJwt = () => {
        if (!jwt.trim()) return;
        try {
            const parts = jwt.trim().split(".");
            if (parts.length < 2) {
                throw new Error("Invalid JWT: Must have at least header and payload segments.");
            }
            const b64Decode = (str: string) => {
                const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
                return decodeURIComponent(
                    atob(base64)
                        .split("")
                        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                        .join("")
                );
            };

            const headerObj = JSON.parse(b64Decode(parts[0]));
            const payloadObj = JSON.parse(b64Decode(parts[1]));

            setHeader(JSON.stringify(headerObj, null, 2));
            setPayload(JSON.stringify(payloadObj, null, 2));

            if (payloadObj.exp) {
                const expDate = new Date(payloadObj.exp * 1000);
                const expired = expDate.getTime() < Date.now();
                setExpInfo({
                    date: expDate.toLocaleString(),
                    expired,
                });
            } else {
                setExpInfo(null);
            }
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to decode JWT token.");
            setHeader(null);
            setPayload(null);
            setExpInfo(null);
        }
    };

    return (
        <ToolWrapper title="JWT Token Inspector">
            <p className="text-xs text-muted-foreground">Decodes JSON Web Tokens completely client-side in your browser.</p>
            <textarea
                value={jwt}
                onChange={(e) => setJwt(e.target.value)}
                placeholder="Paste encoded JWT here (eyJhbGciOi...)"
                rows={4}
                className="w-full p-3 font-mono text-xs bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
            />
            <div className="flex gap-2">
                <button onClick={decodeJwt} className="btn-primary text-xs py-2 px-4">
                    Decode Token
                </button>
                <button onClick={() => { setJwt(""); setHeader(null); setPayload(null); setExpInfo(null); setError(null); }} className="text-xs text-muted-foreground hover:text-foreground px-3 py-2">
                    Clear
                </button>
            </div>
            {error && (
                <div className="flex items-center gap-2 p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-600 rounded-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            {expInfo && (
                <div className={`p-3 text-xs rounded-sm border flex items-center justify-between ${
                    expInfo.expired
                        ? "bg-red-500/10 border-red-500/30 text-red-600"
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
                }`}>
                    <span>Expiration: <strong>{expInfo.date}</strong></span>
                    <span className="font-mono uppercase font-bold text-[10px]">
                        {expInfo.expired ? "EXPIRED" : "ACTIVE"}
                    </span>
                </div>
            )}
            {header && (
                <div className="space-y-1">
                    <span className="eyebrow text-muted-foreground text-[10px]">Header</span>
                    <OutputBox value={header} mono />
                </div>
            )}
            {payload && (
                <div className="space-y-1">
                    <span className="eyebrow text-muted-foreground text-[10px]">Payload Claims</span>
                    <OutputBox value={payload} mono />
                </div>
            )}
        </ToolWrapper>
    );
}

// ── 3. Regex Tester ────────────────────────────────

function RegexTesterTool() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState("g");
    const [testStr, setTestStr] = useState("");

    const { matches, error } = useMemo(() => {
        if (!pattern) return { matches: [], error: null };
        try {
            const re = new RegExp(pattern, flags);
            const found = testStr.match(re);
            return { matches: found ? Array.from(found) : [], error: null };
        } catch (err: unknown) {
            return { matches: [], error: err instanceof Error ? err.message : "Invalid Regular Expression" };
        }
    }, [pattern, flags, testStr]);

    return (
        <ToolWrapper title="Regex Tester & Matcher">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-muted-foreground font-mono text-sm">/</span>
                    <input
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value)}
                        placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        className="w-full pl-6 pr-3 py-2 text-xs font-mono bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
                    />
                </div>
                <div className="w-20 relative">
                    <span className="absolute left-2.5 top-2.5 text-muted-foreground font-mono text-xs">/</span>
                    <input
                        value={flags}
                        onChange={(e) => setFlags(e.target.value)}
                        placeholder="flags"
                        className="w-full pl-5 pr-2 py-2 text-xs font-mono bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
                    />
                </div>
            </div>
            <textarea
                value={testStr}
                onChange={(e) => setTestStr(e.target.value)}
                placeholder="Enter sample test string here to match against..."
                rows={4}
                className="w-full p-3 font-mono text-xs bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
            />
            {error && (
                <div className="flex items-center gap-2 p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-600 rounded-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            {pattern && !error && (
                <div className="p-3 bg-muted/40 border border-border rounded-sm text-xs space-y-2">
                    <div className="flex items-center justify-between text-muted-foreground font-mono">
                        <span>Matches: {matches.length}</span>
                        {matches.length > 0 && <span className="text-emerald-600 font-bold">MATCH FOUND</span>}
                    </div>
                    {matches.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pt-1">
                            {matches.map((m, idx) => (
                                <span key={idx} className="px-2 py-1 bg-background border border-border rounded-sm font-mono text-foreground font-semibold">
                                    {m}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </ToolWrapper>
    );
}

// ── 4. UUID Generator ──────────────────────────────

function UuidGeneratorTool() {
    const [count, setCount] = useState(1);
    const [uppercase, setUppercase] = useState(false);
    const [regenerateKey, setRegenerateKey] = useState(0);

    const uuids = useMemo(() => {
        const list: string[] = [];
        for (let i = 0; i < count; i++) {
            let id = crypto.randomUUID();
            if (uppercase) id = id.toUpperCase();
            list.push(id);
        }
        return list;
    }, [count, uppercase, regenerateKey]);

    return (
        <ToolWrapper title="v4 UUID Generator">
            <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-muted/30 border border-border rounded-sm">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">Count:</span>
                    {[1, 5, 10].map((num) => (
                        <button
                            key={num}
                            onClick={() => setCount(num)}
                            className={`px-3 py-1 text-xs font-mono rounded-sm transition-colors ${
                                count === num
                                    ? "bg-foreground text-background font-bold"
                                    : "bg-muted border border-border text-foreground hover:border-foreground"
                            }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={uppercase}
                        onChange={(e) => setUppercase(e.target.checked)}
                        className="rounded-sm"
                    />
                    <span>Uppercase</span>
                </label>
            </div>
            <button
                onClick={() => setRegenerateKey((k) => k + 1)}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-2"
            >
                <RefreshCw className="w-3.5 h-3.5" /> Generate New
            </button>
            <OutputBox value={uuids.join("\n")} mono />
        </ToolWrapper>
    );
}

// ── 5. Timestamp Converter ─────────────────────────

function TimestampTool() {
    const [currentEpoch, setCurrentEpoch] = useState(() => Math.floor(Date.now() / 1000));
    const [inputTs, setInputTs] = useState(() => String(Math.floor(Date.now() / 1000)));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentEpoch(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const humanResult = useMemo(() => {
        let num = parseInt(inputTs.trim(), 10);
        if (isNaN(num)) return null;
        if (String(num).length <= 10) num *= 1000;
        const d = new Date(num);
        if (isNaN(d.getTime())) return null;
        return {
            local: d.toLocaleString(),
            utc: d.toUTCString(),
            rel: d.toISOString(),
        };
    }, [inputTs]);

    return (
        <ToolWrapper title="Unix Timestamp Converter">
            <div className="p-3 bg-muted/40 border border-border rounded-sm flex items-center justify-between">
                <div>
                    <span className="eyebrow text-[10px] text-muted-foreground block">Current Epoch Time</span>
                    <span className="font-mono text-xl font-bold text-foreground">{currentEpoch}</span>
                </div>
                <button
                    onClick={() => setInputTs(String(currentEpoch))}
                    className="text-xs font-mono text-primary hover:underline"
                >
                    Paste Current
                </button>
            </div>
            <div>
                <label className="eyebrow text-[10px] text-muted-foreground block mb-1">Enter Timestamp (Seconds or ms)</label>
                <input
                    value={inputTs}
                    onChange={(e) => setInputTs(e.target.value)}
                    placeholder="1726056000"
                    className="w-full p-2.5 font-mono text-xs bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
                />
            </div>
            {humanResult && (
                <div className="space-y-2 p-3 bg-muted/20 border border-border rounded-sm text-xs font-mono">
                    <div>
                        <span className="text-muted-foreground block text-[10px] eyebrow">Local Time:</span>
                        <span className="text-foreground font-semibold">{humanResult.local}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[10px] eyebrow">UTC Time:</span>
                        <span className="text-foreground font-semibold">{humanResult.utc}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[10px] eyebrow">ISO 8601:</span>
                        <span className="text-foreground">{humanResult.rel}</span>
                    </div>
                </div>
            )}
        </ToolWrapper>
    );
}

// ── 6. URL & Query Parser ──────────────────────────

function UrlParserTool() {
    const [rawUrl, setRawUrl] = useState("");
    const [encodedDecoded, setEncodedDecoded] = useState<string | null>(null);

    const parsed = useMemo(() => {
        if (!rawUrl.trim()) return null;
        try {
            const urlObj = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
            const params: [string, string][] = [];
            urlObj.searchParams.forEach((val, key) => {
                params.push([key, val]);
            });
            return {
                protocol: urlObj.protocol,
                host: urlObj.host,
                pathname: urlObj.pathname,
                params,
            };
        } catch {
            return null;
        }
    }, [rawUrl]);

    return (
        <ToolWrapper title="URL & Query String Parser">
            <textarea
                value={rawUrl}
                onChange={(e) => setRawUrl(e.target.value)}
                placeholder="https://example.com/api/v1/search?query=mobile+app&category=flutter&page=1"
                rows={3}
                className="w-full p-2.5 font-mono text-xs bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
            />
            <div className="flex gap-2">
                <button onClick={() => setEncodedDecoded(encodeURIComponent(rawUrl))} className="btn-primary text-xs py-2 px-3">
                    Encode URL
                </button>
                <button onClick={() => { try { setEncodedDecoded(decodeURIComponent(rawUrl)); } catch { setEncodedDecoded("Invalid encoded URL"); } }} className="btn-outline text-xs py-2 px-3">
                    Decode URL
                </button>
            </div>
            {encodedDecoded && <OutputBox value={encodedDecoded} mono />}
            {parsed && (
                <div className="space-y-3 pt-2 text-xs font-mono">
                    <div className="grid grid-cols-2 gap-2 p-3 bg-muted/30 border border-border rounded-sm">
                        <div>
                            <span className="text-[10px] eyebrow text-muted-foreground block">Host</span>
                            <span className="text-foreground font-semibold">{parsed.host}</span>
                        </div>
                        <div>
                            <span className="text-[10px] eyebrow text-muted-foreground block">Path</span>
                            <span className="text-foreground font-semibold">{parsed.pathname}</span>
                        </div>
                    </div>
                    {parsed.params.length > 0 && (
                        <div>
                            <span className="text-[10px] eyebrow text-muted-foreground block mb-2">Query Parameters ({parsed.params.length})</span>
                            <div className="border border-border rounded-sm divide-y divide-border overflow-hidden bg-card">
                                {parsed.params.map(([k, v], idx) => (
                                    <div key={idx} className="flex justify-between p-2.5 text-xs">
                                        <span className="text-primary font-bold">{k}</span>
                                        <span className="text-muted-foreground break-all text-right ml-4">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </ToolWrapper>
    );
}

// ── 7. Base64 & DataURI Tool ───────────────────────

function Base64Tool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const encode = () => {
        try {
            setOutput(btoa(unescape(encodeURIComponent(input))));
        } catch {
            setOutput("Error encoding text to Base64");
        }
    };

    const decode = () => {
        try {
            const dec = decodeURIComponent(escape(atob(input.trim())));
            setOutput(dec);
        } catch {
            setOutput("Invalid Base64 string");
        }
    };

    const isImage = input.startsWith("data:image/") || output.startsWith("data:image/");

    return (
        <ToolWrapper title="Base64 & DataURI Tool">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste plain text to encode, or base64 string/data:image to decode..."
                rows={5}
                className="w-full p-3 font-mono text-xs bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
            />
            <div className="flex gap-2">
                <button onClick={encode} className="btn-primary text-xs py-2 px-4">
                    Encode to Base64
                </button>
                <button onClick={decode} className="btn-outline text-xs py-2 px-4">
                    Decode from Base64
                </button>
            </div>
            {isImage && (
                <div className="p-3 border border-border rounded-sm bg-muted/30 text-center">
                    <span className="eyebrow text-[10px] text-muted-foreground block mb-2">Image Preview</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={input.startsWith("data:") ? input : `data:image/png;base64,${input}`} alt="Base64 Preview" className="max-h-40 mx-auto rounded-sm object-contain" />
                </div>
            )}
            <AnimatePresence>
                {output && <OutputBox value={output} mono />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

// ── 8. Cryptographic Hash Generator ───────────────

function HashGeneratorTool() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<{ sha256: string; sha512: string; sha1: string } | null>(null);

    const computeHashes = async (text: string) => {
        if (!text) {
            setHashes(null);
            return;
        }
        const enc = new TextEncoder();
        const data = enc.encode(text);

        const buf256 = await crypto.subtle.digest("SHA-256", data);
        const s256 = Array.from(new Uint8Array(buf256)).map((b) => b.toString(16).padStart(2, "0")).join("");

        const buf512 = await crypto.subtle.digest("SHA-512", data);
        const s512 = Array.from(new Uint8Array(buf512)).map((b) => b.toString(16).padStart(2, "0")).join("");

        const buf1 = await crypto.subtle.digest("SHA-1", data);
        const s1 = Array.from(new Uint8Array(buf1)).map((b) => b.toString(16).padStart(2, "0")).join("");

        setHashes({ sha256: s256, sha512: s512, sha1: s1 });
    };

    return (
        <ToolWrapper title="Cryptographic Hash Generator">
            <textarea
                value={input}
                onChange={(e) => {
                    const val = e.target.value;
                    setInput(val);
                    computeHashes(val);
                }}
                placeholder="Type or paste plain text to compute SHA-256, SHA-512, and SHA-1 hashes..."
                rows={3}
                className="w-full p-3 font-mono text-xs bg-muted/50 border border-border rounded-sm focus:outline-none focus:border-foreground"
            />
            {hashes && (
                <div className="space-y-3 pt-2">
                    <div>
                        <span className="text-[10px] eyebrow text-muted-foreground block mb-1">SHA-256</span>
                        <OutputBox value={hashes.sha256} mono />
                    </div>
                    <div>
                        <span className="text-[10px] eyebrow text-muted-foreground block mb-1">SHA-1</span>
                        <OutputBox value={hashes.sha1} mono />
                    </div>
                    <div>
                        <span className="text-[10px] eyebrow text-muted-foreground block mb-1">SHA-512</span>
                        <OutputBox value={hashes.sha512} mono />
                    </div>
                </div>
            )}
        </ToolWrapper>
    );
}

// ── Helpers ─────────────────────────────────────────

function ToolWrapper({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight">{title}</h2>
            {children}
        </div>
    );
}

function OutputBox({ value, mono }: { value: string; mono?: boolean }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <motion.div
            className="relative p-3.5 bg-muted/50 border border-border rounded-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
        >
            <pre className={`text-xs whitespace-pre-wrap break-all ${mono ? "font-mono" : ""}`}>{value}</pre>
            <button
                onClick={copy}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-sm bg-background/80 border border-border hover:border-foreground text-muted-foreground hover:text-foreground transition-all"
                title="Copy to clipboard"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
        </motion.div>
    );
}
