/**
 * LetterGlyph core—no Node deps (browser-safe).
 */
import { inverse } from "./tiles";

export const UNFRAMED_ROWS = 5;

export class LetterGlyph {
  private _lines: string[];

  constructor(lines: string[] = []) {
    this._lines = lines;
  }

  static empty(): LetterGlyph {
    return new LetterGlyph([]);
  }

  pad(maxWidths: number[], rows: number): LetterGlyph {
    const padded: string[] = [];
    for (let row = 0; row < rows; row++) {
      const line =
        row < this._lines.length
          ? this._lines[row].padEnd(maxWidths[row])
          : " ".repeat(maxWidths[row]);
      padded.push(line);
    }
    return new LetterGlyph(padded);
  }

  get isEmpty(): boolean {
    return this._lines.length === 0;
  }

  getLine(i: number): string {
    return this._lines[i];
  }

  letterWidth(): number {
    return this._lines.length
      ? Math.max(...this._lines.map((r) => r.length))
      : 0;
  }

  [Symbol.iterator](): Iterator<string> {
    return this._lines[Symbol.iterator]();
  }
}

export function createInvertedLetter(glyph: LetterGlyph): string[] {
  if (glyph.isEmpty) return [];
  return [...glyph].map((row) =>
    [...row].map((c) => inverse(c as " " | "X" | "λ" | "ɣ" | "y" | "ʎ")).join("")
  );
}
