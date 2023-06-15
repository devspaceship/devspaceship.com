import { transition } from "./mdp";
import { CellPolicy, GridworldState, SolverType } from "./types";

const policyEvaluation = (state: GridworldState): void => {
  let delta = 1;
  while (delta > Math.pow(10, state.config.logThreshold)) {
    delta = 0;
    state.grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const [newRow, newColumn, reward] = transition(
          state,
          rowIndex,
          columnIndex
        );
        const nextStateValue =
          reward +
          state.config.discountRate * state.grid[newRow][newColumn].stateValue;
        delta = Math.max(delta, Math.abs(nextStateValue - cell.stateValue));
        state.grid[rowIndex][columnIndex].stateValue = nextStateValue;
      });
    });
  }
};

const policyImprovement = (state: GridworldState): void => {
  let isPolicyStable = true;
  state.grid.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      let bestPolicy = CellPolicy.UP;
      let bestValue = -Infinity;
      const policies = [
        CellPolicy.UP,
        CellPolicy.RIGHT,
        CellPolicy.DOWN,
        CellPolicy.LEFT,
      ];
      for (const policy of policies) {
        const [newRow, newColumn, reward] = transition(
          state,
          rowIndex,
          columnIndex,
          policy
        );
        const nextStateValue =
          reward +
          state.config.discountRate * state.grid[newRow][newColumn].stateValue;
        if (nextStateValue > bestValue) {
          bestValue = nextStateValue;
          bestPolicy = policy;
        }
      }
      if (bestPolicy !== cell.policy) {
        isPolicyStable = false;
        cell.policy = bestPolicy;
      }
    });
  });
};

const policyIteration = (state: GridworldState): void => {
  policyEvaluation(state);
  policyImprovement(state);
};

const solveStep = (state: GridworldState): GridworldState => {
  const nextState = structuredClone(state);
  switch (state.config.solver) {
    case SolverType.POLICY_ITERATION:
      policyIteration(nextState);
      break;
  }
  return nextState;
};
export default solveStep;
