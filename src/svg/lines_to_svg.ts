/**
 * Pure SVG generation - no Node dependencies (browser-safe).
 */
import { TileStyle } from "../lib/tilestyle";
import {
  CELL_SIZE,
  drawCell,
  type TileChar,
} from "./svg_render_cell";
import { makeSvgLinePoints } from "./svg_utils";

const SVG_VIEW_WIDTH = 400;
const SVG_VIEW_HEIGHT = 160;

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
    `<g class="grid-stroke" stroke-width="0.5" fill="none">` +
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
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SVG_VIEW_WIDTH} ${SVG_VIEW_HEIGHT}" width="${SVG_VIEW_WIDTH}" height="${SVG_VIEW_HEIGHT}"></svg>`;
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
        `<g class="tile-stroke" transform="translate(${x},${y})" fill="none" stroke-width="1">` +
          cell +
          "</g>",
      );
    }
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">` +
    grid +
    cells.join("") +
    "</svg>"
  );
}
