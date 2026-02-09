import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Niloy Kumar Sarker",
    description: "Learn more about Niloy Kumar Sarker, a mobile and full-stack engineer specializing in offline-first architecture.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
