# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend
- Development: `npm run dev`
- Build: `npm run build`
- SSR Build: `npm run build:ssr`
- Lint: `npm run lint`
- Type check: `npm run types`
- Format: `npm run format` (writes changes), `npm run format:check` (checks only)

### Backend
- Development: `composer dev` (runs server, queue, logs, vite concurrently)
- Test: `composer test`
- Run single test: `php artisan test --filter TestName`

## Coding Standards

### Frontend
- Use TypeScript with strict mode and React+JSX
- Follow ESLint rules for React and React Hooks
- Organize imports with Prettier
- Use Tailwind CSS for styling
- Path aliases: `@/*` maps to `./resources/js/*`

### Backend
- Follow PSR-12 standards and Laravel conventions
- Use Pest for testing with SQLite in-memory database
- Format with Laravel Pint
- PascalCase for PHP classes, camelCase for methods/variables
