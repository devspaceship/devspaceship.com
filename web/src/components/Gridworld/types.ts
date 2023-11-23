export enum SolverType {
  POLICY_ITERATION,
  VALUE_ITERATION,
  SARSA,
  Q_LEARNING,
}

export interface GridworldConfig {
  solver: SolverType;
  discountRate: number;
  evaluationsBeforeImprovement: number;
  episodes: number;
  learningRate: number;
  initialExplorationCoefficient: number;
  explorationPeriod: number;
}

export enum CellType {
  EMPTY = "EMPTY",
  WALL = "WALL",
  END = "END",
}

export const cellTypes = [CellType.EMPTY, CellType.WALL, CellType.END];

export enum CellPolicy {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
}

export const cellPolicies = [
  CellPolicy.UP,
  CellPolicy.RIGHT,
  CellPolicy.DOWN,
  CellPolicy.LEFT,
];

export interface CellState {
  type: CellType;
  policy: CellPolicy;
  stateValue: number;
  stateActionValue: Record<CellPolicy, number>;
}

export interface SolverState {
  running: boolean;
  step: number;
  intervalId?: number;
}

export interface DrawingState {
  drawing: boolean;
  cellType: CellType;
}

export interface GridworldState {
  policyVisible: boolean;
  config: GridworldConfig;
  grid: CellState[][];
  solverState: SolverState;
  drawingState: DrawingState;
}
