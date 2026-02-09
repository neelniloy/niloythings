import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dev Tools | Niloy Kumar Sarker",
    description: "Essential utilities to streamline your development workflow. Fast, reliable, and built for productivity.",
};

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
