/**
 * SVG parts for filled/empty quadrants and bowtie triangles.
 */
import type { Point } from "./cell_constants";
import { CELL_FRACTION, CELL_PTS } from "./cell_constants";
import { makeSvgTrianglePoints, FILL_TRIANGLE } from "./svg_utils";
import { TileStyle } from "../tilestyle";

function fillCircleQuadrant(corner: Point, pt1: Point, pt2: Point): string {
  const radius = CELL_FRACTION;
  const sweep = corner[0] === corner[1] ? 1 : 0;
  return (
    `<path d="M ${corner[0]} ${corner[1]} ` +
    `L ${pt1[0]} ${pt1[1]} ` +
    `A ${radius} ${radius} 0 0 ${sweep} ${pt2[0]} ${pt2[1]} Z" ` +
    `fill="${FILL_TRIANGLE}" stroke="none"/>`
  );
}

/** SVG for a filled quadrant (circle or triangle style). */
export function fillQuadrant(
  corner: Point,
  pt1: Point,
  pt2: Point,
  style: TileStyle,
): string {
  if (style === TileStyle.BOWTIE) {
    throw new Error("Invalid style: BOWTIE is not supported for fill_quadrant");
  }
  if (style === TileStyle.CIRCLE) {
    return fillCircleQuadrant(corner, pt1, pt2);
  }
  if (style === TileStyle.TRIANGLE) {
    return makeSvgTrianglePoints(corner, pt1, pt2);
  }
  return "";
}

/** SVG for an empty quadrant. */
export function emptyQuadrant(corner: Point, pt1: Point, pt2: Point): string {
  return makeSvgTrianglePoints(corner, pt1, pt2, { filled: false });
}

/** Triangle from center to two corners (bowtie style). */
export function bowtieTriangle(cornerA: Point, cornerB: Point): string {
  const cell = CELL_PTS;
  return makeSvgTrianglePoints(cell.center, cornerA, cornerB, { filled: true });
}
