/**
 * Render letter glyphs and combined ASCII art as SVG, and display in the browser.
 */
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { execSync } from "child_process";
import { TileStyle } from "../lib/tilestyle";
import {
  CELL_SIZE,
  STROKE_CONTOUR,
  STROKE_GRID,
  drawCell,
  type TileChar,
} from "./svg_render_cell";
import { makeSvgLinePoints } from "./svg_utils";

function makeSvgGridLines(
  cols: number,
  rows: number,
  cellSize: number,
): string {
  const width = cols * cellSize;
  const height = rows * cellSize;
  const gridLines: string[] = [];
  for (let i = 0; i <= cols; i++) {
    const x = i * cellSize;
    gridLines.push(makeSvgLinePoints([x, 0], [x, height]));
  }
  for (let j = 0; j <= rows; j++) {
    const y = j * cellSize;
    gridLines.push(makeSvgLinePoints([0, y], [width, y]));
  }
  return (
    `<g stroke="${STROKE_GRID}" stroke-width="0.5" fill="none">` +
    gridLines.join("") +
    "</g>"
  );
}

/**
 * Convert a 2D grid of characters (list of rows) to an SVG string.
 */
export function linesToSvg(
  lines: string[],
  initTileFlipped: boolean,
  style: TileStyle = TileStyle.BOWTIE,
): string {
  if (!lines.length) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0"></svg>';
  }

  const cols = Math.max(...lines.map((row) => row.length));
  const rows = lines.length;
  const width = cols * CELL_SIZE;
  const height = rows * CELL_SIZE;
  const grid = makeSvgGridLines(cols, rows, CELL_SIZE);
  const cells: string[] = [];

  for (let r = 0; r < lines.length; r++) {
    const row = lines[r];
    for (let c = 0; c < row.length; c++) {
      const x = c * CELL_SIZE;
      const y = r * CELL_SIZE;
      const isEven = (r + c) % 2 === 0;
      const ch = row[c] as TileChar;
      const cell = drawCell(ch, isEven, initTileFlipped, style);
      cells.push(
        `<g transform="translate(${x},${y})" stroke="${STROKE_CONTOUR}" fill="none" stroke-width="1">` +
          cell +
          "</g>",
      );
    }
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">` +
    grid +
    cells.join("") +
    "</svg>"
  );
}

/** Write the SVG to a temp file and open it in the default browser. */
export function displaySvg(svg: string): void {
  const tmpPath = path.join(os.tmpdir(), `truchet-${Date.now()}.svg`);
  fs.writeFileSync(tmpPath, svg, "utf-8");
  const cmd =
    process.platform === "win32"
      ? `start "" "${tmpPath}"`
      : process.platform === "darwin"
        ? `open "${tmpPath}"`
        : `xdg-open "${tmpPath}"`;
  execSync(cmd);
}
