# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **German-language Christmas advent calendar web application** featuring cats, built with Nuxt 4 and Nuxt UI. The application displays 24 doors (one for each day of December) containing various content types: interactive games, puzzles, vegan recipes, and inspirational quotes. The calendar uses localStorage to track which doors have been opened.

## Technology Stack

- **Framework**: Nuxt 4 (Vue 3)
- **UI Library**: Nuxt UI v4 (built on Radix Vue)
- **Icons**: Iconify (lucide and simple-icons collections)
- **Styling**: Tailwind CSS (via Nuxt UI)
- **TypeScript**: Full TypeScript support
- **Package Manager**: pnpm (v10.19.0)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server on http://localhost:3003
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint

# Type check
pnpm typecheck
```

Note: Dev server runs on **port 3003** (not the default 3000).

## Architecture

### Core Data Structure

All advent calendar content is defined in `/app/data/adventCalendar.ts`. This is the single source of truth for:
- Door configuration (day, title, catEmoji)
- Content types: `'game' | 'puzzle' | 'recipe' | 'quote'`
- Game data for 5 different game types: `'memory' | 'quiz' | 'riddle' | 'hangman' | 'simon' | 'catch'`

### Component Architecture

**Three main components work together:**

1. **`AdventDoor.vue`** - Individual door cards
   - Handles door open/closed state
   - Manages date-based availability (only opens on/after the correct December day)
   - Persists opened state to localStorage
   - Has a `testMode` prop to bypass date restrictions

2. **`DoorContent.vue`** - Modal for displaying door content
   - Single component that renders all content types
   - Contains complete implementations of all 5 game types with their own state management
   - Uses conditional rendering based on content type
   - Game states are isolated and reset when door changes

3. **`index.vue`** (pages) - Main calendar page
   - Randomly shuffles door display order using Fisher-Yates algorithm
   - Manages modal state for selected door
   - Provides test mode toggle
   - Shows statistics (opened doors count, current date)
   - Includes animated snowflakes

### State Management

- **No Vuex/Pinia**: Uses Vue 3 Composition API with `ref()` and `computed()`
- **Persistence**: `localStorage` tracks opened doors as JSON array of day numbers
- **Game state**: Each game type in DoorContent.vue has isolated reactive state

### Layout Structure

- **App root** (`app.vue`): Contains header with logo/navigation and footer, uses Nuxt UI's `UApp`, `UHeader`, `UMain`, `UFooter` components
- **Pages**: Single page application with `/` route serving the calendar grid
- **Language**: All content and UI text is in **German**

## Important Conventions

1. **TypeScript Types**: All door/content interfaces are exported from `adventCalendar.ts` and imported where needed
2. **Nuxt UI Components**: Uses auto-imported Nuxt UI components (UButton, UModal, UCard, etc.)
3. **Dark Mode**: Full dark mode support via Nuxt UI's color mode system
4. **Responsive**: Grid adapts from 2 columns (mobile) to 6 columns (desktop)
5. **Door Order**: Doors are shuffled on every page load/computation - not fixed positions

## Key Files

- `/app/data/adventCalendar.ts` - All calendar content and TypeScript interfaces
- `/app/components/AdventDoor.vue` - Individual door component
- `/app/components/DoorContent.vue` - Modal with all game implementations
- `/app/pages/index.vue` - Main calendar page
- `/app/app.vue` - App layout with header/footer
- `/nuxt.config.ts` - Nuxt configuration (includes ESLint stylistic rules)

## Adding New Content

To add or modify calendar doors:
1. Edit the `adventDoors` array in `/app/data/adventCalendar.ts`
2. Follow existing TypeScript interfaces
3. For new game types, add implementation to `DoorContent.vue`

## Build Configuration

- Pre-rendering enabled for `/` route
- Compatibility date: 2025-01-15
- ESLint configured with stylistic rules (no trailing commas, 1tbs brace style)
