import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Work | Niloy Kumar Sarker",
    description: "A comprehensive view of my professional journey—from products I've built to companies I've scaled.",
};

export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
