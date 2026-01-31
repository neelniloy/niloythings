"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2, FileJson, Copy, Check, X,
    Hash, Link2, Palette, Clock, Key, Type
} from "lucide-react";

type ToolType = "cleaner" | "json" | "base64" | "url" | "hash" | "color" | "timestamp" | "uuid" | null;

export default function ToolsPage() {
    const [activeTool, setActiveTool] = useState<ToolType>(null);

    const tools = [
        {
            id: "cleaner",
            title: "Text Sanitizer",
            description: "Remove whitespace and normalize text formatting.",
            icon: <Trash2 className="w-5 h-5" />,
            color: "from-red-500/20 to-pink-500/20",
        },
        {
            id: "json",
            title: "JSON Formatter",
            description: "Validate and beautify JSON data structures.",
            icon: <FileJson className="w-5 h-5" />,
            color: "from-blue-500/20 to-cyan-500/20",
        },
        {
            id: "base64",
            title: "Base64 Encoder",
            description: "Encode and decode Base64 strings safely.",
            icon: <Type className="w-5 h-5" />,
            color: "from-purple-500/20 to-indigo-500/20",
        },
        {
            id: "url",
            title: "URL Encoder",
            description: "Encode and decode URLs for web applications.",
            icon: <Link2 className="w-5 h-5" />,
            color: "from-green-500/20 to-emerald-500/20",
        },
        {
            id: "hash",
            title: "Hash Generator",
            description: "Generate SHA-256 and SHA-512 hashes.",
            icon: <Hash className="w-5 h-5" />,
            color: "from-yellow-500/20 to-orange-500/20",
        },
        {
            id: "color",
            title: "Color Converter",
            description: "Convert between HEX, RGB, and HSL formats.",
            icon: <Palette className="w-5 h-5" />,
            color: "from-pink-500/20 to-rose-500/20",
        },
        {
            id: "timestamp",
            title: "Timestamp Tool",
            description: "Convert Unix timestamps to readable dates.",
            icon: <Clock className="w-5 h-5" />,
            color: "from-cyan-500/20 to-blue-500/20",
        },
        {
            id: "uuid",
            title: "UUID Generator",
            description: "Generate unique identifiers for your apps.",
            icon: <Key className="w-5 h-5" />,
            color: "from-orange-500/20 to-red-500/20",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen"
        >
            <div className="container-constrained py-12 md:py-20 space-y-12">
                {/* Header */}
                <div className="max-w-3xl space-y-6 mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        Developer Tools
                    </h1>
                    <p className="text-muted text-lg md:text-xl leading-relaxed">
                        Essential utilities to streamline your development workflow. Fast, reliable, and built for productivity.
                    </p>
                </div>

                {/* Tool Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id as ToolType)}
                            className={`group text-left p-6 rounded-2xl bg-gradient-to-br ${tool.color} border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/90 group-hover:scale-110 group-hover:bg-white/20 transition-all">
                                    {tool.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-base md:text-lg font-bold">{tool.title}</h3>
                                    <p className="text-sm text-muted/90 leading-relaxed line-clamp-2">
                                        {tool.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tool Modal */}
            {activeTool && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"
                        onClick={() => setActiveTool(null)}
                    />

                    <div
                        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-card rounded-3xl p-6 md:p-10 animate-slide-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setActiveTool(null)}
                            className="absolute top-4 right-4 p-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-all z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="space-y-6">
                            {activeTool === "cleaner" && <TextCleaner />}
                            {activeTool === "json" && <JsonFormatter />}
                            {activeTool === "base64" && <Base64Tool />}
                            {activeTool === "url" && <UrlEncoderTool />}
                            {activeTool === "hash" && <HashGeneratorTool />}
                            {activeTool === "color" && <ColorConverterTool />}
                            {activeTool === "timestamp" && <TimestampTool />}
                            {activeTool === "uuid" && <UuidGeneratorTool />}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// Tool Components (Refined)
function TextCleaner() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const cleanText = () => {
        const cleaned = text.replace(/\s+/g, " ").trim();
        setText(cleaned);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">Text Sanitizer</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
                className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-5 text-sm md:text-base focus:outline-none focus:border-primary/50 transition-all resize-none font-mono placeholder:text-muted/40"
            />
            <div className="flex gap-3">
                <button
                    onClick={cleanText}
                    className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
                >
                    Clean Text
                </button>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-2.5 glass border border-white/10 text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
        </div>
    );
}

function JsonFormatter() {
    const [json, setJson] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            const parsed = JSON.parse(json);
            setJson(JSON.stringify(parsed, null, 2));
            setError("");
        } catch (e) {
            setError("Invalid JSON syntax");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">JSON Formatter</h2>
            <div className="space-y-3">
                <textarea
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                    placeholder='{"key": "value"}'
                    className={`w-full h-48 bg-black/40 border ${error ? "border-red-500/50" : "border-white/10"} rounded-xl p-5 text-sm md:text-base focus:outline-none focus:border-primary/50 transition-all resize-none font-mono placeholder:text-muted/40`}
                />
                {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                        <X className="w-4 h-4" /> {error}
                    </div>
                )}
            </div>
            <div className="flex gap-3">
                <button
                    onClick={formatJson}
                    className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
                >
                    Format
                </button>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-2.5 glass border border-white/10 text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
        </div>
    );
}

