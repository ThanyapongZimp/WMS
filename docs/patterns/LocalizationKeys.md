# Localization Keys

**Status:** `Trial`

A key is a contract between the UX writer, the developer and the translator.

## Naming

- `camelCase`, grouped by feature or business domain, not by UI file path.
- 2 to 3 dot levels: `{feature}.{area}.{element}`, for example `putaway.binScan.mismatchError`.
- Name the meaning, not the words: `pick.confirm.submitButton`, not `pick.confirmPickText`.

## Do not reuse keys

One English word can need different Thai. "Read" as a verb is อ่านต่อ and as a status is อ่านแล้ว. Give each meaning its own key. Shared catalogues (countries, months) are the only exception.

Never build a sentence by joining strings. Use one message with placeholders.

## ICU MessageFormat

- Every `plural` and `select` has an `other` branch.
- Use `=0` for zero copy, not `zero`. Thai has no `zero` plural category, so `zero` never matches 0.
- Nest at most one `select` inside a `plural`.
- Format dates and numbers with the platform `Intl` API and the `-u-ca-gregory` calendar, never inside the message.

```text
pick.wave.remainingItems = {count, plural,
  =0 {หยิบสินค้าครบแล้ว}
  other {เหลือ {count, number} รายการ}
}
```

## Figma workflow

- Generate keys from frame and layer names with the translation plugin (Crowdin or Transifex).
- Hand off in Key Names view.
- Run pseudo-localization in Figma before code, and allow about 15% extra length for Thai.
