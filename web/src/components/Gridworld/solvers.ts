import { transition } from "./mdp";
import {
  CellPolicy,
  CellType,
  GridworldState,
  SolverType,
  cellPolicies,
} from "./types";

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
      for (const policy of cellPolicies) {
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

const chooseEpisodeStart = (state: GridworldState): [number, number] => {
  const validStarts: [number, number][] = [];
  state.grid.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell.type === CellType.EMPTY) {
        validStarts.push([rowIndex, columnIndex]);
      }
    });
  });
  return validStarts.length === 0
    ? [-1, -1]
    : validStarts[Math.floor(Math.random() * validStarts.length)];
};

const epsilonGreedy = (state: GridworldState): number => {
  return (
    state.config.initialExplorationCoefficient /
    (1 + state.solverState.step / state.config.explorationPeriod)
  );
};

const chooseAction = (
  state: GridworldState,
  row: number,
  column: number
): CellPolicy => {
  const epsilon = epsilonGreedy(state);
  return Math.random() < epsilon
    ? cellPolicies[Math.floor(Math.random() * cellPolicies.length)]
    : state.grid[row][column].policy;
};

const Sarsa = (state: GridworldState): void => {
  state.solverState.step++;
  let [row, column] = chooseEpisodeStart(state);
  if (row === -1 && column === -1) {
    return;
  }
  let action = chooseAction(state, row, column);
  let episode_step = 0;
  while (state.grid[row][column].type !== CellType.END && episode_step < 1000) {
    const [newRow, newColumn, reward] = transition(state, row, column, action);
    const newAction = chooseAction(state, newRow, newColumn);
    const QSA = state.grid[row][column].stateActionValue[action];
    const QSPAP = state.grid[newRow][newColumn].stateActionValue[newAction];
    state.grid[row][column].stateActionValue[action] =
      QSA +
      state.config.learningRate *
        (reward + state.config.discountRate * QSPAP - QSA);
    state.grid[row][column].policy = cellPolicies.reduce(
      (bestPolicy, policy) =>
        state.grid[row][column].stateActionValue[policy] >
        state.grid[row][column].stateActionValue[bestPolicy]
          ? policy
          : bestPolicy,
      CellPolicy.UP
    );
    row = newRow;
    column = newColumn;
    action = newAction;
    episode_step++;
  }
};

const QLearning = (state: GridworldState): void => {
  state.solverState.step++;
  let [row, column] = chooseEpisodeStart(state);
  if (row === -1 && column === -1) {
    return;
  }
  let episode_step = 0;
  while (state.grid[row][column].type !== CellType.END && episode_step < 1000) {
    const action = chooseAction(state, row, column);
    const [newRow, newColumn, reward] = transition(state, row, column, action);
    const QSA = state.grid[row][column].stateActionValue[action];
    const QSPAmax = cellPolicies.reduce((maxQ, policy) => {
      const QSPAP = state.grid[newRow][newColumn].stateActionValue[policy];
      return QSPAP > maxQ ? QSPAP : maxQ;
    }, -Infinity);
    state.grid[row][column].stateActionValue[action] =
      QSA +
      state.config.learningRate *
        (reward + state.config.discountRate * QSPAmax - QSA);
    state.grid[row][column].policy = cellPolicies.reduce(
      (bestPolicy, policy) =>
        state.grid[row][column].stateActionValue[policy] >
        state.grid[row][column].stateActionValue[bestPolicy]
          ? policy
          : bestPolicy,
      CellPolicy.UP
    );
    row = newRow;
    column = newColumn;
    episode_step++;
  }
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
    case SolverType.SARSA:
      Sarsa(nextState);
      break;
    case SolverType.Q_LEARNING:
      QLearning(nextState);
      break;
  }
  if (isPolicyStable || nextState.solverState.step > state.config.episodes) {
    clearInterval(nextState.solverState.intervalId);
    nextState.solverState.intervalId = undefined;
    nextState.solverState.running = false;
  }

  return nextState;
};
export default solveStep;
