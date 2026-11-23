# Git Flow

> Copied from `ace-omnichat-go/_shared/GIT-FLOW.md` and `ace-omnichat-web/_shared/GIT-FLOW.md` (2026-11-23), merged into one file. Not yet adapted to WMS: ticket prefix, repo names, Slack channel, `E2E-TESTING.md` and CI workflow paths still refer to ACE.

Release flow for ACE (OmniChat + AI Platform): `ace-omnichat-go`, `ace-omnichat-web`,
`ace-ai-platform-go`, `ace-ai-platform-web`. Source plan: "ACE Release Flow" (28 Oct 2026).
Items marked **(proposed)** are not in the source plan; the team must confirm them.

## Status: TRANSITION

As of 29 Oct 2026, `sit` and `uat` point at the same commit. The previous `sit` and `dev`
are kept as `sit_backup_28_oct` and `dev_backup_28_oct`.

`dev` still holds work that `sit` does not, and `sit` holds fixes that `dev` does not.
Until both are sorted:

- Work in `dev` but missing from `sit` re-enters `sit` one ticket at a time through its own
  `feature/` or `fix/` PR, or stays out until it is ready. Never merge `dev` into `sit`.
- Fixes in `sit` but missing from `dev` reach `dev` through one sync PR from `sit`. **(proposed)**

When `dev` contains all of `sit` and no unsorted work, change this section to `Status: ACTIVE`.

## Branches and environments

| Branch | Environment | Purpose |
|---|---|---|
| `dev` | dev | Integration of every feature and fix PR. Lets a change be tested on the dev env before `sit`. |
| `sit` | sit | Staging. Feature and fix branches are cut from here. Frozen at the end of each sprint. |
| `uat` | uat | Receives the whole of `sit` after QA sign-off. |
| _(none)_ | prod | No branch. Runs the image built from `uat`. |
| `main` | — | Unused (initial scaffold). Never branch from it or open a PR into it. |

Working branches are short-lived and named `<type>/ACE-xxxx-<slug>` for `feature/`, `fix/` and `hotfix/`,
and `<type>/<slug>` (no ticket) for `chore/` and `refactor/`:

| Type | Use for |
|---|---|
| `feature/` | a story or new behaviour |
| `fix/` | a defect fix through `sit` |
| `hotfix/` | an urgent prod fix cut from `uat` (see Hotfix) |
| `chore/` | tooling, config, CI, dependencies, docs |
| `refactor/` | a change with no behaviour change |

- `ACE-xxxx` is the ClickUp ticket, upper case. It is **required** for `feature/`, `fix/` and `hotfix/`
  (a story, a defect or a prod fix). It is **not required** for `chore/` and `refactor/`, i.e. an update
  to the coding standard, tooling, CI, dependencies or documentation, which may be done without a ticket.
  A change that alters product behaviour is never a `chore/`: it needs a ticket and the matching type.
- `<slug>` says what the branch does: lower-case words joined by `-`, a-z and 0-9 only,
  3–6 words, e.g. `feature/ACE-8128-dashboard-channel-access-scope` or `chore/add-pr-ci-checks`.
- A `dev` conflict copy adds `-dev` at the end (see Conflicts):
  `feature/ACE-8128-dashboard-channel-access-scope-dev`.
- Existing branches keep their name until they are merged.

PR titles start with the ticket ID, e.g. `ACE-8401: …`. A `chore/` or `refactor/` PR has no ticket and uses a
plain title, e.g. `chore: add PR CI checks`. **(proposed)**

## Flow

```
feature/ACE-xxxx-<slug> ─┬─ PR ─► sit ── freeze + QA ── merge ─► uat ── UAT ── same image ─► prod
(cut from sit)           └─ PR ─► dev
```

1. **Branch from `sit`:** `git fetch origin && git switch -c feature/ACE-8401-seat-add-on origin/sit`.
2. **Open two PRs from the same branch:** one into `sit`, one into `dev`.
3. **Freeze `sit`** near sprint end. QA runs the full regression on `sit`
   (ClickUp test cases, the Playwright CI suite and the Playwright manual suite, see `E2E-TESTING.md`). Only defect fixes are accepted (see Freeze).
