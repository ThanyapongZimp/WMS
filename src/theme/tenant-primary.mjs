/**
 * Tenant primary colour. A tenant may change only the logo and the primary
 * colour (PRODUCT.md). A colour under 4.5:1 on white is darkened in OKLCH
 * until it passes, and the caller tells the tenant it was adjusted.
 */
import { parse, converter, formatHex, clampChroma } from 'culori';
import { contrastRatio } from '../../scripts/contrast.mjs';

export const DEFAULT_PRIMARY = '#4A3FD6';
const WHITE = '#FFFFFF';
const MIN_CONTRAST = 4.5;

// The default family is the hand-tuned DESIGN.md set; keep it exact.
const DEFAULT_FAMILY = Object.freeze({
  primary: '#4A3FD6',
  primaryHover: '#3B31B8',
  primaryActive: '#2F2894',
  ring: '#4A3FD6',
  accent: '#EEEDFC',
  accentForeground: '#2F2894',
});

const toOklch = converter('oklch');
const hex = (l, c, h) => formatHex(clampChroma({ mode: 'oklch', l, c, h: h ?? 0 }, 'oklch'));

function readColour(input) {
  if (typeof input !== 'string' || !input.trim()) return null;
  const s = input.trim();
  // Only #RGB, #RRGGBB or a CSS colour function; culori would also read bare "abc" as hex.
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s) && !/^(rgb|hsl|oklch|oklab)a?\(/i.test(s)) return null;
  const c = parse(s);
  return c ? toOklch(c) : null;
}

/** @returns {{primary:string, primaryHover:string, primaryActive:string, ring:string, accent:string, accentForeground:string, adjusted:boolean}} */
export function deriveTenantPrimary(input) {
  const c = readColour(input);
  if (!c || formatHex(c).toUpperCase() === DEFAULT_PRIMARY) return { ...DEFAULT_FAMILY, adjusted: false };

  let { l } = c;
  const { c: chroma, h } = c;
  let primary = formatHex(c);
  let adjusted = false;
  while (contrastRatio(primary, WHITE) < MIN_CONTRAST && l > 0) {
    l = Math.max(0, l - 0.01);
    primary = hex(l, chroma, h);
    adjusted = true;
  }
  const hover = hex(Math.max(0, l - 0.08), chroma, h);
  return {
    primary,
    primaryHover: hover,
    primaryActive: hex(Math.max(0, l - 0.14), chroma, h),
    ring: primary,
    accent: hex(0.95, Math.min(chroma, 0.03), h),
    accentForeground: hex(Math.min(0.35, l), chroma, h),
    adjusted,
  };
}

/** Set the tenant colour on an element (usually <html>). Returns true when the colour was adjusted. */
export function applyTenantPrimary(el, input) {
  const f = deriveTenantPrimary(input);
  const set = (name, value) => el.style.setProperty(name, value);
  set('--color-primary', f.primary);
  set('--color-primary-hover', f.primaryHover);
  set('--color-primary-active', f.primaryActive);
  set('--color-ring', f.ring);
  set('--color-accent', f.accent);
  set('--color-accent-foreground', f.accentForeground);
  set('--color-sidebar-accent', f.accent);
  set('--color-sidebar-accent-foreground', f.accentForeground);
  set('--color-chart-1', f.primary);
  return f.adjusted;
}
