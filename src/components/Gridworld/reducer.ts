import { INITIAL_GRID } from "./config";
import {
  GridworldAction,
  GridworldActionType,
  GridworldState,
  SolverType,
} from "./types";

export const initialState: GridworldState = {
  config: {
    solver: SolverType.POLICY_ITERATION,
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

export const reducer = (
  state: GridworldState,
  action: GridworldAction
): GridworldState => {
  switch (action.type) {
    case GridworldActionType.SET_SOLVER:
      return {
        ...state,
        config: {
          ...state.config,
          solver: action.solver,
        },
      };
  }
  return state;
};
