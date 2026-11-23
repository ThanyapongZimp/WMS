# Git conventions

- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:` (optional scope, e.g. `feat(inbound):`). Imperative, English, subject ≤ 72 chars.
- **Story work:** reference the story ID in the body (e.g. `Story 2.1`).
- **Branches:** branch off `main`; don't commit straight to `main` unless the owner asks. Suggested names: `feat/<story-id>-<slug>`, `docs/<slug>`, `fix/<slug>`.
- **Never commit:** secrets, `.env`, personal config (`*.user.toml`), `node_modules/`, `.DS_Store`.
