import { transition } from "./mdp";
import { CellPolicy, GridworldState, SolverType } from "./types";

const policyEvaluation = (state: GridworldState, early_stop = false): void => {
  let delta = 1;
  let iteration = 0;
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
    iteration++;
    if (early_stop && iteration > state.config.evaluationsBeforeImprovement) {
      break;
    }
  }
};

const policyImprovement = (state: GridworldState): boolean => {
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
  return isPolicyStable;
};

const policyIteration = (state: GridworldState): boolean => {
  policyEvaluation(state);
  return policyImprovement(state);
};

const valueIteration = (state: GridworldState): boolean => {
  policyEvaluation(state);
  return policyImprovement(state);
};

const solveStep = (state: GridworldState): GridworldState => {
  const nextState = structuredClone(state);
  let isPolicyStable = false;
  switch (state.config.solver) {
    case SolverType.POLICY_ITERATION:
      isPolicyStable = policyIteration(nextState);
      break;
    case SolverType.VALUE_ITERATION:
      isPolicyStable = valueIteration(nextState);
      break;
  }
  if (isPolicyStable) {
    clearInterval(nextState.solverState.intervalId);
    nextState.solverState.intervalId = undefined;
    nextState.solverState.running = false;
  }

  return nextState;
};
export default solveStep;
