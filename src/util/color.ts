export function strToColor(s: string): string {
  const n = Array.from(s)
    .map(c => c.charCodeAt(0))
    .reduce((a,b) => (a << 7) ^ b, 0);
  return '#' + (n.toString(16) + '88888').substring(0, 6);
}