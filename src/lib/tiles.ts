/**
 * Tile/character operations for Truchet-style glyphs.
 */

export type TileChar = " " | "X" | "λ" | "ɣ" | "y" | "ʎ";

export enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
}

export enum Corners {
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

/**
 * Return the directions that are available for this tile character.
 */
export function availableDirections(ch: TileChar): Direction[] {
  switch (ch) {
    case " ":
      return [];
    case "X":
      return [Direction.LEFT, Direction.RIGHT, Direction.TOP, Direction.BOTTOM];
    case "λ":
      return [Direction.LEFT, Direction.BOTTOM];
    case "ɣ":
      return [Direction.TOP, Direction.RIGHT];
    case "y":
      return [Direction.TOP, Direction.LEFT];
    case "ʎ":
      return [Direction.BOTTOM, Direction.RIGHT];
    default:
      return [];
  }
}

/**
 * Return the corners that are available for this tile character.
 */
export function availableCorners(ch: TileChar): Corners[] {
  switch (ch) {
    case " ":
      return [];
    case "X":
      return [
        Corners.TOP_LEFT,
        Corners.TOP_RIGHT,
        Corners.BOTTOM_LEFT,
        Corners.BOTTOM_RIGHT,
      ];
    case "λ":
      return [Corners.BOTTOM_LEFT, Corners.BOTTOM_RIGHT, Corners.TOP_LEFT];
    case "ɣ":
      return [Corners.TOP_RIGHT, Corners.BOTTOM_RIGHT, Corners.TOP_LEFT];
    case "y":
      return [Corners.TOP_LEFT, Corners.BOTTOM_LEFT, Corners.TOP_RIGHT];
    case "ʎ":
      return [Corners.BOTTOM_RIGHT, Corners.BOTTOM_LEFT, Corners.TOP_RIGHT];
    default:
      return [];
  }
}

export function unavailableCorners(ch: TileChar): Corners[] {
  switch (ch) {
    case "λ":
      return [Corners.TOP_RIGHT];
    case "ɣ":
      return [Corners.BOTTOM_LEFT];
    case "y":
      return [Corners.BOTTOM_RIGHT];
    case "ʎ":
      return [Corners.TOP_LEFT];
    default:
      return [];
  }
}

/**
 * Return the inverted tile (e.g. λ↔ɣ, X↔space).
 */
export function inverse(ch: TileChar): TileChar {
  switch (ch) {
    case " ":
      return "X";
    case "X":
      return " ";
    case "λ":
      return "ɣ";
    case "ɣ":
      return "λ";
    case "y":
      return "ʎ";
    case "ʎ":
      return "y";
    default:
      return ch;
  }
}
