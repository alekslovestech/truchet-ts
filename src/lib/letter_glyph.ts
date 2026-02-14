/**
 * LetterGlyph: loading and transforming ASCII art glyphs for letters.
 */
import * as fs from "fs";
import * as path from "path";
import { inverse } from "./tiles";

/** Unframed: 5 rows */
export const UNFRAMED_ROWS = 5;

/**
 * Unframed ASCII art glyph for a letter: a list of character rows.
 * Empty glyph (e.g. for space) has no rows.
 */
export class LetterGlyph {
  private _lines: string[];
  readonly width: number;

  constructor(lines: string[] = []) {
    this._lines = lines;
    this.width = lines.length
      ? Math.max(...lines.map((line) => line.length))
      : 0;
  }

  get lines(): string[] {
    return this._lines;
  }

  /**
   * Load the glyph for a letter from the data folder.
   * @param char - The letter to load (e.g. lowercase 'a'–'z')
   * @returns LetterGlyph with its lines, or empty LetterGlyph if not found
   */
  static load(char: string): LetterGlyph {
    const dataDir = path.join(__dirname, "..", "data");
    const letterFile = path.join(dataDir, `${char}.txt`);

    if (!fs.existsSync(letterFile)) {
      return new LetterGlyph([]);
    }

    const raw = fs.readFileSync(letterFile, "utf-8");
    let lines: string[] = raw.split(/\r?\n/).map((line) => line.replace(/\r$/, ""));

    while (lines.length && !lines[lines.length - 1]) {
      lines.pop();
    }

    const maxWidth = lines.length
      ? Math.max(...lines.map((line) => line.length))
      : 0;
    const paddedLines = lines.map((line) => line.padEnd(maxWidth));

    return new LetterGlyph(paddedLines);
  }

  /** Empty glyph (e.g. for space). */
  static empty(): LetterGlyph {
    return new LetterGlyph([]);
  }

  /**
   * Pad the glyph to match the maximum widths for each row.
   */
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

  /** Whether the glyph has any rows. */
  get isEmpty(): boolean {
    return this._lines.length === 0;
  }

  getLine(i: number): string {
    return this._lines[i];
  }

  get length(): number {
    return this._lines.length;
  }

  /**
   * Maximum width of the letter glyph.
   */
  letterWidth(): number {
    return this._lines.length
      ? Math.max(...this._lines.map((row) => row.length))
      : 0;
  }

  [Symbol.iterator](): Iterator<string> {
    return this._lines[Symbol.iterator]();
  }
}

/**
 * Create an inverted version of a letter glyph using tile inverse.
 * Does NOT handle framing or padding.
 */
export function createInvertedLetter(glyph: LetterGlyph): string[] {
  if (glyph.isEmpty) {
    return [];
  }
  return [...glyph].map((row) =>
    [...row].map((c) => inverse(c as " " | "X" | "λ" | "ɣ" | "y" | "ʎ")).join("")
  );
}
