import {
  UNFRAMED_ROWS,
  LetterGlyph,
  createInvertedLetter,
} from "./letter_glyph_core";
import { loadLetterLines } from "./letter_data_browser";

function combineLetters(letters: LetterGlyph[], isInverted: boolean): string[] {
  const rows = UNFRAMED_ROWS;
  if (!letters.length) return [];
  const paddedLetters = letters.map((L) =>
    L.pad(Array(rows).fill(L.letterWidth()), rows),
  );
  const SPACING = isInverted ? "X" : " ";
  return Array.from({ length: rows }, (_, row) =>
    paddedLetters.map((l) => l.getLine(row)).join(SPACING),
  );
}

export async function processText(
  inputString: string,
  isInverted: boolean = false,
): Promise<string> {
  const text = inputString.toLowerCase();
  const letters: LetterGlyph[] = [];
  for (const char of text) {
    if (char === " ") letters.push(LetterGlyph.empty());
    else if (/[a-z]/.test(char)) {
      const lines = await loadLetterLines(char);
      if (lines) {
        const glyph = new LetterGlyph(lines);
        letters.push(
          isInverted ? new LetterGlyph(createInvertedLetter(glyph)) : glyph,
        );
      }
    }
  }
  if (!letters.length) return "";
  const combined = combineLetters(letters, isInverted);
  if (isInverted) {
    const frame = "X".repeat(combined[0].length + 2);
    return [frame, ...combined.map((l) => `X${l}X`), frame].join("\n");
  }
  const spacerRow = " ".repeat(combined[0].length);
  return [spacerRow, ...combined, spacerRow].join("\n");
}
