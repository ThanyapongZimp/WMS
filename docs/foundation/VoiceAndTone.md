# Voice and Tone

**Status:** `Trial`

## Voice

Professional yet approachable: clear, helpful and human. In the warehouse this means calm, short, imperative everyday Thai. Say what happened, then what to do next.

## Tone by context

| Context | Tone | Example |
| :--- | :--- | :--- |
| Onboarding and success | Warm, encouraging, positive | จัดเก็บเข้าพื้นที่เรียบร้อย สแกนลังถัดไปได้เลย |
| Information and tooltips | Neutral, short, to the point | สแกนบาร์โค้ดช่องเก็บสินค้าเพื่อยืนยัน |
| Warning and error | Serious, empathetic, clear; problem and fix at once | ช่องเก็บสินค้านี้ไม่ตรงกับงาน สแกนช่อง A-03-12 แทน |

## Source language

Thai is the source language. Write Thai first, then translate to English by meaning.

## Length limits

Count words with `Intl.Segmenter('th', { granularity: 'word' })`.

| Component | PDA | Office |
| :--- | :--- | :--- |
| Button | 3 words | 4 words |
| Heading or label | 5 words | 8 words |
| Error or toast | 2 sentences, 60 characters | 2 sentences |
| Empty-state supporting line | 1 sentence | 2 sentences |

## Rules

- No jokes and no blame in warnings or errors.
- No exclamation marks.
- Use เรา for the system and คุณ for the user, only when a subject is needed.
- Use glossary terms. See [Glossary](Glossary.md).
