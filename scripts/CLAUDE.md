# scripts/

Repo tooling (not BMAD — BMAD helpers live in `_bmad/scripts/`).

| File | What | Run |
|---|---|---|
| `check_doc_links.py` | Fails if any path referenced in a `CLAUDE.md` or `docs/**/*.md` doesn't exist | `python3 scripts/check_doc_links.py` |

Run `check_doc_links.py` after adding, moving or renaming docs or folders. Standard library only.
