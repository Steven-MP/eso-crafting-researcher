# ESO Crafting Researcher

![ESO Crafting Researcher](public/android-chrome-512x512.png)

A browser-based tracker for monitoring trait research progress across all crafting disciplines in *The Elder Scrolls Online*.

## Features

- Track researched traits for all three crafting disciplines: **Clothing**, **Blacksmithing**, and **Woodworking**
- Three-state trait tracking: unchecked, **ready** (in progress), and **done** (researched)
- Per-discipline progress bar with colour-coded segments:
  - Green — researched
  - Blue — ready
  - Red — Nirnhoned (not yet researched)
  - Grey — other traits not yet researched
- Progress badge per item showing researched trait count
- Progress persisted to `localStorage` — survives page refreshes with no account required

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Start](https://tanstack.com/start) with file-based routing
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) components
- [Vite](https://vitejs.dev/) bundler
- [Biome](https://biomejs.dev/) for linting and formatting

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
| `bun run lint` | Lint with Biome |
| `bun run check` | Full Biome check |
