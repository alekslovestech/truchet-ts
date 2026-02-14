/**
 * SVG path/line helpers and fill constants.
 */

import type { Point } from "./cell_constants";

export const FILL_TRIANGLE = "#444";
export const EMPTY_TRIANGLE = "#fff";

/** Return an SVG line element from pt1 to pt2. */
export function makeSvgLinePoints(pt1: Point, pt2: Point): string {
  return `<line x1="${pt1[0]}" y1="${pt1[1]}" x2="${pt2[0]}" y2="${pt2[1]}"/>`;
}

/** Return an SVG polygon element for a triangle with the three given vertices. */
export function makeSvgTrianglePoints(
  pt1: Point,
  pt2: Point,
  pt3: Point,
  options: { filled?: boolean } = {},
): string {
  const filled = options.filled !== false;
  const fill = filled ? FILL_TRIANGLE : EMPTY_TRIANGLE;
  const pts = `${pt1[0]},${pt1[1]} ${pt2[0]},${pt2[1]} ${pt3[0]},${pt3[1]}`;
  return `<polygon points="${pts}" fill="${fill}" stroke="none"/>`;
}
