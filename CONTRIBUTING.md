# Contributing

## Definition of Done

A pull request that changes UI copy, adds a component or edits `docs/` is done when:

1. The Figma link is in the description.
2. The component spec has an Accessibility (a11y) section with `aria-label` and `alt` text.
3. New strings have semantic keys (see `docs/patterns/LocalizationKeys.md`).
4. The copy passes the `/ux-writing-review` checklist, or the `ux-writer` agent reviewed it.
5. `docs/discovery.md` lists any new or changed document with its status.
6. `CHANGELOG.md` has an entry under `[Unreleased]`.
7. `npm run lint` and `npm test` pass.

## New terms

Add a new term to `docs/foundation/Glossary.md` first. When a wrong form is common, add a Vale `substitution` rule in `styles/WMS/` with `nonword: true`, plus bad and good fixtures in `tests/fixtures/`.