4. **Merge `sit` into `uat`** after QA sign-off. Promote migrations to `changes/uat`,
   check that Vault uat has every key sit has, then deploy UAT for PO/business testing.
5. **Promote to prod** with the image built from `uat`, the one that passed UAT.
   Promote every changeset uat uses to `changes/prod`, then run a smoke test.

## Rules

- Always branch from `sit`. Never from `dev`, `uat` or `main`.
- Merge the same branch into both `sit` and `dev`.
- Never merge `dev` into `sit`, in whole or in part. Work that is in `dev` but missing
  from `sit` enters `sit` through its own `feature/` or `fix/` branch PR, or stays
  behind a feature flag.
- Never rebase `sit`, `uat`, or any branch cut from them onto `dev` or onto a branch cut
  from `dev`, and never merge those into them either. This covers `feature/*`, `fix/*` and
  `hotfix/*` (prod has no branch; a hotfix cut from `uat` counts), and every way of doing it:
  `git rebase origin/dev`, `git pull --rebase origin dev`, `git merge origin/dev`, and
  GitHub's "Update branch" or "Resolve conflicts" on a `dev` PR. It carries `dev`-only work
  into `sit`, then `uat` and prod.
  - To catch up, rebase onto or merge the branch it was cut from: `origin/sit`, or
    `origin/uat` for a hotfix. After the PRs are open, merge instead of rebasing.
  - The only branch that may take `dev` is a `<branch>-dev` copy made for a `dev` conflict
    (see Conflicts). It opens a PR into `dev` only, never into `sit` or `uat`.
- `sit` → `uat` is all-or-nothing. No cherry-picks and no direct commits on `uat`.
- The freeze runs from the start of QA until the prod release.
- Prod equals the `uat` image. Vault prod holds the same set of keys as uat (values differ).
- Every migration changeset used on `uat` is promoted to `changes/prod` before the prod release.
- Work that is not ready ships behind a feature flag. Do not revert it or drop it from `sit`.
- `sit`, `uat` and `dev` accept PRs only. No direct push.
- A PR into `sit` or `dev` is merged only when the Playwright E2E check (`E2E tests`) has passed
  on its latest commit. A failing, cancelled or missing E2E run blocks the merge in every case,
  with no exception for the release owner, a freeze or a hotfix. Fix the test or the code. Do not
  re-run until it turns green, and do not skip or hide a test to get past it. A test that cannot
  pass is hidden in its own PR with a reason and a ClickUp ticket, and that PR passes E2E first.
  The E2E check is the `ci/` suite only, kept to 1-3 happy-flow cases per sub-feature (a flow such as inbound message or identity merge, not a whole page), and every detailed
  case lives in `manual/`; the split and its limits are in `E2E-TESTING.md`, "Two suites".

## Conflicts

- **`sit` PR conflicts:** merge `origin/sit` into the working branch and resolve there.
  Every `sit` commit belongs in `dev` too, so this only adds work `dev` should already have.
  While `dev` is still missing `sit` commits (see Status), this makes the `dev` PR larger.
- **`dev` PR conflicts:** do not resolve on the working branch, and do not use GitHub's
  "Resolve conflicts" button on the `dev` PR (it merges `dev` into the branch, and that
  `dev` work then leaks into the `sit` PR). Instead:
  1. `git switch -c <branch>-dev <branch>` (e.g. `feature/ACE-8401-seat-add-on-dev`).
  2. Merge `origin/dev` into `<branch>-dev` and resolve.
  3. Open the `dev` PR from `<branch>-dev` and close the original `dev` PR.

## Freeze

- Who announces it: the release owner posts in #ace-team when `sit` freezes and reopens.
  When the `SIT_FREEZE` repo variable exists, it is the source of truth
  (`gh variable get SIT_FREEZE`). **(proposed)**
