import { INITIAL_GRID } from "./config";
import { GridworldAction, GridworldState, SolverType } from "./types";

export const initialState: GridworldState = {
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
  grid: INITIAL_GRID,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const reducer = (
  state: GridworldState,
  action: GridworldAction
): GridworldState => {
  return state;
};
