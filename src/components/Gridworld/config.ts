import { CellType, SolverType, GridworldState, CellPolicy } from "./types";
export const WIDTH = 12;
export const HEIGHT = 8;
export const CELL_PADDING = 0.03;
export const CORNER_ROUNDING = "25%";
export const FPS = 10;
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
  row.map((cell) => ({
    type: gridMapping[cell],
    policy: CellPolicy.UP,
    stateValue: 0,
  }))
);
export const CELL_TYPE_CLASSES = {
  [CellType.EMPTY]: "fill-background-950",
  [CellType.WALL]: "fill-primary-300",
  [CellType.START]: "fill-secondary-500",
  [CellType.END]: "fill-tertiary-500",
};
export const INITIAL_STATE: GridworldState = {
  config: {
    solver: SolverType.POLICY_ITERATION,
    discountRate: 0.97,
    logThreshold: -5,
    evaluationsBeforeImprovement: 7,
    episodes: 10_000,
    learningRate: 0.03,
    initialExplorationCoefficient: 1,
    explorationPeriod: 350,
  },
  grid: INITIAL_GRID,
  solverState: {
    running: false,
    step: 0,
    memoizedTransitions: new Map(),
  },
  policyVisible: false,
};
