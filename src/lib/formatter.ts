/**
 * Text formatter module for rendering text as ASCII art letters.
 */
import {
  UNFRAMED_ROWS,
  LetterGlyph,
  createInvertedLetter,
} from "./letter_glyph";

/**
 * Combine multiple letter glyphs horizontally with shared borders.
 * Assumes all glyphs have exactly `rows` lines.
 */
export function combineLetters(
  letters: LetterGlyph[],
  isInverted: boolean
): string[] {
  const rows = UNFRAMED_ROWS;
  if (!letters.length) {
    return [];
  }

  const paddedLetters = letters.map((L) =>
    L.pad(Array(rows).fill(L.letterWidth()), rows)
  );
  const SPACING_CHARACTER = isInverted ? "X" : " ";
  const result: string[] = [];

  for (let row = 0; row < rows; row++) {
    const lineParts = paddedLetters.map((letter) => letter.getLine(row));
    result.push(lineParts.join(SPACING_CHARACTER));
  }
  return result;
}

/**
 * Process the input string and return the graphical version.
 */
export function processText(
  inputString: string,
  isInverted: boolean = false
): string {
  const text = inputString.toLowerCase();
  const letters: LetterGlyph[] = [];

  for (const char of text) {
    if (char === " ") {
      letters.push(LetterGlyph.empty());
    } else if (/[a-z]/.test(char)) {
      const glyph = LetterGlyph.load(char);
      if (!glyph.isEmpty) {
        if (isInverted) {
          letters.push(new LetterGlyph(createInvertedLetter(glyph)));
        } else {
          letters.push(glyph);
        }
      }
    }
  }

  if (!letters.length) {
    return "";
  }

  const combinedLines = combineLetters(letters, isInverted);

  if (isInverted) {
    const topFrame = "X".repeat(combinedLines[0].length + 2);
    const framedResult = [
      topFrame,
      ...combinedLines.map((line) => `X${line}X`),
      topFrame,
    ];
    return framedResult.join("\n");
  }

  return combinedLines.join("\n");
}

/**
 * Frame a word (list of rows; each row is a list of strings) to a specific width and height.
 */
export function frameWord(
  word: string[][],
  width: number,
  height: number,
  fillChar: string = "X"
): string[] {
  // zip(*word): one string per column (vertical strip)
  const colCount = word[0]?.length ?? 0;
  const combinedRows = Array.from({ length: colCount }, (_, col) =>
    word.map((row) => row[col] ?? "").join("")
  );
  const framedRows = combinedRows.map((row) =>
    row.slice(0, width).padEnd(width, fillChar)
  );
  while (framedRows.length < height) {
    framedRows.push(fillChar.repeat(width));
  }
  return framedRows.slice(0, height);
}
