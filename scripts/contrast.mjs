/** WCAG 2.2 contrast ratio between two colours (hex #RGB/#RRGGBB or rgb()). */
function parse(color) {
  const s = color.trim();
  if (s.startsWith('#')) {
    const h = s.length === 4 ? [...s.slice(1)].map((c) => c + c).join('') : s.slice(1, 7);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const m = s.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/);
  if (!m) throw new Error(`unsupported colour ${color}`);
  return m.slice(1, 4).map(Number);
}

function luminance(color) {
  const [r, g, b] = parse(color).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}
