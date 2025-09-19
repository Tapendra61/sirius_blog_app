# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository status (as of creation):
- No source files or manifests were found. The only tracked file is .gitignore.
- .gitignore patterns indicate an intended JavaScript/TypeScript stack (Node.js tooling) with possible front-end frameworks (e.g., Next.js, Vite, Nuxt, SvelteKit) based on ignored directories like .next, dist, .svelte-kit, and caches.

Commands
- Build: Not defined yet (no package manager manifest detected).
- Lint: Not defined yet.
- Tests: Not defined yet.
- Run a single test: Not defined yet.

Update these once the project structure is added:
- If a package.json is added, prefer the scripts defined there. Common examples to look for (do not assume they exist until present):
  - List available scripts: npm run or pnpm run or yarn run
  - Build: npm run build (or pnpm/yarn equivalent)
  - Lint: npm run lint (or pnpm/yarn equivalent)
  - Test (all): npm test
  - Test (single file): npm test -- path/to/testfile
  - Test (by name, Jest): npm test -- -t "test name pattern"
- If a framework-specific CLI is used (e.g., next, vite, nuxt), the scripts will typically wrap those commands.

High-level architecture and structure
- No application code is present, so architecture cannot be described yet.
- Once code is added, summarize at a high level:
  - Primary application entry points (e.g., src/index.tsx, app/page.tsx for Next.js, src/main.ts for Vite, server entry if full-stack).
  - Build system and config (e.g., tsconfig.json, vite.config.ts, next.config.js, eslint config, jest/vitest config).
  - Module boundaries and any notable layers (UI, API routes, services, domain, data access).
  - External integrations or environment requirements (reference .env.example if added; avoid including secrets).

Important repo files and rules
- README.md: Not present.
- CLAUDE/Cursor/Copilot rules: Not present.
- CI/CD configs: Not present.

Maintainer notes for future updates to this file
- When you introduce package/config files, update the Commands section with the exact commands and add a brief Architecture section that reflects the actual structure.
- Keep this document concise and focused on repo-specific workflows and structure.

