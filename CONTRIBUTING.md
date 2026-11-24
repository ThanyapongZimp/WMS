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

## Approval

The `ux-writer` agent drafts and reviews copy. The code owner in `.github/CODEOWNERS` approves it. A document moves to `Active` in `docs/discovery.md` only after that approval.

## Changing a language rule

Any edit to `docs/foundation/` or `styles/WMS/` is a rule change. It needs:

1. A `CHANGELOG.md` entry under `Changed`, prefixed with `**Breaking:**` when an in-use term changes.
2. A Vale rule with bad and good fixtures for each new term.
3. The reason for the change in the PR description.

## New terms

Add a new term to `docs/foundation/Glossary.md` first. When a wrong form is common, add a Vale `substitution` rule in `styles/WMS/` with `nonword: true`, plus bad and good fixtures in `tests/fixtures/`.
