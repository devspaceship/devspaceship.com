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
  START = "START",
  EMPTY = "EMPTY",
  WALL = "WALL",
  END = "END",
}

export enum CellPolicy {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
}

export interface CellState {
  type: CellType;
  policy: CellPolicy;
  stateValue: number;
}

export interface SolverState {
  running: boolean;
  step: number;
  intervalId?: number;
}

export interface GridworldState {
  policyVisible: boolean;
  config: GridworldConfig;
  grid: CellState[][];
  solverState: SolverState;
}
