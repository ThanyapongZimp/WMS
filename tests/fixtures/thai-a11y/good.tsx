export const a = new Intl.DateTimeFormat('th-TH-u-ca-gregory').format(new Date());
export const b = new Date().toLocaleDateString('en-GB');
export const seg = new Intl.Segmenter('th', { granularity: 'word' });
