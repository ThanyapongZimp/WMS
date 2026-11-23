/* Zimple WMS · Pilot Wave 1 prototype runtime.
   Shared shell (Story 1.4), list/sheet/confirm components (1.5, 1.6), sample data for 2.1–2.3.
   Data lives in sessionStorage so records created on one page show up on the next. */
(() => {
  'use strict';

  // ── Icons (Lucide, stroke 2) ─────────────────────────────
  const ICONS = {
    'layout-dashboard': '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    'shopping-cart': '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    'package': '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    'package-check': '<path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><path d="M3.29 7 12 12l8.71-5"/><path d="M12 22V12"/>',
    'inbox': '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    'boxes': '<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>',
    'hand': '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    'truck': '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    'undo-2': '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
    'bar-chart-3': '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'scan-line': '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    'check-square': '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevrons-up-down': '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
    'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'panel-left': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
    'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'more-horizontal': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    'pencil': '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
    'printer': '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'x-octagon': '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    'circle-slash': '<circle cx="12" cy="12" r="10"/><line x1="9" x2="15" y1="15" y2="9"/>',
    'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'unlock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'loader': '<path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'warehouse': '<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/>',
    'layers': '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    'container': '<path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.8v-8.1"/><path d="M18 17.5V9.4"/>',
    'qr-code': '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
    'eraser': '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
    'power': '<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/>',
    'refresh-cw': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    'wifi-off': '<path d="M12 20h.01"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 12.86a10 10 0 0 1 5.17-2.69"/><path d="m2 2 20 20"/>',
    'cloud-off': '<path d="m2 2 20 20"/><path d="M5.78 5.78A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.31-.2"/><path d="M21.53 16.55A4.5 4.5 0 0 0 17.5 10h-1.79A7 7 0 0 0 9.93 5.07"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    'languages': '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    'key-round': '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
    'mail': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    'mail-check': '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/>',
    'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
    'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'user-x': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>',
    'timer': '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
    'filter-x': '<path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/>',
    'server-crash': '<path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><path d="M6 6h.01"/><path d="M6 18h.01"/><path d="m13 6-4 6h6l-4 6"/>',
    'sliders': '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
    'columns': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>',
    'bookmark': '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    'trash': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'map': '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
    'mouse-pointer': '<path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>',
    'square-dashed': '<path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/>',
    'rows': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/>',
    'brick-wall': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 9v6"/><path d="M16 15v6"/><path d="M16 3v6"/><path d="M3 15h18"/><path d="M3 9h18"/><path d="M8 15v6"/><path d="M8 3v6"/>',
    'door-open': '<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>',
    'flag': '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    'type': '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>',
    'undo': '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>',
    'redo': '<path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>',
    'zoom-in': '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
    'zoom-out': '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>',
    'maximize': '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
    'rotate-cw': '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c0-1.1.9-2 2-2h2"/><path d="M4 8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"/>',
    'route': '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'unlink': '<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"/><line x1="8" x2="8" y1="2" y2="5"/><line x1="2" x2="5" y1="8" y2="8"/><line x1="16" x2="16" y1="19" y2="22"/><line x1="19" x2="22" y1="16" y2="16"/>',
    'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    'shuffle': '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l.5.7"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/>',
    'puzzle': '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>',
  };
  const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n, d = 0) => Number(n).toLocaleString('th-TH', { minimumFractionDigits: d, maximumFractionDigits: d });
  const pad = (n, w) => String(n).padStart(w, '0');
  const nowHM = () => new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });

  const safeStore = {
    get(k, fallback) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
    set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked: data stays in memory */ } },
    local(k, v) {
      try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch { return null; }
      return null;
    },
  };

  // ── Sample data ─────────────────────────────────────────
  const LOCATION_TYPES = [
    { id: 'pick', th: 'หยิบ', en: 'pick' },
    { id: 'storage', th: 'เก็บ', en: 'storage' },
    { id: 'receiving', th: 'รับเข้า', en: 'receiving' },
    { id: 'staging', th: 'พักสินค้า', en: 'staging' },
    { id: 'handover', th: 'ส่งมอบ', en: 'handover' },
    { id: 'returns', th: 'คืน', en: 'returns' },
    { id: 'restock', th: 'รอคืนชั้น', en: 'awaiting restock' },
    { id: 'damaged', th: 'ชำรุด/กักกัน', en: 'damaged/quarantine' },
  ];
  const ROOM_TYPES = ['ทั่วไป', 'ควบคุมอุณหภูมิ', 'ของมีค่า'];
  const WALK_PATTERNS = [
    { id: 'snake', th: 'งูเลื้อย' },
    { id: 'oneway', th: 'ทางเดียว' },
    { id: 'code', th: 'ตามรหัสตำแหน่ง' },
  ];
  const MIXING = [
    { id: 'single-sku', th: 'SKU เดียว' },
    { id: 'single-lot', th: 'หลาย SKU · ห้ามผสมล็อต' },
    { id: 'mixed', th: 'ผสมได้' },
  ];
  const CONTAINER_TYPES = [
    { prefix: 'PL', th: 'พาเลท' },
    { prefix: 'TT', th: 'ตะกร้า' },
    { prefix: 'BG', th: 'ถุงส่งมอบ' },
    { prefix: 'CG', th: 'กรง' },
    { prefix: 'C20', th: 'รถเข็น 20 ช่อง' },
    { prefix: 'C30', th: 'รถเข็น 30 ช่อง' },
    { prefix: 'C40', th: 'รถเข็น 40 ช่อง' },
    { prefix: 'FC', th: 'รถเข็นพื้นเรียบ' },
    { prefix: 'PW', th: 'Put wall' },
    { prefix: 'DMG-T', th: 'ตะกร้าของชำรุด' },
  ];
  const STAGES = ['รับเข้า', 'จัดเก็บ', 'หยิบ', 'คัดแยก', 'แพ็ค', 'ส่งมอบ', 'ตีกลับ'];

  function seed() {
    const warehouses = [
      { code: 'BKN', name: 'คลังบางเขน', status: 'active', stock: 12480 },
      { code: 'LKB', name: 'คลังลาดกระบัง', status: 'active', stock: 3215 },
      { code: 'RMI', name: 'คลังรามอินทรา', status: 'active', stock: 0 },
    ];
    const zones = [
      { wh: 'BKN', code: 'R', name: 'ลานรับสินค้า', room: 'ทั่วไป', cap: 180, walk: 'code' },
      { wh: 'BKN', code: 'A', name: 'ชั้นวางสินค้าทั่วไป', room: 'ทั่วไป', cap: 960, walk: 'snake' },
      { wh: 'BKN', code: 'B', name: 'ชั้นวางชิ้นเล็ก', room: 'ทั่วไป', cap: 240, walk: 'snake' },
      { wh: 'BKN', code: 'C', name: 'ห้องควบคุมอุณหภูมิ', room: 'ควบคุมอุณหภูมิ', cap: 120, walk: 'oneway' },
      { wh: 'BKN', code: 'S', name: 'พื้นที่พักสินค้า', room: 'ทั่วไป', cap: 90, walk: 'code' },
      { wh: 'BKN', code: 'H', name: 'ลานส่งมอบ', room: 'ทั่วไป', cap: 150, walk: 'code' },
      { wh: 'BKN', code: 'RT', name: 'สินค้าคืนและรอคืนชั้น', room: 'ทั่วไป', cap: 60, walk: 'code' },
      { wh: 'BKN', code: 'Q', name: 'ชำรุดและกักกัน', room: 'ทั่วไป', cap: 40, walk: 'code' },
      { wh: 'LKB', code: 'A', name: 'ชั้นวางสินค้าทั่วไป', room: 'ทั่วไป', cap: 420, walk: 'snake' },
      { wh: 'LKB', code: 'R', name: 'ลานรับสินค้า', room: 'ทั่วไป', cap: 80, walk: 'code' },
    ];
    const locations = [];
    const add = (code, zone, type, o = {}) => locations.push({
      wh: 'BKN', code, zone, type, seq: locations.length + 1,
      sellable: ['pick', 'storage'].includes(type),
      m3: o.m3 ?? 1.2, kg: o.kg ?? 500, mix: o.mix ?? 'single-lot',
      status: o.status ?? 'active', print: o.print ?? 'printed', copies: o.copies ?? 0,
    });
    ['R-01', 'R-02', 'R-03', 'R-04'].forEach((c) => add(c, 'R', 'receiving', { m3: 8, kg: 2000, mix: 'mixed' }));
    for (let r = 1; r <= 12; r++) {
      const rows = r % 2 ? [1, 2, 3, 4] : [4, 3, 2, 1];
      rows.forEach((l) => add(`A-${pad(r, 2)}-${pad(l, 2)}`, 'A', l === 1 ? 'pick' : 'storage', {
        m3: l === 1 ? 0.8 : 1.5, kg: l === 1 ? 300 : 800, mix: l === 1 ? 'single-sku' : 'single-lot',
      }));
    }
    for (let r = 1; r <= 6; r++) for (let l = 1; l <= 5; l++) add(`B-${pad(r, 2)}-${pad(l, 2)}`, 'B', 'pick', { m3: 0.2, kg: 60, mix: 'single-sku' });
    for (let r = 1; r <= 4; r++) for (let l = 1; l <= 3; l++) add(`C-${pad(r, 2)}-${pad(l, 2)}`, 'C', 'storage', { m3: 1, kg: 400, print: 'none' });
    for (let i = 1; i <= 6; i++) add(`S-${pad(i, 2)}`, 'S', 'staging', { m3: 4, kg: 1200, mix: 'mixed' });
    for (let i = 1; i <= 8; i++) add(`H-${pad(i, 2)}`, 'H', 'handover', { m3: 6, kg: 1500, mix: 'mixed' });
    ['RT-01', 'RT-02', 'RT-03'].forEach((c) => add(c, 'RT', 'returns', { m3: 2, kg: 600, mix: 'mixed' }));
    ['CXL-01', 'CXL-02'].forEach((c) => add(c, 'RT', 'restock', { m3: 2, kg: 600, mix: 'mixed' }));
    ['Q-01', 'Q-02', 'Q-03'].forEach((c) => add(c, 'Q', 'damaged', { m3: 1.5, kg: 500, mix: 'mixed' }));
    const L = (code) => locations.find((l) => l.code === code);
    L('A-12-04').status = 'disabled'; L('B-06-05').status = 'disabled';
    L('A-03-01').status = 'counting'; L('A-03-02').status = 'counting';
    L('A-07-01').print = 'copy'; L('A-07-01').copies = 2;
    L('B-06-01').print = 'none'; L('B-06-02').print = 'none';

    const containerTypes = [
      { prefix: 'PL', count: 40, stages: ['รับเข้า', 'จัดเก็บ'], capKg: 1000, capQty: null, home: 'R-01' },
      { prefix: 'TT', count: 120, stages: ['หยิบ', 'แพ็ค'], capKg: 15, capQty: 40, home: 'S-01' },
      { prefix: 'C30', count: 12, stages: ['หยิบ', 'คัดแยก'], capKg: 120, capQty: 30, home: 'S-02' },
      { prefix: 'FC', count: 6, stages: ['รับเข้า', 'จัดเก็บ'], capKg: 300, capQty: null, home: 'R-02' },
      { prefix: 'BG', count: 200, stages: ['ส่งมอบ'], capKg: 25, capQty: 60, home: 'H-01' },
      { prefix: 'CG', count: 10, stages: ['ส่งมอบ'], capKg: 400, capQty: 300, home: 'H-02' },
      { prefix: 'PW', count: 4, stages: ['คัดแยก'], capKg: null, capQty: 48, home: 'S-03' },
      { prefix: 'DMG-T', count: 8, stages: ['ตีกลับ'], capKg: 15, capQty: 40, home: 'Q-01' },
    ];
    const containers = [];
    containerTypes.forEach((t) => {
      const w = t.count >= 100 ? 4 : 3;
      for (let i = 1; i <= t.count; i++) {
        containers.push({ wh: 'BKN', code: `${t.prefix}-${pad(i, w)}`, prefix: t.prefix, loc: t.home, usage: null, state: 'empty', print: 'printed' });
      }
    });
    const C = (code) => containers.find((c) => c.code === code);
    const hold = (code, usage, loc) => { const c = C(code); c.usage = usage; c.state = 'in-use'; if (loc) c.loc = loc; };
    hold('TT-0003', { kind: 'pick', ref: 'PK-261123-0034' }, 'A-04-01');
    hold('TT-0004', { kind: 'pick', ref: 'PK-261123-0034' }, 'A-04-01');
    hold('TT-0011', { kind: 'pick', ref: 'PK-261123-0041' }, 'B-02-03');
    hold('TT-0012', { kind: 'pick', ref: 'PK-261123-0041' }, 'B-02-03');
    hold('C30-001', { kind: 'pick', ref: 'PK-261123-0029' }, 'S-02');
    hold('C30-002', { kind: 'pick', ref: 'PK-261123-0036' }, 'A-09-01');
    hold('BG-0045', { kind: 'wave', ref: 'Flash · รอบ 14:00' }, 'H-03');
    hold('BG-0046', { kind: 'wave', ref: 'Flash · รอบ 14:00' }, 'H-03');
    hold('BG-0052', { kind: 'wave', ref: 'J&T · รอบ 15:30' }, 'H-05');
    hold('CG-003', { kind: 'wave', ref: 'Kerry · รอบ 16:00' }, 'H-06');
    hold('PL-012', { kind: 'pick', ref: 'PK-261123-0018' }, 'R-03');
    const clr = C('C30-004'); clr.state = 'needs-clearing'; clr.usage = { kind: 'residue', ref: 'PK-261123-0022' }; clr.loc = 'CXL-01';
    const clr2 = C('C30-007'); clr2.state = 'needs-clearing'; clr2.usage = { kind: 'residue', ref: 'PK-261122-0187' }; clr2.loc = 'CXL-01';
    ['DMG-T-007', 'DMG-T-008'].forEach((c) => { C(c).print = 'none'; });
    return { v: 3, warehouses, zones, locations, containerTypes, containers, current: 'BKN', log: [] };
  }

  let DB = safeStore.get('zwms-db', null);
  if (!DB || DB.v !== 3) { DB = seed(); safeStore.set('zwms-db', DB); }
  const save = () => safeStore.set('zwms-db', DB);
  const logAction = (action, target, detail) => {
    DB.log.unshift({ at: new Date().toISOString(), actor: 'ต้น (ผู้ดูแลระบบ)', device: 'PC-OFFICE-02', action, target, detail });
    DB.log = DB.log.slice(0, 200);
    save();
  };
  const currentWh = () => DB.warehouses.find((w) => w.code === DB.current) || DB.warehouses[0];

  // ── Toasts (UX-DR21) ────────────────────────────────────
  function toast({ tone = 'success', title, body = '', ref = '' }) {
    let host = $('.toasts');
    if (!host) { host = document.createElement('div'); host.className = 'toasts'; host.setAttribute('aria-live', 'polite'); document.body.append(host); }
    const el = document.createElement('div');
    el.className = `toast ${tone}`;
    el.setAttribute('role', tone === 'error' ? 'alert' : 'status');
    const ic = tone === 'error' ? 'x-octagon' : tone === 'info' ? 'info' : 'check-circle';
    el.innerHTML = `${icon(ic, 'lead')}<div class="body"><b>${esc(title)}</b>${body ? `<span>${esc(body)}</span>` : ''}${ref ? `<span> · รหัสอ้างอิง <span class="mono">${esc(ref)}</span></span>` : ''}</div><button class="x" aria-label="ปิด">${icon('x')}</button>`;
    const close = () => { el.classList.add('out'); setTimeout(() => el.remove(), 170); };
    $('.x', el).addEventListener('click', close);
    host.append(el);
    if (tone !== 'error') setTimeout(close, 4000);
    return el;
  }

  // ── Dialogs ─────────────────────────────────────────────
  // AlertDialog: names the object and consequence, focus starts on Cancel (UX-DR16).
  function confirmDialog({ tone = 'danger', title, body, confirmLabel, cancelLabel = 'ยกเลิก', reason = false, reasonLabel = 'เหตุผล', confirmTone = 'destructive', hideConfirm = false }) {
    return new Promise((resolve) => {
      const d = document.createElement('dialog');
      d.className = 'dlg';
      d.setAttribute('role', 'alertdialog');
      const ic = tone === 'danger' ? 'x-octagon' : tone === 'warning' ? 'alert-triangle' : 'info';
      const id = `dlg-${Math.random().toString(36).slice(2, 8)}`;
      d.setAttribute('aria-labelledby', `${id}-t`);
      d.setAttribute('aria-describedby', `${id}-b`);
      d.innerHTML = `
        <form method="dialog">
          <div class="dlg-body">
            <div class="dlg-title"><span class="dlg-icon ${tone}">${icon(ic, 'ic-20')}</span>
              <div style="display:flex;flex-direction:column;gap:6px;min-width:0"><h2 id="${id}-t">${title}</h2><div id="${id}-b" class="muted">${body}</div></div></div>
            ${reason ? `<div class="field" style="margin-left:48px"><label for="${id}-r">${reasonLabel}<span class="req">*</span></label><textarea id="${id}-r" class="textarea" rows="2" required></textarea><span class="err">${icon('x-octagon', 'ic-14')}ระบุเหตุผลก่อนยืนยัน</span></div>` : ''}
          </div>
          <div class="dlg-foot">
            <button type="button" class="btn btn-outline" data-act="cancel">${cancelLabel}</button>
            ${hideConfirm ? '' : `<button type="button" class="btn btn-${confirmTone}" data-act="ok">${confirmLabel}</button>`}
          </div>
        </form>`;
      document.body.append(d);
      const finish = (v) => { d.close(); d.remove(); resolve(v); };
      $('[data-act="cancel"]', d).addEventListener('click', () => finish(false));
      d.addEventListener('cancel', (e) => { e.preventDefault(); finish(false); });
      const ok = $('[data-act="ok"]', d);
      if (ok) ok.addEventListener('click', () => {
        if (reason) {
          const ta = $('textarea', d);
          if (!ta.value.trim()) { ta.closest('.field').classList.add('has-error'); ta.focus(); return; }
          finish({ reason: ta.value.trim() });
          return;
        }
        finish(true);
      });
      d.showModal();
      $('[data-act="cancel"]', d).focus();
    });
  }

  // Sheet: focus trap via showModal, first field focused, Esc/close guarded when dirty (UX-DR15).
  function sheet(el, { onOpen } = {}) {
    let dirty = false;
    const form = $('form', el);
    const markDirty = () => { dirty = true; };
    el.addEventListener('input', markDirty);
    el.addEventListener('change', markDirty);
    const tryClose = async () => {
      if (!dirty) { el.close(); return; }
      const ok = await confirmDialog({
        tone: 'warning', title: 'ทิ้งการแก้ไข?', body: 'ข้อมูลที่กรอกไว้ในฟอร์มนี้จะหายไป',
        confirmLabel: 'ทิ้งการแก้ไข', cancelLabel: 'กลับไปแก้ไขต่อ',
      });
      if (ok) { dirty = false; el.close(); }
    };
    el.addEventListener('cancel', (e) => { e.preventDefault(); tryClose(); });
    $$('[data-close]', el).forEach((b) => b.addEventListener('click', tryClose));
    return {
      open(...args) {
        dirty = false;
        if (form) form.reset();
        $$('.field.has-error', el).forEach((f) => f.classList.remove('has-error'));
        $$('.error-summary', el).forEach((s) => s.classList.remove('show'));
        $$('.conflict', el).forEach((s) => { s.hidden = true; });
        if (onOpen) onOpen(...args);
        dirty = false;
        el.showModal();
        const first = $('input:not([type=hidden]):not(:disabled), select:not(:disabled), textarea', $('.sheet-body', el));
        if (first) first.focus();
      },
      close() { dirty = false; el.close(); },
      el,
    };
  }

  // Validation helper: inline errors + summary + scroll to first error.
  function validate(el, rules) {
    const errors = [];
    $$('.field.has-error', el).forEach((f) => f.classList.remove('has-error'));
    rules.forEach(([input, check, msg]) => {
      const res = check(input.value, input);
      if (res !== true) {
        const field = input.closest('.field');
        field.classList.add('has-error');
        const err = $('.err', field);
        if (err) err.innerHTML = `${icon('x-octagon', 'ic-14')}${esc(typeof res === 'string' ? res : msg)}`;
        input.setAttribute('aria-invalid', 'true');
        errors.push({ input, msg: typeof res === 'string' ? res : msg, label: $('label', field)?.textContent.replace('*', '').trim() });
      } else input.removeAttribute('aria-invalid');
    });
    const sum = $('.error-summary', el);
    if (sum) {
      sum.classList.toggle('show', errors.length > 0);
      if (errors.length) $('p', sum).textContent = `แก้ไข ${errors.length} ช่องก่อนบันทึก · ${errors.map((e) => e.label).join(', ')}`;
    }
    if (errors.length) { errors[0].input.scrollIntoView({ block: 'center', behavior: 'smooth' }); errors[0].input.focus({ preventScroll: true }); }
    return errors.length === 0;
  }

  // Button that starts a server action: spinner + disabled until response (UX-DR16).
  function busy(btn, ms = 600) {
    return new Promise((resolve) => {
      const html = btn.innerHTML;
      btn.classList.add('is-loading'); btn.disabled = true; btn.setAttribute('aria-busy', 'true');
      btn.innerHTML = `<span class="spinner" aria-hidden="true"></span>${esc(btn.textContent.trim())}`;
      setTimeout(() => { btn.innerHTML = html; btn.classList.remove('is-loading'); btn.disabled = false; btn.removeAttribute('aria-busy'); resolve(); }, ms);
    });
  }

  // Popover menu with roving focus.
  let openMenu = null;
  function menu(anchor, items) {
    closeMenu();
    const m = document.createElement('div');
    m.className = 'menu'; m.setAttribute('role', 'menu');
    m.innerHTML = items.map((it, i) => {
      if (it === '-') return '<hr>';
      if (it.label && !it.run) return `<div class="menu-label">${esc(it.label)}</div>`;
      return `<button role="menuitem" data-i="${i}" class="${it.danger ? 'danger' : ''}" ${it.disabled ? 'aria-disabled="true"' : ''} tabindex="-1" ${it.title ? `title="${esc(it.title)}"` : ''}>${it.icon ? icon(it.icon) : ''}<span>${esc(it.text)}</span>${it.hint ? `<span class="caption" style="margin-left:auto">${esc(it.hint)}</span>` : ''}</button>`;
    }).join('');
    document.body.append(m);
    const r = anchor.getBoundingClientRect();
    const mw = m.offsetWidth, mh = m.offsetHeight;
    let left = r.right - mw; if (left < 8) left = r.left;
    let top = r.bottom + 4; if (top + mh > innerHeight - 8) top = r.top - mh - 4;
    m.style.left = `${Math.max(8, left)}px`; m.style.top = `${Math.max(8, top)}px`;
    const btns = $$('[role=menuitem]', m);
    btns.forEach((b) => b.addEventListener('click', () => {
      const it = items[+b.dataset.i];
      if (it.disabled) return;
      closeMenu(); anchor.focus(); it.run();
    }));
    m.addEventListener('keydown', (e) => {
      const i = btns.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); btns[(i + 1) % btns.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); btns[(i - 1 + btns.length) % btns.length].focus(); }
      if (e.key === 'Escape') { closeMenu(); anchor.focus(); }
      if (e.key === 'Tab') closeMenu();
    });
    anchor.setAttribute('aria-expanded', 'true');
    openMenu = { m, anchor };
    (btns.find((b) => !b.hasAttribute('aria-disabled')) || btns[0])?.focus();
  }
  function closeMenu() { if (openMenu) { openMenu.anchor.setAttribute('aria-expanded', 'false'); openMenu.m.remove(); openMenu = null; } }
  document.addEventListener('pointerdown', (e) => { if (openMenu && !openMenu.m.contains(e.target) && !openMenu.anchor.contains(e.target)) closeMenu(); });
  addEventListener('resize', closeMenu);
  addEventListener('scroll', closeMenu, true);

  // ── QR (illustrative module pattern; the real build uses a QR encoder) ─
  function qrSvg(text, size = 25) {
    let h = 2166136261;
    const rand = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
    for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const g = Array.from({ length: size }, () => Array(size).fill(0));
    const finder = (x, y) => { for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) g[y + i][x + j] = (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) ? 1 : 0; };
    const reserved = (x, y) => (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!reserved(x, y)) g[y][x] = rand() > 0.52 ? 1 : 0;
    for (let i = 8; i < size - 8; i++) { g[6][i] = i % 2 === 0 ? 1 : 0; g[i][6] = i % 2 === 0 ? 1 : 0; }
    finder(0, 0); finder(size - 7, 0); finder(0, size - 7);
    let d = '';
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (g[y][x]) d += `M${x + 2} ${y + 2}h1v1h-1z`;
    return `<svg class="qr" viewBox="0 0 ${size + 4} ${size + 4}" role="img" aria-label="QR ${esc(text)}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  }

  // ── URL state (filters, sort, page in the URL: UX-DR11) ─
  const url = {
    get(k, d = '') { return new URLSearchParams(location.search).get(k) ?? d; },
    set(obj) {
      const p = new URLSearchParams(location.search);
      Object.entries(obj).forEach(([k, v]) => { if (v === '' || v == null || v === false) p.delete(k); else p.set(k, v); });
      const q = p.toString();
      history.replaceState(null, '', `${location.pathname}${q ? `?${q}` : ''}${location.hash}`);
    },
  };

  // ── Prototype state switcher (not product UI) ───────────
  const MOCK = { state: 'normal', offline: false, conflict: false };
  function mockbar(options = []) {
    const host = document.createElement('div');
    host.className = 'mockbar';
    const all = [
      ...options,
      { group: 'ทั้งระบบ', items: [
        { key: 'offline', label: 'ออฟไลน์', toggle: true },
        { key: 'update', label: 'มีเวอร์ชันใหม่', toggle: true },
        { key: 'conflict', label: 'บันทึกชนกัน', toggle: true },
      ] },
    ];
    host.innerHTML = `<button type="button" aria-expanded="false" aria-controls="mock-panel">${icon('sliders')}ดูสถานะหน้าจอ (prototype)</button>
      <div class="mock-panel" id="mock-panel" hidden>
        ${all.map((g) => `<div><div class="mock-title">${esc(g.group)}</div><div class="mock-opts">${g.items.map((it) => `<button type="button" data-k="${it.key}" data-v="${it.value ?? ''}" data-toggle="${it.toggle ? 1 : 0}" aria-pressed="${it.default ? 'true' : 'false'}">${esc(it.label)}</button>`).join('')}</div></div>`).join('')}
      </div>`;
    document.body.append(host);
    const panel = $('.mock-panel', host);
    const trigger = $('button', host);
    trigger.addEventListener('click', () => { panel.hidden = !panel.hidden; trigger.setAttribute('aria-expanded', String(!panel.hidden)); });
    $$('.mock-opts button', host).forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.k;
      if (b.dataset.toggle === '1') {
        const on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', String(on));
        document.dispatchEvent(new CustomEvent('mock', { detail: { key: k, value: on } }));
      } else {
        $$(`.mock-opts button[data-k="${k}"]`, host).forEach((x) => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        document.dispatchEvent(new CustomEvent('mock', { detail: { key: k, value: b.dataset.v } }));
      }
    }));
  }
  document.addEventListener('mock', (e) => {
    const { key, value } = e.detail;
    if (key === 'offline') setOffline(value);
    if (key === 'update') setUpdate(value);
    if (key === 'conflict') MOCK.conflict = value;
  });

  function setOffline(on) {
    MOCK.offline = on;
    document.body.classList.toggle('is-offline', on);
    $('#banner-offline')?.toggleAttribute('hidden', !on);
    $$('[data-write]').forEach((b) => {
      if (on) { b.dataset.wasDisabled = b.disabled ? '1' : ''; b.disabled = true; b.title = 'ออฟไลน์ · บันทึกไม่ได้จนกว่าจะเชื่อมต่อใหม่'; }
      else { b.disabled = b.dataset.wasDisabled === '1'; b.removeAttribute('title'); }
    });
  }
  function setUpdate(on) { $('#banner-update')?.toggleAttribute('hidden', !on); }
  addEventListener('offline', () => setOffline(true));
  addEventListener('online', () => setOffline(false));

  // ── Shell (Story 1.4) ───────────────────────────────────
  const NAV = [
    { id: 'overview', th: 'ภาพรวมคลัง', ic: 'layout-dashboard' },
    { id: 'orders', th: 'คำสั่งซื้อ', ic: 'shopping-cart' },
    { id: 'products', th: 'สินค้า', ic: 'package' },
    { group: 'งานคลัง' },
    { id: 'inbound', th: 'รับสินค้าเข้า', ic: 'inbox' },
    { id: 'inventory', th: 'สินค้าคงคลัง', ic: 'boxes' },
    { id: 'picking', th: 'หยิบสินค้า', ic: 'hand' },
    { id: 'packing', th: 'แพ็คสินค้า', ic: 'package-check' },
    { id: 'handover', th: 'ส่งมอบขนส่ง', ic: 'truck' },
    { id: 'returns', th: 'สินค้าตีกลับ', ic: 'undo-2' },
    { group: 'รายงาน & ตั้งค่า' },
    { id: 'reports', th: 'รายงาน', ic: 'bar-chart-3' },
    { id: 'settings', th: 'ตั้งค่า & ข้อมูลหลัก', ic: 'settings', href: 'warehouses.html' },
  ];

  function shell({ active = 'settings', title }) {
    const content = $('#content');
    const isRail = safeStore.local('zwms-rail') === '1';
    const wh = currentWh();
    const app = document.createElement('div');
    app.className = `app${isRail ? ' is-rail' : ''}`;
    app.innerHTML = `
      <a href="#content" class="skip-link">ข้ามไปที่เนื้อหาหลัก</a>
      <aside class="side" aria-label="เมนูหลัก">
        <div class="side-head"><span class="tenant-logo" aria-hidden="true">F</span><div class="brand"><b>Zimple WMS</b><span>Fullfeel</span></div></div>
        <nav class="nav">
          ${NAV.map((n) => n.group
            ? `<div class="nav-group">${n.group}</div><div class="nav-group-sep" role="separator"></div>`
            : `<a href="${n.href || `denied.html?m=${n.id}`}" ${n.id === active ? 'aria-current="page"' : ''} data-tip="${n.th}">${icon(n.ic, 'ic-20')}<span>${n.th}</span></a>`).join('')}
        </nav>
        <div class="side-foot"><span class="by">by Zimple Solution</span><button class="rail-toggle" type="button" aria-label="ย่อเมนู" aria-pressed="${isRail}">${icon('panel-left', 'ic-20')}</button></div>
      </aside>
      <div class="main">
        <header class="topbar">
          <button class="top-icon menu-btn" type="button" aria-label="เปิดเมนู">${icon('menu', 'ic-20')}</button>
          <button class="wh-switch" type="button" id="wh-switch" aria-haspopup="dialog">${icon('warehouse')}<span class="name">${esc(wh.name)}</span><span class="mono">${esc(wh.code)}</span>${icon('chevrons-up-down', 'ic-14')}</button>
          <button class="search-trigger" type="button" id="search-trigger" aria-haspopup="dialog">${icon('search')}<span class="label-text">ค้นหาหรือสแกนรหัสตำแหน่ง ภาชนะ</span><span class="kbd">Ctrl K</span></button>
          <span class="spacer"></span>
          <button class="top-icon" type="button" id="btn-approvals" aria-label="อนุมัติ · ไม่มีรายการรอ">${icon('check-square', 'ic-20')}</button>
          <button class="top-icon" type="button" id="btn-notif" aria-label="การแจ้งเตือน · ไม่มีรายการใหม่">${icon('bell', 'ic-20')}</button>
          <button class="user-btn" type="button" id="user-btn" aria-haspopup="menu" aria-expanded="false"><span class="avatar">ต</span><span class="who"><b>ต้น</b><span>ผู้ดูแลระบบ</span></span>${icon('chevron-down', 'ic-14')}</button>
        </header>
        <div class="banner banner-update" id="banner-update" role="status" hidden>${icon('refresh-cw')}<span>มีเวอร์ชันใหม่ · รีเฟรชเมื่อจบงานนี้ งานที่ทำอยู่จะไม่หาย</span><span class="banner-actions"><button class="btn btn-sm btn-outline" type="button" id="btn-update-later">ภายหลัง</button><button class="btn btn-sm btn-primary" type="button" id="btn-update-now">รีเฟรชตอนนี้</button></span></div>
        <div class="banner banner-offline" id="banner-offline" role="status" hidden>${icon('wifi-off')}<span>ออฟไลน์ · ดูข้อมูลล่าสุดได้ แต่บันทึกไม่ได้จนกว่าจะเชื่อมต่อใหม่</span></div>
      </div>`;
    content.replaceWith(app);
    $('.main', app).append(content);
    content.classList.add('page');
    content.tabIndex = -1;
    document.title = `${title} · ${wh.name} · Zimple WMS`;

    // Rail collapse, persisted per user.
    const railBtn = $('.rail-toggle', app);
    railBtn.addEventListener('click', () => {
      const on = !app.classList.contains('is-rail');
      app.classList.toggle('is-rail', on);
      railBtn.setAttribute('aria-pressed', String(on));
      railBtn.setAttribute('aria-label', on ? 'ขยายเมนู' : 'ย่อเมนู');
      safeStore.local('zwms-rail', on ? '1' : '0');
    });
    // Rail tooltips on hover and focus.
    let tip = null;
    const showTip = (a) => {
      const rail = app.classList.contains('is-rail') || matchMedia('(max-width:1279px) and (min-width:1024px)').matches;
      if (!rail) return;
      tip = document.createElement('div'); tip.className = 'rail-tip'; tip.textContent = a.dataset.tip; tip.setAttribute('role', 'tooltip');
      document.body.append(tip);
      const r = a.getBoundingClientRect();
      tip.style.left = `${r.right + 8}px`; tip.style.top = `${r.top + r.height / 2 - tip.offsetHeight / 2}px`;
    };
    const hideTip = () => { tip?.remove(); tip = null; };
    $$('.nav a', app).forEach((a) => { a.addEventListener('mouseenter', () => showTip(a)); a.addEventListener('focus', () => showTip(a)); a.addEventListener('mouseleave', hideTip); a.addEventListener('blur', hideTip); });

    // Narrow screens: sidebar as an off-canvas sheet.
    $('.menu-btn', app).addEventListener('click', () => app.classList.toggle('nav-open'));
    app.addEventListener('click', (e) => { if (app.classList.contains('nav-open') && !e.target.closest('.side') && !e.target.closest('.menu-btn')) app.classList.remove('nav-open'); });

    $('#wh-switch').addEventListener('click', openWarehouseSwitcher);
    $('#search-trigger').addEventListener('click', openCommand);
    addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCommand(); } });
    $('#btn-approvals').addEventListener('click', () => openInbox('pending'));
    $('#btn-notif').addEventListener('click', () => openInbox('notif'));
    $('#user-btn').addEventListener('click', (e) => menu(e.currentTarget, [
      { label: 'ton@fullfeel.co · คลังบางเขน, คลังลาดกระบัง' },
      { text: 'ภาษา: ไทย', icon: 'languages', hint: 'English', run: () => toast({ tone: 'info', title: 'สลับภาษาได้ในระบบจริง', body: 'prototype นี้มีเฉพาะภาษาไทย' }) },
      { text: 'เปลี่ยนรหัสผ่าน', icon: 'key-round', run: () => { location.href = 'login.html?s=change'; } },
      '-',
      { text: 'ออกจากระบบ', icon: 'log-out', run: () => { location.href = 'login.html?s=signedout'; } },
    ]));
    $('#btn-update-now').addEventListener('click', () => location.reload());
    $('#btn-update-later').addEventListener('click', () => setUpdate(false));
    if (MOCK.offline || !navigator.onLine) setOffline(true);
    return app;
  }

  // Warehouse switcher dialog (UX-DR9): switching reloads all data scope.
  function openWarehouseSwitcher() {
    const d = document.createElement('dialog');
    d.className = 'dlg';
    d.setAttribute('aria-labelledby', 'whs-t');
    const list = DB.warehouses.filter((w) => w.status !== 'disabled');
    d.innerHTML = `<div class="dlg-body"><h2 id="whs-t">เลือกคลัง</h2><p>สลับคลังแล้วข้อมูลทุกหน้าจะเปลี่ยนเป็นของคลังที่เลือก</p>
      <div role="listbox" aria-labelledby="whs-t" style="display:flex;flex-direction:column;gap:6px;margin-top:4px">
      ${list.map((w) => `<button class="opt-card" style="flex-direction:row;align-items:center;gap:12px" role="option" aria-selected="${w.code === DB.current}" data-code="${w.code}">
        ${icon('warehouse', 'ic-20')}<span style="display:flex;flex-direction:column;line-height:1.35;flex:1"><span class="strong">${esc(w.name)}</span><span class="caption">ตำแหน่ง ${fmt(DB.locations.filter((l) => l.wh === w.code).length)} · โซน ${fmt(DB.zones.filter((z) => z.wh === w.code).length)}</span></span>
        <span class="mono muted">${w.code}</span>${w.code === DB.current ? `<span class="badge t-info">${icon('check')}ใช้อยู่</span>` : ''}</button>`).join('')}
      </div></div><div class="dlg-foot"><button class="btn btn-outline" type="button" data-x>ปิด</button></div>`;
    document.body.append(d);
    const done = () => { d.close(); d.remove(); };
    $('[data-x]', d).addEventListener('click', done);
    d.addEventListener('close', () => d.remove());
    $$('[data-code]', d).forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.code === DB.current) { done(); return; }
      DB.current = b.dataset.code; save(); location.reload();
    }));
    d.showModal();
    ($('[aria-selected="true"]', d) || $('[data-code]', d)).focus();
  }

  // Approvals & notifications sheet. Engines arrive in Stories 1.11/1.12; the pilot shows the empty queue.
  function openInbox(tab) {
    const d = document.createElement('dialog');
    d.className = 'sheet';
    d.style.width = 'min(400px, 100vw)';
    d.setAttribute('aria-labelledby', 'inbox-t');
    d.innerHTML = `<div class="sheet-head"><div class="titles"><h2 id="inbox-t">งานของฉัน</h2></div><button class="btn btn-ghost btn-icon" type="button" aria-label="ปิด" data-x>${icon('x')}</button></div>
      <div class="tabs" role="tablist" style="padding:0 20px">
        <a href="#" role="tab" data-t="pending" ${tab === 'pending' ? 'aria-current="page" aria-selected="true"' : 'aria-selected="false"'}>รอดำเนินการ</a>
        <a href="#" role="tab" data-t="notif" ${tab === 'notif' ? 'aria-current="page" aria-selected="true"' : 'aria-selected="false"'}>การแจ้งเตือน</a></div>
      <div class="sheet-body" style="padding:0"><div class="state" id="inbox-state"></div></div>`;
    document.body.append(d);
    const render = (t) => {
      $('#inbox-state', d).innerHTML = t === 'pending'
        ? `${icon('check-square', 'ic-48')}<h3>ไม่มีงานรออนุมัติ</h3><p>คำขอที่ต้องให้คุณอนุมัติ เช่น การปิดใช้คลัง จะขึ้นที่นี่ทันที</p>`
        : `${icon('bell', 'ic-48')}<h3>ยังไม่มีการแจ้งเตือน</h3><p>การแจ้งเตือนใหม่จะขึ้นที่นี่ และนับบนปุ่มกระดิ่งด้านบน</p>`;
      $$('[role=tab]', d).forEach((a) => { const on = a.dataset.t === t; a.setAttribute('aria-selected', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    };
    $$('[role=tab]', d).forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); render(a.dataset.t); }));
    render(tab);
    $('[data-x]', d).addEventListener('click', () => d.close());
    d.addEventListener('close', () => d.remove());
    d.showModal();
    $('[data-x]', d).focus();
  }

  // Command palette: typed or scanned codes jump to the record (Ctrl+K).
  function openCommand() {
    if ($('dialog.cmd[open]')) return;
    const d = document.createElement('dialog');
    d.className = 'cmd';
    d.setAttribute('aria-label', 'ค้นหา');
    d.innerHTML = `<div class="cmd-input">${icon('search', 'ic-20')}<input type="text" role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-autocomplete="list" placeholder="พิมพ์หรือสแกนรหัส เช่น A-03-01, TT-0012, BKN" autocomplete="off" spellcheck="false"><span class="kbd">Esc</span></div>
      <div class="cmd-list" id="cmd-list" role="listbox"></div>
      <div class="cmd-foot"><span><span class="kbd">↑</span> <span class="kbd">↓</span> เลือก</span><span><span class="kbd">Enter</span> เปิด</span><span>สแกนบาร์โค้ดใส่ช่องนี้ได้</span></div>`;
    document.body.append(d);
    const input = $('input', d);
    const list = $('.cmd-list', d);
    let items = [], sel = 0;
    const pages = [
      { t: 'คลังและโซน', s: 'ตั้งค่าคลัง', href: 'warehouses.html', ic: 'warehouse' },
      { t: 'ตำแหน่ง', s: 'ตั้งค่าคลัง', href: 'locations.html', ic: 'map-pin' },
      { t: 'ภาชนะ', s: 'ตั้งค่าคลัง', href: 'containers.html', ic: 'container' },
    ];
    const render = () => {
      const q = input.value.trim().toUpperCase();
      const loc = q ? DB.locations.filter((l) => l.wh === DB.current && l.code.includes(q)).slice(0, 6) : [];
      const con = q ? DB.containers.filter((c) => c.wh === DB.current && c.code.includes(q)).slice(0, 6) : [];
      const whs = q ? DB.warehouses.filter((w) => w.code.includes(q) || w.name.includes(input.value.trim())) : [];
      const pg = pages.filter((p) => !q || p.t.includes(input.value.trim()));
      items = [
        ...loc.map((l) => ({ g: 'ตำแหน่ง', t: l.code, s: `โซน ${l.zone} · ${typeLabel(l.type)}`, href: `locations.html?q=${encodeURIComponent(l.code)}`, ic: 'map-pin', mono: true })),
        ...con.map((c) => ({ g: 'ภาชนะ', t: c.code, s: `อยู่ที่ ${c.loc}`, href: `containers.html?q=${encodeURIComponent(c.code)}`, ic: 'container', mono: true })),
        ...whs.map((w) => ({ g: 'คลัง', t: w.name, s: w.code, href: 'warehouses.html', ic: 'warehouse' })),
        ...pg.map((p) => ({ g: 'ไปที่หน้า', ...p })),
      ];
      sel = 0;
      if (!items.length) { list.innerHTML = `<div class="state" style="min-height:0;padding:28px">${icon('search', 'ic-48')}<h3>ไม่พบ "${esc(input.value.trim())}"</h3><p>ลองพิมพ์รหัสตำแหน่งหรือรหัสภาชนะให้ครบ</p></div>`; return; }
      let g = '';
      list.innerHTML = items.map((it, i) => {
        const head = it.g !== g ? `<div class="cmd-group">${esc((g = it.g))}</div>` : '';
        return `${head}<a class="cmd-item" role="option" id="cmd-${i}" href="${it.href}" aria-selected="${i === sel}">${icon(it.ic)}<span class="${it.mono ? 'mono' : ''}">${esc(it.t)}</span><span class="end">${esc(it.s)}</span></a>`;
      }).join('');
      input.setAttribute('aria-activedescendant', 'cmd-0');
    };
    const move = (dlt) => {
      if (!items.length) return;
      sel = (sel + dlt + items.length) % items.length;
      $$('.cmd-item', list).forEach((a, i) => a.setAttribute('aria-selected', i === sel));
      $(`#cmd-${sel}`, list).scrollIntoView({ block: 'nearest' });
      input.setAttribute('aria-activedescendant', `cmd-${sel}`);
    };
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      if (e.key === 'Enter' && items[sel]) { e.preventDefault(); location.href = items[sel].href; }
    });
    d.addEventListener('close', () => d.remove());
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
    render();
    d.showModal();
    input.focus();
  }

  // ── Generic data table (Story 1.5) ──────────────────────
  // cfg: { mount, columns:[{key,label,cls,sort,render,num}], rows:()=>[], key, selectable, pageSize,
  //        onRowClick, rowClass, empty:{icon,title,body,action}, bulk:(selectedKeys)=>html, onBulk }
  function dataTable(cfg) {
    const st = {
      page: +url.get('page', 1) || 1,
      sort: url.get('sort', cfg.defaultSort || ''),
      dir: url.get('dir', 'asc'),
      sel: new Set(),
      mode: 'normal',
      slowTimer: null,
    };
    const pageSize = cfg.pageSize || 50;
    const root = cfg.mount;
    root.innerHTML = `<div class="table-wrap ${cfg.autoHeight ? 'auto-h' : ''}"><table class="dt" aria-describedby="${cfg.id}-count"><thead></thead><tbody></tbody></table><div class="state-host"></div></div>
      <div class="table-foot"><span class="count" id="${cfg.id}-count" aria-live="polite"></span><div class="pager" role="navigation" aria-label="เปลี่ยนหน้า"></div></div>
      <div class="bulk-host"></div>`;
    const thead = $('thead', root), tbody = $('tbody', root), stateHost = $('.state-host', root), foot = $('.table-foot', root);

    const sorted = (rows) => {
      if (!st.sort) return rows;
      const col = cfg.columns.find((c) => c.key === st.sort);
      const val = col?.sortVal || ((r) => r[st.sort]);
      return [...rows].sort((a, b) => {
        const x = val(a), y = val(b);
        const r = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'th', { numeric: true });
        return st.dir === 'desc' ? -r : r;
      });
    };
    const headHtml = () => `<tr>${cfg.selectable ? `<th class="col-check" scope="col"><label class="check"><input type="checkbox" data-all aria-label="เลือกทั้งหมดในหน้านี้"></label></th>` : ''}
      ${cfg.columns.map((c) => {
        const ariaSort = st.sort === c.key ? (st.dir === 'asc' ? 'ascending' : 'descending') : null;
        const inner = c.sort === false ? esc(c.label) : `<button class="sort" type="button" data-sort="${c.key}">${esc(c.label)}${st.sort === c.key ? icon(st.dir === 'asc' ? 'arrow-up' : 'arrow-down', 'ic-14') : ''}</button>`;
        return `<th scope="col" class="${c.cls || ''}${c.num ? ' num' : ''}" ${ariaSort ? `aria-sort="${ariaSort}"` : ''}>${c.label ? inner : `<span class="sr-only">การทำงาน</span>`}</th>`;
      }).join('')}</tr>`;

    function render() {
      clearTimeout(st.slowTimer);
      thead.innerHTML = headHtml();
      stateHost.innerHTML = '';
      $('.state-slow', root)?.remove();
      const all = cfg.rows();
      const filtered = cfg.filter ? cfg.filter(all) : all;
      if (st.mode === 'loading') {
        tbody.innerHTML = Array.from({ length: 8 }, () => `<tr aria-hidden="true">${cfg.selectable ? '<td class="col-check"><span class="sk" style="width:16px;height:16px"></span></td>' : ''}${cfg.columns.map((c, i) => `<td class="${c.cls || ''}"><span class="sk" style="width:${i === 0 ? 90 : 40 + ((i * 37) % 60)}px"></span></td>`).join('')}</tr>`).join('');
        foot.hidden = true;
        $('#' + cfg.id + '-count')?.replaceChildren();
        st.slowTimer = setTimeout(() => {
          const slow = document.createElement('div'); slow.className = 'state-slow'; slow.setAttribute('role', 'status');
          slow.innerHTML = `${icon('clock')}<span>ยังโหลดไม่เสร็จ</span><button class="btn btn-sm btn-outline" type="button">${icon('refresh-cw')}ลองใหม่</button>`;
          $('button', slow).addEventListener('click', () => { st.mode = 'normal'; render(); });
          $('.table-wrap', root).after(slow);
        }, 10000);
        renderBulk();
        return;
      }
      foot.hidden = false;
      let rows = [];
      if (st.mode === 'empty') rows = [];
      else if (st.mode === 'error') rows = null;
      else rows = sorted(filtered);
      if (rows === null) {
        tbody.innerHTML = '';
        stateHost.innerHTML = `<div class="state">${icon('server-crash', 'ic-48')}<h3>โหลดรายการไม่สำเร็จ</h3><p>ระบบขัดข้องชั่วคราว · ลองโหลดใหม่ ถ้ายังไม่ได้ให้แจ้งผู้ดูแลระบบพร้อมรหัสอ้างอิง</p><button class="btn btn-outline" type="button" data-retry>${icon('refresh-cw')}โหลดใหม่</button></div>`;
        $('[data-retry]', stateHost).addEventListener('click', () => { st.mode = 'normal'; render(); });
        foot.hidden = true;
        renderBulk();
        return;
      }
      const isFiltered = cfg.isFiltered?.() && all.length > 0;
      if (!rows.length) {
        tbody.innerHTML = '';
        if (isFiltered) {
          stateHost.innerHTML = `<div class="state">${icon('filter-x', 'ic-48')}<h3>ไม่พบรายการตามตัวกรอง</h3><p>ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง</p><button class="btn btn-outline" type="button" data-clear>ล้างตัวกรอง</button></div>`;
          $('[data-clear]', stateHost).addEventListener('click', () => cfg.clearFilters());
        } else {
          const e = cfg.empty;
          stateHost.innerHTML = `<div class="state">${icon(e.icon, 'ic-48')}<h3>${esc(e.title)}</h3><p>${esc(e.body)}</p>${e.action ? `<button class="btn btn-primary write-only" type="button" data-empty-act data-write>${icon('plus')}${esc(e.action)}</button>` : ''}</div>`;
          $('[data-empty-act]', stateHost)?.addEventListener('click', e.run);
        }
        $(`#${cfg.id}-count`).textContent = isFiltered ? 'ไม่พบรายการ' : '';
        $('.pager', root).innerHTML = '';
        renderBulk();
        return;
      }
      const pages = Math.max(1, Math.ceil(rows.length / pageSize));
      st.page = Math.min(Math.max(1, st.page), pages);
      const slice = rows.slice((st.page - 1) * pageSize, st.page * pageSize);
      tbody.innerHTML = slice.map((r) => {
        const k = r[cfg.key];
        const selected = st.sel.has(k);
        return `<tr data-k="${esc(k)}" class="${selected ? 'is-selected' : ''} ${cfg.rowClass ? cfg.rowClass(r) : ''}" tabindex="0">
          ${cfg.selectable ? `<td class="col-check"><label class="check"><input type="checkbox" data-k="${esc(k)}" ${selected ? 'checked' : ''} aria-label="เลือก ${esc(k)}"></label></td>` : ''}
          ${cfg.columns.map((c) => `<td class="${c.cls || ''}${c.num ? ' num' : ''}">${c.render ? c.render(r) : esc(r[c.key])}</td>`).join('')}</tr>`;
      }).join('');
      const from = (st.page - 1) * pageSize + 1, to = from + slice.length - 1;
      $(`#${cfg.id}-count`).textContent = `${fmt(from)}–${fmt(to)} จาก ${fmt(rows.length)} รายการ${isFiltered ? ` (กรองจาก ${fmt(all.length)})` : ''}`;
      renderPager(pages);
      const allBox = $('[data-all]', thead);
      if (allBox) {
        const keys = slice.map((r) => r[cfg.key]);
        const n = keys.filter((k) => st.sel.has(k)).length;
        allBox.checked = n > 0 && n === keys.length;
        allBox.indeterminate = n > 0 && n < keys.length;
      }
      renderBulk();
    }
    function renderPager(pages) {
      const p = $('.pager', root);
      if (pages <= 1) { p.innerHTML = ''; return; }
      const nums = [];
      for (let i = 1; i <= pages; i++) if (i === 1 || i === pages || Math.abs(i - st.page) <= 1) nums.push(i); else if (nums[nums.length - 1] !== '…') nums.push('…');
      p.innerHTML = `<button type="button" data-p="${st.page - 1}" ${st.page === 1 ? 'disabled' : ''} aria-label="หน้าก่อนหน้า">${icon('chevron-left')}</button>
        ${nums.map((n) => n === '…' ? '<span class="gap">…</span>' : `<button type="button" data-p="${n}" ${n === st.page ? 'aria-current="page"' : ''} aria-label="หน้า ${n}">${n}</button>`).join('')}
        <button type="button" data-p="${st.page + 1}" ${st.page === pages ? 'disabled' : ''} aria-label="หน้าถัดไป">${icon('chevron-right')}</button>`;
    }
    function renderBulk() {
      const host = $('.bulk-host', root);
      if (!cfg.selectable || st.sel.size === 0 || st.mode !== 'normal') { host.innerHTML = ''; return; }
      host.innerHTML = `<div class="bulkbar" role="region" aria-label="การทำงานกับรายการที่เลือก"><span class="count">เลือก ${fmt(st.sel.size)} รายการ</span>${cfg.bulk([...st.sel])}<span class="sep"></span><button class="btn" type="button" data-bulk-clear>${icon('x')}ยกเลิกเลือก</button></div>`;
      $('[data-bulk-clear]', host).addEventListener('click', () => { st.sel.clear(); render(); });
      $$('[data-bulk]', host).forEach((b) => b.addEventListener('click', () => cfg.onBulk(b.dataset.bulk, [...st.sel], b)));
      if (MOCK.offline) $$('[data-write]', host).forEach((b) => { b.disabled = true; });
    }

    root.addEventListener('click', (e) => {
      const sortBtn = e.target.closest('[data-sort]');
      if (sortBtn) {
        const k = sortBtn.dataset.sort;
        if (st.sort === k) st.dir = st.dir === 'asc' ? 'desc' : 'asc'; else { st.sort = k; st.dir = 'asc'; }
        url.set({ sort: st.sort, dir: st.dir === 'asc' ? '' : 'desc' }); render(); return;
      }
      const pg = e.target.closest('[data-p]');
      if (pg) { st.page = +pg.dataset.p; url.set({ page: st.page > 1 ? st.page : '' }); render(); $('.table-wrap', root).scrollTop = 0; return; }
      if (e.target.closest('.col-check') || e.target.closest('.row-menu-btn') || e.target.closest('[data-cell-act]')) return;
      const tr = e.target.closest('tbody tr[data-k]');
      if (tr && cfg.onRowClick) cfg.onRowClick(tr.dataset.k);
    });
    root.addEventListener('keydown', (e) => {
      const tr = e.target.closest?.('tbody tr[data-k]');
      if (tr && e.target === tr && e.key === 'Enter' && cfg.onRowClick) cfg.onRowClick(tr.dataset.k);
    });
    root.addEventListener('change', (e) => {
      if (e.target.matches('[data-all]')) {
        const rows = sorted(cfg.filter ? cfg.filter(cfg.rows()) : cfg.rows());
        const slice = rows.slice((st.page - 1) * pageSize, st.page * pageSize);
        slice.forEach((r) => (e.target.checked ? st.sel.add(r[cfg.key]) : st.sel.delete(r[cfg.key])));
        render(); return;
      }
      if (e.target.matches('tbody input[data-k]')) {
        if (e.target.checked) st.sel.add(e.target.dataset.k); else st.sel.delete(e.target.dataset.k);
        render();
        $(`tbody input[data-k="${CSS.escape(e.target.dataset.k)}"]`, root)?.focus();
      }
    });

    render();
    return {
      render,
      setMode(m) { st.mode = m; st.sel.clear(); render(); },
      resetPage() { st.page = 1; url.set({ page: '' }); },
      clearSel() { st.sel.clear(); },
      flash(keys) {
        keys.forEach((k) => $(`tbody tr[data-k="${CSS.escape(k)}"]`, root)?.classList.add('is-flash'));
      },
      get mode() { return st.mode; },
    };
  }

  // Excel export respects active filters (prototype downloads CSV with BOM so Excel reads Thai).
  function exportCsv(name, headers, rows) {
    const csv = '﻿' + [headers, ...rows].map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = `${name}.csv`;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ── Shared renderers ────────────────────────────────────
  const typeLabel = (id) => LOCATION_TYPES.find((t) => t.id === id)?.th || id;
  const badge = (tone, ic, text, tip) => `<span class="badge t-${tone}" ${tip ? `title="${esc(tip)}"` : ''}>${icon(ic)}${esc(text)}</span>`;
  const printChip = (p, copies) => p === 'none' ? badge('neutral', 'printer', 'ยังไม่พิมพ์') : p === 'copy' ? badge('info', 'printer', `สำเนา #${copies}`) : badge('success', 'printer', 'พิมพ์แล้ว');

  // Debounced search that also accepts scanner input (UX-DR12).
  function searchInput(el, onChange) {
    let t;
    el.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => onChange(el.value.trim()), 300); });
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clearTimeout(t); onChange(el.value.trim()); } });
  }

  // Label print preview (D-3: browser print in the pilot).
  // Batch print sends unprinted only by default; a reprint needs a reason and carries "สำเนา" (EXPERIENCE.md Printing).
  function printLabels({ title, items, qr, onDone }) {
    const d = document.createElement('dialog');
    d.className = 'dlg wide';
    d.setAttribute('aria-labelledby', 'print-t');
    d.innerHTML = `<div class="dlg-body" style="padding-bottom:12px">
        <div style="display:flex;align-items:flex-start;gap:12px"><div style="flex:1"><h2 id="print-t">${esc(title)}</h2><p id="print-sub"></p></div><button class="btn btn-ghost btn-icon" type="button" data-x aria-label="ปิด">${icon('x')}</button></div>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <div class="field" style="flex-direction:row;align-items:center;gap:8px"><label for="p-size">ขนาด label</label><select class="select" id="p-size" style="width:auto"><option value="sm">50 × 30 มม.</option><option value="lg">100 × 50 มม.</option></select></div>
          <label class="check" id="p-only-wrap"><input type="checkbox" id="p-only" checked>พิมพ์เฉพาะที่ยังไม่พิมพ์</label>
        </div>
        <div class="field" id="p-reason-wrap" hidden><label for="p-reason">เหตุผลที่พิมพ์ซ้ำ<span class="req">*</span></label><input class="input" id="p-reason" autocomplete="off" placeholder="เช่น label เดิมขาดหรือลอก"><span class="err"></span></div>
        <div id="print-area" style="max-height:46vh;overflow:auto;padding:12px;background:var(--muted);border-radius:var(--r-lg)"></div>
      </div>
      <div class="dlg-foot"><span class="caption" style="margin-right:auto;align-self:center">label ที่พิมพ์ซ้ำมีคำว่า "สำเนา"</span><button class="btn btn-outline" type="button" data-x>ยกเลิก</button><button class="btn btn-primary" type="button" id="btn-do-print" data-write>${icon('printer')}<span>พิมพ์</span></button></div>`;
    document.body.append(d);
    const current = () => {
      const unprinted = items.filter((i) => !i.printed);
      return $('#p-only', d).checked && unprinted.length ? unprinted : items;
    };
    const render = () => {
      const unprinted = items.filter((i) => !i.printed);
      const list = current();
      const reprints = list.filter((i) => i.printed);
      $('#p-only-wrap', d).hidden = !(unprinted.length && unprinted.length < items.length);
      $('#p-reason-wrap', d).hidden = reprints.length === 0;
      $('#print-sub', d).textContent = `${fmt(list.length)} ใบ${reprints.length ? ` · พิมพ์ซ้ำ ${fmt(reprints.length)}` : ''}${list.length < items.length ? ` · ข้าม ${fmt(items.length - list.length)} ที่พิมพ์แล้ว` : ''}`;
      const lg = $('#p-size', d).value === 'lg';
      $('#print-area', d).innerHTML = `<div class="labels">${list.slice(0, 60).map((i) => `<div class="label-card ${lg ? 'lg' : ''} ${i.printed ? 'copy' : ''}">${qrSvg(qr(i))}<div><div class="code" translate="no">${esc(i.code)}</div><div class="meta">${i.meta}</div></div></div>`).join('')}</div>${list.length > 60 ? `<p class="caption" style="margin-top:8px">แสดงตัวอย่าง 60 ใบแรกจาก ${fmt(list.length)}</p>` : ''}`;
      $('#btn-do-print span:last-child', d).textContent = `พิมพ์ ${fmt(list.length)} label`;
    };
    ['#p-only', '#p-size'].forEach((s) => $(s, d).addEventListener('change', render));
    $$('[data-x]', d).forEach((b) => b.addEventListener('click', () => d.close()));
    d.addEventListener('close', () => d.remove());
    $('#btn-do-print', d).addEventListener('click', () => {
      const list = current();
      const reason = $('#p-reason', d).value.trim();
      if (list.some((i) => i.printed) && !reason) {
        const f = $('#p-reason-wrap', d); f.classList.add('has-error');
        $('.err', f).innerHTML = `${icon('x-octagon', 'ic-14')}ระบุเหตุผลก่อนพิมพ์ซ้ำ`; $('#p-reason', d).focus(); return;
      }
      window.print();
      d.close();
      onDone(list, reason);
    });
    render();
    if (MOCK.offline) $('#btn-do-print', d).disabled = true;
    d.showModal();
    $('[data-x]', d).focus();
  }

  // Settings chrome: L2 module tabs, L3 secondary tabs (never a third sidebar level, UX-DR6),
  // and the section switch inside ตั้งค่าคลัง › คลังและตำแหน่ง.
  function settingsChrome(section) {
    const wh = currentWh();
    const L2 = [['ภาพรวมตั้งค่า', 'denied.html?m=settings-overview'], ['ตั้งค่าบริษัท', 'denied.html?m=settings-company'], ['ตั้งค่าคลัง', 'warehouses.html', true], ['โมดูลเสริม', 'denied.html?m=settings-addons']];
    const L3 = [['คลังและตำแหน่ง', 'warehouses.html', true], ['อุปกรณ์และสถานี', 'denied.html?m=settings-devices'], ['การเชื่อมต่อ', 'denied.html?m=settings-connections'], ['ขนส่ง', 'denied.html?m=settings-carriers'], ['เวลาและรอบรับ', 'denied.html?m=settings-time'], ['กฎงานคลัง', 'denied.html?m=settings-rules']];
    const SEC = [['warehouses', 'คลังและโซน', 'warehouses.html', 'warehouse'], ['locations', 'ตำแหน่ง', 'locations.html', 'map-pin'], ['containers', 'ภาชนะ', 'containers.html', 'container'], ['layout', 'ผังคลัง', 'layout.html', 'map']];
    return `
      <nav class="breadcrumb" aria-label="เส้นทาง"><a href="warehouses.html">ตั้งค่า & ข้อมูลหลัก</a>${icon('chevron-right')}<a href="warehouses.html">ตั้งค่าคลัง</a>${icon('chevron-right')}<span aria-current="page">คลังและตำแหน่ง</span></nav>
      <div class="page-head" style="margin-top:-8px">
        <div class="titles"><h1>ตั้งค่า & ข้อมูลหลัก</h1><p>คลัง โซน ตำแหน่ง และภาชนะของ ${esc(wh.name)} (${esc(wh.code)})</p></div>
      </div>
      <nav class="tabs" aria-label="หมวดตั้งค่า">${L2.map(([t, h, on]) => `<a href="${h}" ${on ? 'aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
      <nav class="subtabs" aria-label="ตั้งค่าคลัง">${L3.map(([t, h, on]) => `<a href="${h}" ${on ? 'aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <nav class="segment" aria-label="คลังและตำแหน่ง">${SEC.map(([id, t, h, ic]) => `<a href="${h}" ${id === section ? 'aria-current="page"' : ''}>${icon(ic)}${t}</a>`).join('')}</nav>
        <div class="alert alert-info narrow-note" style="padding:8px 12px">${icon('info')}<p>หน้าจอแคบ · ดูข้อมูลได้ แก้ไขการตั้งค่าบนจอกว้าง 1024px ขึ้นไป</p></div>
      </div>`;
  }

  window.Z = {
    settingsChrome, printLabels,
    icon, $, $$, esc, fmt, pad, nowHM, DB, save, logAction, currentWh, toast, confirmDialog, sheet, validate, busy,
    menu, closeMenu, qrSvg, url, mockbar, MOCK, shell, dataTable, exportCsv, typeLabel, badge, printChip, searchInput,
    LOCATION_TYPES, ROOM_TYPES, WALK_PATTERNS, MIXING, CONTAINER_TYPES, STAGES, setOffline,
    reset() { DB = seed(); window.Z.DB = DB; save(); location.reload(); },
  };
})();
