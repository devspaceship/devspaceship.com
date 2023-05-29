import { CellType } from "./types";

export const WIDTH = 12;
export const HEIGHT = 8;
export const CELL_PADDING = 0.03;
export const CORNER_ROUNDING = "25%";

const gridMapping: Record<number, CellType> = {
  0: CellType.EMPTY,
  1: CellType.WALL,
  2: CellType.START,
  3: CellType.END,
};
const initialGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
];
export const INITIAL_GRID = initialGrid.map((row) =>
  row.map((cell) => ({ type: gridMapping[cell] }))
);
