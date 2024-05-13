import { CellType, SolverType, GridworldState, CellPolicy } from "./types";
export const WIDTH = 12;
export const HEIGHT = 8;
export const CELL_PADDING = 0.03;
export const CORNER_ROUNDING = "25%";
export const FPS = 15;
export const MAX_NUM_STEPS = 1000;
export const LOG_THRESHOLD = -5;
const gridMapping: Record<number, CellType> = {
  0: CellType.EMPTY,
  1: CellType.WALL,
  2: CellType.END,
};
const initialGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
];
export const INITIAL_GRID = initialGrid.map((row) =>
  row.map((cell) => ({
    type: gridMapping[cell],
    policy: CellPolicy.UP,
    stateValue: 0,
    stateActionValue: {
      [CellPolicy.UP]: 0,
      [CellPolicy.RIGHT]: 0,
      [CellPolicy.DOWN]: 0,
      [CellPolicy.LEFT]: 0,
    },
  })),
);
export const CELL_TYPE_CLASSES = {
  [CellType.EMPTY]: "fill-gridworld",
  [CellType.WALL]: "fill-gridworld-primary",
  [CellType.END]: "fill-gridworld-secondary",
};
export const INITIAL_STATE: GridworldState = {
  config: {
    solver: SolverType.POLICY_ITERATION,
    discountRate: 0.97,
    evaluationsBeforeImprovement: 7,
    episodes: 500,
    learningRate: 0.3,
    initialExplorationCoefficient: 1,
    explorationPeriod: 300,
  },
  grid: INITIAL_GRID,
  solverState: {
    running: false,
    step: 0,
  },
  policyVisible: false,
  drawingState: {
    drawing: false,
    cellType: CellType.WALL,
  },
};
