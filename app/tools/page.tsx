"use client";

import { useState } from "react";
import { X, Trash2, FileJson, Link2, Hash, Palette, Clock, Key, Type, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    staggerContainer,
    staggerItem,
    backdropVariants,
    modalVariants,
    sectionViewport,
} from "@/lib/useAnimations";

type ToolType = "cleaner" | "json" | "base64" | "url" | "hash" | "color" | "timestamp" | "uuid" | null;

const tools = [
    { id: "cleaner", title: "Text Sanitizer", description: "Remove whitespace and normalize text", icon: Trash2 },
    { id: "json", title: "JSON Formatter", description: "Validate and beautify JSON", icon: FileJson },
    { id: "base64", title: "Base64 Encoder", description: "Encode and decode Base64", icon: Type },
    { id: "url", title: "URL Encoder", description: "Encode and decode URLs", icon: Link2 },
    { id: "hash", title: "Hash Generator", description: "Generate SHA-256 hashes", icon: Hash },
    { id: "color", title: "Color Converter", description: "Convert HEX to RGB", icon: Palette },
    { id: "timestamp", title: "Timestamp Tool", description: "Convert Unix timestamps", icon: Clock },
    { id: "uuid", title: "UUID Generator", description: "Generate unique IDs", icon: Key },
];

export default function ToolsPage() {
    const [activeTool, setActiveTool] = useState<ToolType>(null);

    return (
        <div className="min-h-screen">
            <div className="container-wide pt-8 pb-16 md:pt-10">
                <motion.div
                    className="max-w-3xl mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.p variants={staggerItem} className="eyebrow mb-6 text-primary">
                        Utilities
                    </motion.p>
                    <motion.h1
                        variants={staggerItem}
                        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6"
                    >
                        Developer Tools
                    </motion.h1>
                    <motion.p
                        variants={staggerItem}
                        className="text-lg md:text-xl text-muted-foreground"
                    >
                        Utilities I use daily. Free and open.
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
                                    <span className="num text-sm text-muted-foreground">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-display text-lg tracking-tight mb-1">{tool.title}</h3>
                                    <p className="text-sm text-muted-foreground">{tool.description}</p>
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
                className="relative w-full max-w-xl border border-border rounded-md bg-card p-8"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="pt-4">
                    {tool === "cleaner" && <TextCleanerTool />}
                    {tool === "json" && <JsonFormatterTool />}
                    {tool === "base64" && <Base64Tool />}
                    {tool === "url" && <UrlEncoderTool />}
                    {tool === "hash" && <HashGeneratorTool />}
                    {tool === "color" && <ColorConverterTool />}
                    {tool === "timestamp" && <TimestampTool />}
                    {tool === "uuid" && <UuidGeneratorTool />}
                </div>
            </motion.div>
        </div>
    );
}

// --- Tool Components ---

function TextCleanerTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const clean = () => setOutput(input.trim().replace(/\s+/g, " "));

    return (
        <ToolWrapper title="Text Sanitizer">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text..." className="input-area" />
            <button onClick={clean} className="btn-primary text-sm py-3 px-5">Clean</button>
            <AnimatePresence>
                {output && <OutputBox value={output} />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

function JsonFormatterTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const format = () => {
        try {
            setOutput(JSON.stringify(JSON.parse(input), null, 2));
            setError("");
        } catch { setError("Invalid JSON"); setOutput(""); }
    };

    return (
        <ToolWrapper title="JSON Formatter">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value"}' className="input-area font-mono" />
            <button onClick={format} className="btn-primary text-sm py-3 px-5">Format</button>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <AnimatePresence>
                {output && <OutputBox value={output} mono />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

function Base64Tool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const encode = () => setOutput(btoa(input));
    const decode = () => { try { setOutput(atob(input)); } catch { setOutput("Invalid Base64"); } };

    return (
        <ToolWrapper title="Base64 Encoder">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="input-area" />
            <div className="flex gap-2">
                <button onClick={encode} className="btn-primary text-sm py-3 px-5">Encode</button>
                <button onClick={decode} className="btn-outline text-sm py-3 px-5">Decode</button>
            </div>
            <AnimatePresence>
                {output && <OutputBox value={output} />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

function UrlEncoderTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const encode = () => setOutput(encodeURIComponent(input));
    const decode = () => { try { setOutput(decodeURIComponent(input)); } catch { setOutput("Invalid URL"); } };

    return (
        <ToolWrapper title="URL Encoder">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter URL..." className="input-field" />
            <div className="flex gap-2">
                <button onClick={encode} className="btn-primary text-sm py-3 px-5">Encode</button>
                <button onClick={decode} className="btn-outline text-sm py-3 px-5">Decode</button>
            </div>
            <AnimatePresence>
                {output && <OutputBox value={output} />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

function HashGeneratorTool() {
    const [input, setInput] = useState("");
    const [hash, setHash] = useState("");

    const generate = async () => {
        const data = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        setHash(Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join(""));
    };

    return (
        <ToolWrapper title="Hash Generator (SHA-256)">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="input-field" />
            <button onClick={generate} className="btn-primary text-sm py-3 px-5">Generate</button>
            <AnimatePresence>
                {hash && <OutputBox value={hash} mono />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

function ColorConverterTool() {
    const [hex, setHex] = useState("#FF3131");
    const [rgb, setRgb] = useState("");

    const convert = () => {
        const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        if (match) setRgb(`rgb(${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)})`);
    };

    return (
        <ToolWrapper title="Color Converter">
            <div className="flex gap-4 items-center">
                <motion.div
                    className="w-12 h-12 rounded-lg border border-border"
                    style={{ backgroundColor: hex }}
                    animate={{ backgroundColor: hex }}
                    transition={{ duration: 0.3 }}
                />
                <input value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#FF3131" className="input-field flex-1" />
            </div>
            <button onClick={convert} className="btn-primary text-sm py-3 px-5">Convert</button>
            <AnimatePresence>
                {rgb && <OutputBox value={rgb} />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

function TimestampTool() {
    const [ts, setTs] = useState("");
    const [date, setDate] = useState("");
    const convert = () => setDate(new Date(parseInt(ts)).toISOString());

    return (
        <ToolWrapper title="Timestamp Tool">
            <input value={ts} onChange={(e) => setTs(e.target.value)} placeholder="Enter Unix timestamp..." className="input-field" />
            <button onClick={convert} className="btn-primary text-sm py-3 px-5">Convert</button>
            <AnimatePresence>
                {date && <OutputBox value={date} />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

function UuidGeneratorTool() {
    const [uuid, setUuid] = useState("");
    const generate = () => setUuid(crypto.randomUUID());

    return (
        <ToolWrapper title="UUID Generator">
            <button onClick={generate} className="btn-primary text-sm py-3 px-5">Generate UUID</button>
            <AnimatePresence>
                {uuid && <OutputBox value={uuid} mono />}
            </AnimatePresence>
        </ToolWrapper>
    );
}

// --- Helpers ---

function ToolWrapper({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h2 className="font-display text-xl tracking-tight">{title}</h2>
            {children}
        </div>
    );
}

function OutputBox({ value, mono }: { value: string; mono?: boolean }) {
    const [copied, setCopied] = useState(false);
    const copy = () => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); };

    return (
        <motion.div
            className="relative p-4 bg-muted rounded-sm"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
        >
            <pre className={`text-sm whitespace-pre-wrap break-all ${mono ? "font-mono" : ""}`}>{value}</pre>
            <motion.button
                onClick={copy}
                className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </motion.button>
        </motion.div>
    );
}
