# Niloy Kumar Sarker | Product Technologist & CTO

![Portfolio Banner](public/og-image.jpg)

> **Engineering at the intersection of product and technology.**
> Building resilient, offline-first mobile systems and scalable digital ventures.

Live Portfolio: **[niloythings.com](https://niloythings.com)** _(Coming Soon)_

---

## Overview

This is the official portfolio website for **Niloy Kumar Sarker**, CTO at Futuredesh Ltd, showcasing real shipped work — Play Store and App Store products, GitHub activity, and career history — alongside a small suite of developer utilities.

## Tech Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/), static export (`output: "export"`)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## Key Features

*   **Editorial design**: A light, Swiss-editorial visual system (Fraunces serif display type, hairline-bordered layouts) rather than a dark/glassmorphism template.
*   **Live data**: GitHub stats and YouTube videos are fetched live from public APIs, not hardcoded.
*   **Dynamic achievements & moments gallery**: drop photos into `public/moments/` and a build-time script (`scripts/generate-moments-manifest.mjs`) regenerates the gallery automatically — no code changes needed.
*   **Developer Toolkit**: Built-in utilities including JSON Formatter, Base64 Encoder, and UUID Generator.
*   **Static export**: Fully static output, deployable to any static host (Cloudflare Pages, Netlify, GitHub Pages, etc.).

## Getting Started

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/neelniloy/niloythings.git
    cd niloythings
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project builds to a fully static `out/` directory (`next build`, via `output: "export"`), so it can be deployed to any static host — no Node.js server required.

## Contact

*   **Email**: [niloy64529@gmail.com](mailto:niloy64529@gmail.com)
*   **LinkedIn**: [linkedin.com/in/niloysarker](https://www.linkedin.com/in/niloysarker/)
*   **GitHub**: [@neelniloy](https://github.com/neelniloy)

---

© 2026 Niloy Kumar Sarker. All Rights Reserved.
