contributing
===

local setup
---

```bash
git clone git@github.com:High-Performance-Structures/compass.git
cd compass
bun install
bun dev
```

branching
---

branch off main using the format `<username>/<feature>`:

```bash
git checkout -b nicholai/add-gantt-zoom
```

direct commits to main are blocked by a pre-commit hook.

commits
---

use conventional commits:

```
type(scope): subject
```

- types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
- subject: imperative mood, 50 chars max
- body: 72 chars max width, explain *why* not *what*

pull requests
---

1. push your branch and open a PR against main
2. CI runs lint + build automatically
3. both checks must pass before merge
4. PRs are squash-and-merged (single clean commit on main)

the PR template will guide you on what to include.

deployment
---

deployment to cloudflare workers happens manually via `bun deploy`.
this is separate from the PR/merge workflow.
