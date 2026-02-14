/**
 * SVG rendering for a single cell (contours and fills by style).
 */
import type { TileChar } from "../tiles";
import {
  Direction,
  Corners,
  availableDirections,
  unavailableCorners,
} from "../tiles";
import { TileStyle } from "../tilestyle";
import { makeSvgLinePoints } from "./svg_utils";
import { CELL_PTS, CELL_SIZE as CELL_SIZE_CONST } from "./cell_constants";
import {
  fillQuadrant,
  emptyQuadrant,
  bowtieTriangle,
} from "./svg_render_cell_parts";

export type { TileChar } from "../tiles";
export const CELL_SIZE = CELL_SIZE_CONST;
export const STROKE_CONTOUR = "#111";
export const STROKE_GRID = "#ccc";

function drawCellContours(ch: TileChar): string {
  if (ch === " ") return "";
  const cell = CELL_PTS;
  const centerTo = (pt: [number, number]) => makeSvgLinePoints(cell.center, pt);
  const diagBack = makeSvgLinePoints(cell.top_left, cell.bottom_right);
  const diagFwd = makeSvgLinePoints(cell.bottom_left, cell.top_right);

  switch (ch) {
    case "X":
      return diagBack + diagFwd;
    case "λ":
      return diagBack + centerTo(cell.bottom_left);
    case "ɣ":
      return diagBack + centerTo(cell.top_right);
    case "y":
      return diagFwd + centerTo(cell.top_left);
    case "ʎ":
      return diagFwd + centerTo(cell.bottom_right);
    default:
      return "";
  }
}

function drawBowtieFills(
  ch: TileChar,
  isEven: boolean,
  initTileFlipped: boolean,
): string {
  if (ch === " ") return "";
  const directions = availableDirections(ch);
  const cell = CELL_PTS;
  let output = "";

  if (isEven === initTileFlipped) {
    if (directions.includes(Direction.LEFT)) {
      output += bowtieTriangle(cell.top_left, cell.bottom_left);
    }
    if (directions.includes(Direction.RIGHT)) {
      output += bowtieTriangle(cell.top_right, cell.bottom_right);
    }
  } else {
    if (directions.includes(Direction.TOP)) {
      output += bowtieTriangle(cell.top_left, cell.top_right);
    }
    if (directions.includes(Direction.BOTTOM)) {
      output += bowtieTriangle(cell.bottom_left, cell.bottom_right);
    }
  }
  return output;
}

function drawCornerFills(
  ch: TileChar,
  isEven: boolean,
  initTileFlipped: boolean,
  style: TileStyle,
): string {
  if (ch === " ") return "";
  const cell = CELL_PTS;
  let output = "";

  if (isEven === initTileFlipped) {
    output += fillQuadrant(
      cell.top_left,
      cell.top_mid_left,
      cell.left_mid_top,
      style,
    );
    output += fillQuadrant(
      cell.bottom_right,
      cell.bottom_mid_right,
      cell.right_mid_bottom,
      style,
    );
  } else {
    output += fillQuadrant(
      cell.top_right,
      cell.top_mid_right,
      cell.right_mid_top,
      style,
    );
    output += fillQuadrant(
      cell.bottom_left,
      cell.bottom_mid_left,
      cell.left_mid_bottom,
      style,
    );
  }
  return output;
}

function drawDirectionExclusions(ch: TileChar, _style: TileStyle): string {
  if (ch === " " || ch === "X") return "";
  const corners = unavailableCorners(ch);
  const cell = CELL_PTS;
  let output = "";

  if (corners.includes(Corners.TOP_LEFT)) {
    output += emptyQuadrant(cell.top_left, cell.top_right, cell.bottom_left);
  }
  if (corners.includes(Corners.BOTTOM_RIGHT)) {
    output += emptyQuadrant(
      cell.bottom_right,
      cell.bottom_left,
      cell.top_right,
    );
  }
  if (corners.includes(Corners.TOP_RIGHT)) {
    output += emptyQuadrant(cell.top_right, cell.bottom_right, cell.top_left);
  }
  if (corners.includes(Corners.BOTTOM_LEFT)) {
    output += emptyQuadrant(cell.bottom_left, cell.top_left, cell.bottom_right);
  }
  return output;
}

/** SVG for one cell (contours + fills by style). */
export function drawCell(
  ch: TileChar,
  isEven: boolean,
  initTileFlipped: boolean,
  style: TileStyle,
): string {
  if (ch === " ") return "";
  let output = "";
  if (style === TileStyle.BOWTIE) {
    output += drawCellContours(ch);
    output += drawBowtieFills(ch, isEven, initTileFlipped);
  } else if (style === TileStyle.CIRCLE || style === TileStyle.TRIANGLE) {
    output += drawCornerFills(ch, isEven, initTileFlipped, style);
    output += drawDirectionExclusions(ch, style);
  }
  return output;
}
