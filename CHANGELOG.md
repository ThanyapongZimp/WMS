# Changelog

All notable changes to the WMS design system docs are recorded here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Mark changes that break existing copy, keys or rules with **Breaking:**.

## [Unreleased]

### Added

- UX/UI subagents: `ux-researcher`, `ux-designer`, `ui-designer`, `design-bridge`, `accessibility-tester`, `qa-evaluator` and `context-manager` in `.claude/agents/`.
- UX Writer agent (`.claude/agents/ux-writer.md`) for writing and reviewing UI copy.
- `ux-writing-review` skill with the copy checklist and before and after examples.
- Path-scoped rule `.claude/rules/ux-copy.md` for docs and UI string files.
- Patterns: Empty States, Accessible Copy, Localization Keys.
- Vale rule `WMS.MissingAltText` for Markdown images with empty alt text.
- `CONTRIBUTING.md` and a pull request template with the Definition of Done.