function Base64Tool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const process = () => {
        try {
            if (mode === "encode") {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (e) {
            setOutput("Error: Invalid input");
        }
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">Base64 Encoder/Decoder</h2>
            <div className="flex gap-3">
                <button
                    onClick={() => setMode("encode")}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${mode === "encode" ? "bg-primary text-white" : "glass border border-white/10"
                        }`}
                >
                    Encode
                </button>
                <button
                    onClick={() => setMode("decode")}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${mode === "decode" ? "bg-primary text-white" : "glass border border-white/10"
                        }`}
                >
                    Decode
                </button>
            </div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-5 text-sm md:text-base focus:outline-none focus:border-primary/50 transition-all resize-none font-mono placeholder:text-muted/40"
            />
            <button
                onClick={process}
                className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
            >
                {mode === "encode" ? "Encode" : "Decode"}
            </button>
            {output && (
                <div className="p-5 bg-black/40 border border-white/10 rounded-xl">
                    <p className="text-sm font-mono break-all">{output}</p>
                </div>
            )}
        </div>
    );
}

function UrlEncoderTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const process = () => {
        try {
            if (mode === "encode") {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (e) {
            setOutput("Error: Invalid input");
        }
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">URL Encoder/Decoder</h2>
            <div className="flex gap-3">
                <button
                    onClick={() => setMode("encode")}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${mode === "encode" ? "bg-primary text-white" : "glass border border-white/10"
                        }`}
                >
                    Encode
                </button>
                <button
                    onClick={() => setMode("decode")}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${mode === "decode" ? "bg-primary text-white" : "glass border border-white/10"
                        }`}
                >
                    Decode
                </button>
            </div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter URL to encode..." : "Enter encoded URL to decode..."}
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-5 text-sm md:text-base focus:outline-none focus:border-primary/50 transition-all resize-none font-mono placeholder:text-muted/40"
            />
            <button
                onClick={process}
                className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
            >
                {mode === "encode" ? "Encode" : "Decode"}
            </button>
            {output && (
                <div className="p-5 bg-black/40 border border-white/10 rounded-xl">
                    <p className="text-sm font-mono break-all">{output}</p>
                </div>
            )}
        </div>
    );
}

function HashGeneratorTool() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<Record<string, string>>({});

    const generateHashes = async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const results: Record<string, string> = {};

        const sha256 = await crypto.subtle.digest("SHA-256", data);
        results["SHA-256"] = Array.from(new Uint8Array(sha256))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

        const sha512 = await crypto.subtle.digest("SHA-512", data);
        results["SHA-512"] = Array.from(new Uint8Array(sha512))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

        setHashes(results);
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">Hash Generator</h2>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-5 text-sm md:text-base focus:outline-none focus:border-primary/50 transition-all resize-none font-mono placeholder:text-muted/40"
            />
            <button
                onClick={generateHashes}
                className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
            >
                Generate Hashes
            </button>
            {Object.keys(hashes).length > 0 && (
                <div className="space-y-3">
                    {Object.entries(hashes).map(([algo, hash]) => (
                        <div key={algo} className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{algo}</p>
                            <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
                                <p className="text-sm font-mono break-all">{hash}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ColorConverterTool() {
    const [hex, setHex] = useState("#6366f1");
    const [rgb, setRgb] = useState("");
    const [hsl, setHsl] = useState("");

    const convertColor = () => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        setRgb(`rgb(${r}, ${g}, ${b})`);

        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
                case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
                case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
            }
        }

        setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">Color Converter</h2>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl border border-white/10" style={{ backgroundColor: hex }} />
                <input
                    type="text"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    className="flex-1 px-5 py-3 bg-black/40 border border-white/10 rounded-xl text-base font-mono focus:outline-none focus:border-primary/50 transition-all"
                    placeholder="#6366f1"
                />
            </div>
            <button
                onClick={convertColor}
                className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
            >
                Convert
            </button>
            {rgb && (
                <div className="space-y-3">
                    <div className="p-4 bg-black/40 border border-white/10 rounded-lg space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">RGB</p>
                        <p className="text-base font-mono">{rgb}</p>
                    </div>
                    <div className="p-4 bg-black/40 border border-white/10 rounded-lg space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">HSL</p>
                        <p className="text-base font-mono">{hsl}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function TimestampTool() {
    const [timestamp, setTimestamp] = useState(Date.now());
    const [date, setDate] = useState(new Date().toISOString());

    const convertToDate = () => {
        setDate(new Date(timestamp).toISOString());
    };

    const convertToTimestamp = () => {
        setTimestamp(new Date(date).getTime());
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">Timestamp Converter</h2>
            <div className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Unix Timestamp (ms)</p>
                    <input
                        type="number"
                        value={timestamp}
                        onChange={(e) => setTimestamp(Number(e.target.value))}
                        className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-xl text-base font-mono focus:outline-none focus:border-primary/50 transition-all"
                    />
                    <button
                        onClick={convertToDate}
                        className="mt-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
                    >
                        Convert to Date
                    </button>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">ISO Date</p>
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-xl text-base font-mono focus:outline-none focus:border-primary/50 transition-all"
                    />
                    <button
                        onClick={convertToTimestamp}
                        className="mt-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
                    >
                        Convert to Timestamp
                    </button>
                </div>
            </div>
        </div>
    );
}

function UuidGeneratorTool() {
    const [uuid, setUuid] = useState("");
    const [copied, setCopied] = useState(false);

    const generateUuid = () => {
        setUuid(crypto.randomUUID());
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">UUID Generator</h2>
            <button
                onClick={generateUuid}
                className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-105 transition-all"
            >
                Generate UUID
            </button>
            {uuid && (
                <div className="space-y-3">
                    <div className="p-5 bg-black/40 border border-white/10 rounded-xl">
                        <p className="text-base font-mono break-all">{uuid}</p>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-6 py-2.5 glass border border-white/10 text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            )}
        </div>
    );
}
