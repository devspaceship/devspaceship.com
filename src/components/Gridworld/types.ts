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

export enum GridDirection {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export interface CellState {
  type: CellType;
  direction?: GridDirection;
}

export interface SolverState {
  running: boolean;
  step: number;
  intervalId?: number;
}

export interface GridworldState {
  config: GridworldConfig;
  grid: CellState[][];
  solverState: SolverState;
}
