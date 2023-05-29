export enum SolverType {
  POLICY_ITERATION,
  VALUE_ITERATION,
  SARSA,
  Q_LEARNING,
}

export interface GridworldConfig {
  solver: SolverType;
  discountRate: number;
  logThreshold: number;
  evaluationsBeforeImprovement: number;
  episodes: number;
  learningRate: number;
  initialExplorationCoefficient: number;
  explorationPeriod: number;
}

export enum CellType {
  START,
  EMPTY,
  WALL,
  END,
}

enum GridDirection {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

interface CellState {
  type: CellType;
  direction?: GridDirection;
}

export interface GridworldState {
  config: GridworldConfig;
  grid: CellState[][];
}

export enum GridworldActionType {
  SET_SOLVER,
  SET_CONFIG,
  SET_GRID,
}

interface SetSolverAction {
  type: GridworldActionType.SET_SOLVER;
  solver: SolverType;
}

interface SetConfigAction {
  type: GridworldActionType.SET_CONFIG;
  config: GridworldConfig;
}

interface SetGridAction {
  type: GridworldActionType.SET_GRID;
  grid: CellState[][];
}

export type GridworldAction = SetSolverAction | SetConfigAction | SetGridAction;
