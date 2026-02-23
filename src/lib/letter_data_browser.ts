/**
 * Load letter glyphs by fetching from public/data/.
 */

function parseLetterLines(raw: string): string[] {
  let lines = raw.split(/\r?\n/).map((line) => line.replace(/\r$/, ""));
  while (lines.length && !lines[lines.length - 1]) lines.pop();
  if (!lines.length) return [];
  const maxWidth = Math.max(...lines.map((line) => line.length));
  return lines.map((line) => line.padEnd(maxWidth));
}

export async function loadLetterLines(
  char: string
): Promise<string[] | null> {
  const key = char.toLowerCase();
  if (!/[a-z]/.test(key)) return null;
  const res = await fetch(`/data/${key}.txt`);
  if (!res.ok) return null;
  const raw = await res.text();
  const lines = parseLetterLines(raw);
  return lines.length ? lines : null;
}
