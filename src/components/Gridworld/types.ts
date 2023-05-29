export enum SolverType {
  PolicyIteration,
  ValueIteration,
  SARSA,
  QLearning,
}

interface GridworldConfig {
  solver: SolverType;
  discountRate: number;
  threshold: number;
  evaluationsBeforeImprovement: number;
  iterations: number;
  alpha: number;
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

export interface GridworldAction {
  type: string;
}
