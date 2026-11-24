export const a = new Intl.DateTimeFormat('th-TH').format(new Date());
export const b = new Date().toLocaleDateString('th');
export const c = new Date().toLocaleString('th-TH', { dateStyle: 'short' });
