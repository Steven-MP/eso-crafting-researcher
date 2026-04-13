# ESO Crafting Researcher

<p align="center"><img src="public/android-chrome-512x512.png" alt="ESO Crafting Researcher" width="256" /></p>

A browser-based tracker for monitoring trait research progress across all crafting disciplines in *The Elder Scrolls Online*.

## Features

- Track researched traits for all three crafting disciplines: **Clothing**, **Blacksmithing**, and **Woodworking**
- Three-state trait tracking: unchecked, **ready** (in progress), and **done** (researched)
- Per-discipline progress bar with colour-coded segments:
  - <span style="color:#1A7339">**Green**</span> — Researched
  - <span style="color:#0F6FA7">**Blue**</span> — Ready
  - <span style="color:#B91C1C">**Red**</span> — Nirnhoned (not yet researched)
  - <span style="color:#6B7280">**Grey**</span> — Other traits not yet researched
- Progress badge per item showing researched trait count
- Progress persisted to `localStorage` — survives page refreshes with no account required

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Start](https://tanstack.com/start) with file-based routing
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) components
- [Vite](https://vitejs.dev/) bundler
- [Biome](https://biomejs.dev/) for linting and formatting
- [Bun test](https://bun.sh/docs/cli/test) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for tests

## Getting Started

```bash
bun install
bun run dev
```

The app runs at [http://localhost:3003](http://localhost:3003) by default.

## Other Commands

| Command | Description |
|---------|-------------|
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
| `bun run test` | Run tests |
| `bun run test:coverage` | Run tests with coverage |
| `bun run lint` | Lint with Biome |
| `bun run check` | Full Biome check |
