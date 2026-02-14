/**
 * Cell dimensions and named points for SVG rendering.
 */

export type Point = [number, number];

export const CELL_SIZE = 20;
export const CELL_FRACTION = 0.65 * CELL_SIZE;

export interface CellPts {
  top_left: Point;
  top_right: Point;
  bottom_left: Point;
  bottom_right: Point;
  center: Point;
  top_mid: Point;
  bottom_mid: Point;
  left_mid: Point;
  right_mid: Point;
  top_mid_left: Point;
  top_mid_right: Point;
  bottom_mid_left: Point;
  bottom_mid_right: Point;
  left_mid_top: Point;
  left_mid_bottom: Point;
  right_mid_top: Point;
  right_mid_bottom: Point;
}

export const CELL_PTS: CellPts = {
  top_left: [0, 0],
  top_right: [CELL_SIZE, 0],
  bottom_left: [0, CELL_SIZE],
  bottom_right: [CELL_SIZE, CELL_SIZE],
  center: [CELL_SIZE / 2, CELL_SIZE / 2],
  top_mid: [CELL_SIZE / 2, 0],
  bottom_mid: [CELL_SIZE / 2, CELL_SIZE],
  left_mid: [0, CELL_SIZE / 2],
  right_mid: [CELL_SIZE, CELL_SIZE / 2],
  top_mid_left: [CELL_FRACTION, 0],
  top_mid_right: [CELL_SIZE - CELL_FRACTION, 0],
  bottom_mid_left: [CELL_FRACTION, CELL_SIZE],
  bottom_mid_right: [CELL_SIZE - CELL_FRACTION, CELL_SIZE],
  left_mid_top: [0, CELL_FRACTION],
  left_mid_bottom: [0, CELL_SIZE - CELL_FRACTION],
  right_mid_top: [CELL_SIZE, CELL_FRACTION],
  right_mid_bottom: [CELL_SIZE, CELL_SIZE - CELL_FRACTION],
};
