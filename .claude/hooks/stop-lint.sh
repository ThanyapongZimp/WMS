#!/usr/bin/env bash
# Stop hook: block the first stop when lint fails; never loop.
input=$(cat)
if printf '%s' "$input" | grep -Eq '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
  exit 0
fi
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
if ! ${WMS_LINT_CMD:-npm run -s lint} >&2; then
  echo 'npm run lint failed. Fix the findings above before finishing (needs vale and lychee installed).' >&2
  exit 2
fi
exit 0