- While `sit` is frozen, a PR into `sit` is accepted only if it fixes a defect ticket raised
  in this cycle's QA or UAT. Stories and other tickets wait until `sit` reopens.
- `dev` stays open during the freeze. Next-sprint PRs into `dev` merge as usual; their
  `sit` PRs wait until after the prod release.

## Merge method (proposed)

- Feature and fix PRs into `sit` and `dev`: **merge commit**, not squash. The same commits then
  exist on both branches, so `git cherry` and ancestry checks stay reliable.
- `sit` → `uat`: **merge commit** through a PR.
- Never `cherry-pick` between `sit`, `dev` and `uat`.

## Handling defects

**Defect found by QA on `sit`**

1. Open a defect ticket. High and above block sign-off. No silent fixes without a ticket.
2. Branch `fix/ACE-xxxx-<slug>` from `sit`. Open PRs into `sit` and `dev`.
3. Deploy `sit` and let QA retest against the ticket. Sign-off needs all High+ closed.
4. Merge `sit` into `uat` and deploy UAT.

**Defect found by PO/business on UAT**

1. Open a ticket. Do not fix or cherry-pick on `uat`.
2. Fix through `sit` as above. `sit` is still frozen, so it matches `uat`.
3. Merge `sit` into `uat` again, retest on UAT, then promote to prod.

**Medium/Low defects** that miss the cycle do not block sign-off. The fix branch is cut from
`sit`. Its `dev` PR merges at once. Its `sit` PR waits until `sit` reopens.

## Hotfix (proposed, to confirm)

If `sit` already holds next-cycle work and prod needs an urgent fix:

1. Cut `hotfix/ACE-xxxx-<slug>` from `uat`.
2. Open PRs into `uat`, `sit` and `dev` the same day. The `dev` PR will often conflict;
   use `hotfix/ACE-xxxx-<slug>-dev` as in Conflicts.
3. Retest on UAT, then promote the new `uat` image to prod.

This is the only case where `uat` receives a PR that did not come from `sit`.

## First-time transition

`uat` = `sit` is already in place (see Status). What remains:

1. **List the work in `dev` but missing from `sit`** per repo. Owner: each repo's team.
2. **Sort it with PO:** ready for the next release → re-enter `sit` through its own
   `feature/` or `fix/` PR; not ready → stays out, or goes behind a flag.
3. **Bring the fixes in `sit` but missing from `dev` into `dev`.**
4. **Check Vault/config:** uat has every key sit has.
5. Set Status to ACTIVE.

## Enforced in GitHub, not here

This document cannot enforce anything. DevOps configures:

- Rulesets on `sit`, `uat`, `dev`: PRs only, no force push, no deletion.
- Require the `E2E tests` check on `sit` and `dev`, and do not let anyone bypass it, the release owner
  included. The review bypass below does not cover it.
- Require the `Go CI / Build & Vet` and `Go CI / Unit Test` checks (gofmt, build, vet; unit tests; see `.github/workflows/ci.yml`) on PRs into `sit` and `dev` (Go repo).
- Require the `Web CI / Build & Lint` (lint, typecheck, build) and `Web CI / Unit Test` checks (see `.github/workflows/ci.yml`) on PRs into `sit` and `dev` (web repo).
- Require passing CI and at least one review. Allow the release owner to bypass the review
  so a PR does not stall when only one person is available. **(proposed)**
- Allow only the "merge commit" method on those branches.
- A required CI check, because rulesets cannot restrict the head branch:
  - a PR into `uat` must come from `sit` or `hotfix/*`;
  - head branch must match `^(feature|fix|hotfix)/ACE-\d+` or `^(chore|refactor)/[a-z0-9-]+`
    (a ticket is enforced for `feature/`, `fix/` and `hotfix/` only);
  - when `SIT_FREEZE` is `true`, a PR into `sit` needs the `defect` label.
- Change the default branch from `main` to `sit`.
