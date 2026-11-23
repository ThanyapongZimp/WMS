---
paths:
  - "docs/**/*.md"
  - "src/**/*.{ts,tsx,js,jsx,vue,svelte,html}"
  - "**/locales/**/*.json"
  - "**/i18n/**/*.json"
---

# Rule: UI copy

Loaded when you edit docs or files that hold UI strings.

- For any new or changed UI string, follow the `ux-writer` agent rules (`.claude/agents/ux-writer.md`) or delegate to that agent.
- Before you finish, run the `ux-writing-review` skill on the changed strings.
- Every string gets a semantic key. See `docs/patterns/LocalizationKeys.md`.
- Icon-only controls need an `aria-label`; decorative images need `alt=""`. See `docs/patterns/Accessibility.md`.
- Empty lists follow `docs/patterns/EmptyStates.md`; errors follow `docs/patterns/ErrorMessages.md`.
- A new term that is not in `docs/foundation/Glossary.md` is a gap: add it there, do not invent a synonym.
