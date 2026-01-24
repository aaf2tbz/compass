dashboard-app-template
===

a Next.js 15 dashboard template deployed to Cloudflare Workers via OpenNext.

tech stack
---

- Next.js 15.5 with Turbopack
- React 19
- Tailwind CSS v4
- shadcn/ui (new-york style)
- Recharts for data visualization
- Cloudflare Workers (via @opennextjs/cloudflare)

commands
---

- `bun dev` - start dev server (turbopack)
- `bun build` - production build
- `bun preview` - build and preview on cloudflare runtime
- `bun deploy` - build and deploy to cloudflare
- `bun lint` - run eslint

project structure
---

```
src/
├── app/              # Next.js app router
│   ├── dashboard/    # dashboard routes
│   ├── globals.css   # tailwind + theme variables
│   ├── layout.tsx    # root layout
│   └── page.tsx      # home page
├── components/
│   ├── ui/           # shadcn/ui primitives
│   └── *.tsx         # app-specific components (sidebar, charts, tables)
├── hooks/            # custom react hooks
└── lib/
    └── utils.ts      # cn() helper for class merging
```

shadcn/ui
---

uses shadcn/ui with new-york style. add components via:

```bash
bunx shadcn@latest add <component-name>
```

config in `components.json`. aliases:
- `@/components` -> src/components
- `@/components/ui` -> src/components/ui
- `@/lib` -> src/lib
- `@/hooks` -> src/hooks

cloudflare deployment
---

configured in `wrangler.jsonc`. uses OpenNext for Next.js compatibility.

env vars go in `.dev.vars` (local) or cloudflare dashboard (prod).

key bindings:
- `ASSETS` - static asset serving
- `IMAGES` - cloudflare image optimization
- `WORKER_SELF_REFERENCE` - self-reference for caching

known issues (WIP)
---

- gantt chart pan/zoom: zoom controls (+/-) and ctrl+scroll work. pan mode
  toggle (pointer/grab) exists but vertical panning does not work correctly
  yet - the scroll-based approach conflicts with how frappe-gantt sizes its
  container. horizontal panning works. needs a different approach for
  vertical navigation (possibly a custom viewport with transform-based
  rendering for the body while keeping the header fixed separately).
