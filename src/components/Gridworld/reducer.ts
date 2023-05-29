enum SolverType {
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

enum CellType {
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

interface GridworldState {
  config: GridworldConfig;
  grid: CellState[][];
}

const createInitialGrid = (): CellState[][] => {
  const mapping: Record<number, CellType> = {
    0: CellType.EMPTY,
    1: CellType.WALL,
    2: CellType.START,
    3: CellType.END,
  };
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  ].map((row) => row.map((cell) => ({ type: mapping[cell] })));
};

const initialState: GridworldState = {
  config: {
    solver: SolverType.PolicyIteration,
    discountRate: 0.97,
    threshold: 1e-5,
    evaluationsBeforeImprovement: 7,
    iterations: 10_000,
    alpha: 0.03,
    initialExplorationCoefficient: 1,
    explorationPeriod: 350,
  },
  grid: createInitialGrid(),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reducer = (state: GridworldState, action: unknown): GridworldState => {
  return state;
};
